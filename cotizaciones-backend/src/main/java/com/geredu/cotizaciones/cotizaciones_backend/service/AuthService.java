package com.geredu.cotizaciones.cotizaciones_backend.service;
import com.geredu.cotizaciones.cotizaciones_backend.model.Usuario;
import com.geredu.cotizaciones.cotizaciones_backend.repository.UsuarioRepository;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepo, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String email, String rawPassword) {
        Usuario usuario = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(rawPassword, usuario.getPassword())) {
            throw new BadCredentialsException("Contraseña incorrecta");
        }

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                usuario.getEmail(), usuario.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol()))
        );

        return jwtService.generateToken(userDetails);
    }
}
