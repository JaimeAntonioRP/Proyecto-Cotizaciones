package com.geredu.cotizaciones.cotizaciones_backend.service;

import com.geredu.cotizaciones.cotizaciones_backend.dto.AnexoSolicitudDTO;
import com.geredu.cotizaciones.cotizaciones_backend.model.AnexoSolicitud;
import com.geredu.cotizaciones.cotizaciones_backend.model.Solicitud;
import com.geredu.cotizaciones.cotizaciones_backend.repository.AnexoSolicitudRepository;
import com.geredu.cotizaciones.cotizaciones_backend.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@Service
public class AnexoSolicitudService {

    @Autowired
    private AnexoSolicitudRepository anexoSolicitudRepository;

    @Autowired
    private SolicitudRepository solicitudRepository;

    public List<AnexoSolicitud> getAllAnexos() {
        return anexoSolicitudRepository.findAll();
    }

    public List<AnexoSolicitud> getAnexosBySolicitudId(Integer solicitudId) {
        return anexoSolicitudRepository.findBySolicitudId(solicitudId);
    }

    public Optional<AnexoSolicitud> getAnexoById(Integer id) {
        return anexoSolicitudRepository.findById(id);
    }

    public AnexoSolicitud saveAnexo(AnexoSolicitudDTO dto) {
        Solicitud solicitud = solicitudRepository.findById(dto.getSolicitudId())
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada con ID: " + dto.getSolicitudId()));

        AnexoSolicitud anexo = new AnexoSolicitud();
        anexo.setSolicitud(solicitud);
        anexo.setTipoDocumento(dto.getTipoDocumento());
        anexo.setNombreArchivo(dto.getNombreArchivo());
        anexo.setUrlArchivo(dto.getUrlArchivo());

        return anexoSolicitudRepository.save(anexo);
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

    public AnexoSolicitud saveAnexoWithFile(MultipartFile file, String tipoDocumento, Integer solicitudId) throws IOException {
    Solicitud solicitud = solicitudRepository.findById(solicitudId)
            .orElseThrow(() -> new RuntimeException("Solicitud no encontrada con ID: " + solicitudId));

    String uploadDir = "uploads/anexos";
    Files.createDirectories(Paths.get(uploadDir));

    // Genera nombre único
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(uploadDir, fileName);
    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    AnexoSolicitud anexo = new AnexoSolicitud();
    anexo.setSolicitud(solicitud);
    anexo.setTipoDocumento(tipoDocumento);
    anexo.setNombreArchivo(file.getOriginalFilename());
    anexo.setUrlArchivo("/archivos/" + fileName); // Esta URL debe coincidir con FileResourceConfig

    return anexoSolicitudRepository.save(anexo);
}

}
