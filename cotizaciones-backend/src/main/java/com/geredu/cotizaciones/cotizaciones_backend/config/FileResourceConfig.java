package com.geredu.cotizaciones.cotizaciones_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class FileResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String rutaAbsoluta = Paths.get("uploads/anexos").toFile().getAbsolutePath();
        registry.addResourceHandler("/archivos/**")
                .addResourceLocations("file:" + rutaAbsoluta + "/");
    }
}
