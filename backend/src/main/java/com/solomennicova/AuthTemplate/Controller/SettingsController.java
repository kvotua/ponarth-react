package com.solomennicova.AuthTemplate.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/settings")
public class SettingsController {

    @Value("${server.port}")
    private int serverPort;

    @Value("${spring.servlet.multipart.max-file-size}")
    private String maxFileSize;

    @Value("${spring.servlet.multipart.max-request-size}")
    private String maxRequestSize;

    @Value("${spring.servlet.multipart.enabled:true}")
    private boolean isMultipartEnabled;

    @GetMapping("/server-config")
    public Map<String, Object> getServerConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("serverPort", serverPort);
        config.put("maxFileSize", maxFileSize);
        config.put("maxRequestSize", maxRequestSize);
        config.put("multipartEnabled", isMultipartEnabled);
        config.put("allowedFileExtensions", new String[] {".jpg", ".png", ".jpeg"});

        return config;
    }
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}
