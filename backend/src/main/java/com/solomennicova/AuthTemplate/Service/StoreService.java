package com.solomennicova.AuthTemplate.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.solomennicova.AuthTemplate.Exception.DontImageException;
import com.solomennicova.AuthTemplate.Exception.ImageDontLoadException;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class StoreService {

    @Value("${store.path}")
    private String filePath;

    public String loadImage(MultipartFile file, String filename) throws DontImageException, ImageDontLoadException {
        if (!file.isEmpty()) {
            if(file.getContentType().contains("image")) {
                try {
                    new File(filePath).mkdirs();
                    byte[] bytes = file.getBytes();
                    String filePathName = filePath + "/" + filename;
                    BufferedOutputStream stream =
                            new BufferedOutputStream(new FileOutputStream(new File(filePathName)));
                    stream.write(bytes);
                    stream.close();
                    return filePathName;
                } catch (Exception e) {
                    throw new ImageDontLoadException(e.getMessage());
                }
            }
            else {
                throw new DontImageException("Need load image, a give " + file.getContentType());
            }
        } else {
            return "Вам не удалось загрузить " + filename + " потому что файл пустой.";
        }

    }

    public byte[] uploadImage(String filename) throws IOException, DontImageException {
        String path = ".." + filePath;
        Path imagePath = Paths.get(path, filename);
        if (!Files.exists(imagePath)) {
            throw new DontImageException("On server don`t exists image");
        }
        return Files.readAllBytes(imagePath);
    }

    public void rewriteImage(byte[] newImage, String oldFilePath, String newFilePath){
        try {
            File oldFile = new File(filePath + "/" + oldFilePath);
            if (oldFile.exists()) {
                if (oldFile.delete()) {
                    System.out.println("Старый файл успешно удален: "  + filePath + "/" +  oldFilePath);
                } else {
                    System.out.println("Не удалось удалить старый файл: "  + filePath + "/" +  oldFilePath);
                }
            }
            FileOutputStream fileOutputStream = new FileOutputStream(filePath + "/" +newFilePath);
            fileOutputStream.write(newImage);
            fileOutputStream.close();
            System.out.println("Файл успешно перезаписан с новым расширением: " + filePath + "/" + newFilePath);
        } catch (IOException e){
            System.out.println("Произошла ошибка при перезаписи файла: " + e.getMessage());
        }
    }

    public void deleteImage(String oldFilePath){

        File oldFile = new File(filePath + "/" + oldFilePath);
        if (oldFile.exists()) {
            if (oldFile.delete()) {
                System.out.println("Старый файл успешно удален: " + filePath + "/" + oldFilePath);
            } else {
                System.out.println("Не удалось удалить старый файл: " + filePath + "/" + oldFilePath);
            }
        }

    }
}