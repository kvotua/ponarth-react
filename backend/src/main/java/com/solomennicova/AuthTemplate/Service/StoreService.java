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
    public static void displayDirectory(File dir)
    {

        try {
            File[] files = dir.listFiles();
            for (File file : files) {
                if (file.isDirectory()) {
                    System.out.println(
                            "directory:"
                                    + file.getCanonicalPath());
                    displayDirectory(file);
                }
                else {
                    System.out.println(
                            "     file:"
                                    + file.getCanonicalPath());
                }
            }
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}