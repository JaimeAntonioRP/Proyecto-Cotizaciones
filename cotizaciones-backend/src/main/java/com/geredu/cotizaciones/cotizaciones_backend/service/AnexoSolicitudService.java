package com.geredu.cotizaciones.cotizaciones_backend.service;

import com.geredu.cotizaciones.cotizaciones_backend.dto.AnexoSolicitudDTO;
import com.geredu.cotizaciones.cotizaciones_backend.model.AnexoSolicitud;
import com.geredu.cotizaciones.cotizaciones_backend.model.Solicitud;
import com.geredu.cotizaciones.cotizaciones_backend.repository.AnexoSolicitudRepository;
import com.geredu.cotizaciones.cotizaciones_backend.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class AnexoSolicitudService {

    @Autowired
    private AnexoSolicitudRepository anexoSolicitudRepository;

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public List<AnexoSolicitud> getAllAnexos() {
        return anexoSolicitudRepository.findAll();
    }

    public List<AnexoSolicitud> getAnexosBySolicitudId(Integer solicitudId) {
        return anexoSolicitudRepository.findBySolicitudId(solicitudId);
    }

    public Optional<AnexoSolicitud> getAnexoById(Integer id) {
        return anexoSolicitudRepository.findById(id);
    }

    public AnexoSolicitud saveAnexo(Integer solicitudId, String tipoDocumento, MultipartFile file) {
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada con ID: " + solicitudId));

        try {
            // Guardar el archivo en el servidor
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.createDirectories(filePath.getParent()); // Crea carpetas si no existen
            Files.write(filePath, file.getBytes());

            // Crear objeto AnexoSolicitud
            AnexoSolicitud anexo = new AnexoSolicitud();
            anexo.setSolicitud(solicitud);
            anexo.setTipoDocumento(tipoDocumento);
            anexo.setNombreArchivo(file.getOriginalFilename());
            anexo.setUrlArchivo("/uploads/anexos/" + fileName); // URL relativa o absoluta según tu front

            return anexoSolicitudRepository.save(anexo);

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo", e);
        }
    }

    public Optional<AnexoSolicitud> updateAnexo(Integer id, AnexoSolicitudDTO dto) {
        return anexoSolicitudRepository.findById(id).map(anexo -> {
            anexo.setTipoDocumento(dto.getTipoDocumento());
            anexo.setNombreArchivo(dto.getNombreArchivo());
            anexo.setUrlArchivo(dto.getUrlArchivo());

            if (dto.getSolicitudId() != null) {
                Solicitud solicitud = solicitudRepository.findById(dto.getSolicitudId())
                        .orElseThrow(() -> new RuntimeException("Solicitud no encontrada con ID: " + dto.getSolicitudId()));
                anexo.setSolicitud(solicitud);
            }

            return anexoSolicitudRepository.save(anexo);
        });
    }

    public void deleteAnexo(Integer id) {
        anexoSolicitudRepository.deleteById(id);
    }
}
