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
            if (file.getContentType().contains("image")) {
                try {
                    new File(filePath).mkdirs();
                    byte[] bytes = file.getBytes();

                    String name = filename;
                    String filePathName = filePath + "/" + name;
                    File savedFile = new File(filePathName);

                    int counter = 1;
                    while (savedFile.exists()) {
                        name = filename.substring(0, filename.lastIndexOf('.')) + "_" + counter +
                                filename.substring(filename.lastIndexOf('.'));
                        filePathName = filePath + "/" + name;
                        savedFile = new File(filePathName);
                        counter++;
                    }

                    BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(savedFile));
                    stream.write(bytes);
                    stream.close();

                    return  name;
                } catch (Exception e) {
                    throw new ImageDontLoadException(e.getMessage());
                }
            } else {
                throw new DontImageException("Необходимо загрузить изображение, получен " + file.getContentType());
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

    public String rewriteImage(byte[] newImage, String oldFilePath, String newFilePath){
        String name = newFilePath;
        try {
            File oldFile = new File(filePath + "/" + oldFilePath);
            if (oldFile.exists()) {
                if (oldFile.delete()) {
                    System.out.println("Старый файл успешно удален: "  + filePath + "/" +  oldFilePath);
                } else {
                    System.out.println("Не удалось удалить старый файл: "  + filePath + "/" +  oldFilePath);
                }
            }

            String filePathName = filePath + "/" + name;
            File savedFile = new File(filePathName);

            int counter = 1;
            while (savedFile.exists()) {
                name = newFilePath.substring(0, newFilePath.lastIndexOf('.')) + "_" + counter +
                        newFilePath.substring(newFilePath.lastIndexOf('.'));
                filePathName = filePath + "/" + name;
                savedFile = new File(filePathName);
                counter++;
            }

            FileOutputStream fileOutputStream = new FileOutputStream(savedFile);
            fileOutputStream.write(newImage);
            fileOutputStream.close();

            return name;
        } catch (IOException e){
            System.out.println("Произошла ошибка при перезаписи файла: " + e.getMessage());
        }
        return name;
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