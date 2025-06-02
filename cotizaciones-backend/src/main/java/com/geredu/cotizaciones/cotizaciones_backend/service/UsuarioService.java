package com.geredu.cotizaciones.cotizaciones_backend.service;

import com.geredu.cotizaciones.cotizaciones_backend.model.Usuario;
import com.geredu.cotizaciones.cotizaciones_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepo;

    public UsuarioService(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepo.findAll();
    }

    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepo.findById(id);
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepo.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuarioDetails) {
        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id " + id));

        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setEmail(usuarioDetails.getEmail());
        // Solo actualiza password si no es nula o vacía (para evitar borrarla sin querer)
        if (usuarioDetails.getPassword() != null && !usuarioDetails.getPassword().isEmpty()) {
            usuario.setPassword(usuarioDetails.getPassword());
        }
        usuario.setRol(usuarioDetails.getRol());

        return usuarioRepo.save(usuario);
    }

    public void deleteUsuario(Long id) {
        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id " + id));
        usuarioRepo.delete(usuario);
    }
}
