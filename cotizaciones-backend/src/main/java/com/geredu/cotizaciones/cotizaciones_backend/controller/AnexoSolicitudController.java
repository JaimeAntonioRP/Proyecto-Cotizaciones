package com.geredu.cotizaciones.cotizaciones_backend.controller;

import com.geredu.cotizaciones.cotizaciones_backend.model.AnexoSolicitud;
import com.geredu.cotizaciones.cotizaciones_backend.service.AnexoSolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/anexos")
@CrossOrigin(origins = "*")
public class AnexoSolicitudController {

    @Autowired
    private AnexoSolicitudService anexoSolicitudService;

    // Este valor se usará en el servicio automáticamente
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("solicitudId") Integer solicitudId,
            @RequestParam("tipoDocumento") String tipoDocumento
    ) {
        try {
            AnexoSolicitud anexo = anexoSolicitudService.saveAnexo(solicitudId, tipoDocumento, file);
            return ResponseEntity.ok(anexo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al subir archivo: " + e.getMessage());
        }
    }

    @GetMapping("/solicitud/{id}")
    public ResponseEntity<List<AnexoSolicitud>> getBySolicitud(@PathVariable Integer id) {
        return ResponseEntity.ok(anexoSolicitudService.getAnexosBySolicitudId(id));
    }

    @GetMapping
    public ResponseEntity<List<AnexoSolicitud>> getAll() {
        return ResponseEntity.ok(anexoSolicitudService.getAllAnexos());
    }
}
