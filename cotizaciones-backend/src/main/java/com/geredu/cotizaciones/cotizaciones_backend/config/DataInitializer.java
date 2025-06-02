package com.geredu.cotizaciones.cotizaciones_backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.geredu.cotizaciones.cotizaciones_backend.repository.UsuarioRepository;
import com.geredu.cotizaciones.cotizaciones_backend.model.Rol;
import com.geredu.cotizaciones.cotizaciones_backend.model.Usuario;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        String email = "admin@tudominio.com";  // Cambia por el email que quieras

        if (usuarioRepository.findByEmail(email).isEmpty()) {
            Usuario admin = new Usuario();
            admin.setEmail(email);
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRol(Rol.ADMIN);
            usuarioRepository.save(admin);
            System.out.println("Usuario admin creado");
        }
    }
}
    