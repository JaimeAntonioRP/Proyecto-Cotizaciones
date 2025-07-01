package com.geredu.cotizaciones.cotizaciones_backend.controller;

import com.geredu.cotizaciones.cotizaciones_backend.dto.AnexoSolicitudDTO;
import com.geredu.cotizaciones.cotizaciones_backend.model.AnexoSolicitud;
import com.geredu.cotizaciones.cotizaciones_backend.service.AnexoSolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/anexos")
@CrossOrigin(origins = "http://localhost:4200") // CORS para Angular
public class AnexoSolicitudController {

    @Autowired
    private AnexoSolicitudService anexoSolicitudService;

    // Crear anexo (JSON simple)
    @PostMapping
    public ResponseEntity<AnexoSolicitud> createAnexo(@RequestBody AnexoSolicitudDTO dto) {
        AnexoSolicitud anexo = anexoSolicitudService.saveAnexo(dto);
        return ResponseEntity.ok(anexo);
    }

    // Crear anexo con archivo PDF (nuevo)
    @PostMapping("/upload")
    public ResponseEntity<AnexoSolicitud> uploadAnexo(
        @RequestParam("file") MultipartFile file,
        @RequestParam("tipoDocumento") String tipoDocumento,
        @RequestParam("solicitudId") Integer solicitudId
    ) throws IOException {
        AnexoSolicitud anexo = anexoSolicitudService.saveAnexoWithFile(file, tipoDocumento, solicitudId);
        return ResponseEntity.ok(anexo);
    }

    // Actualizar anexo (JSON simple)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAnexo(@PathVariable Integer id, @RequestBody AnexoSolicitudDTO dto) {
        return anexoSolicitudService.updateAnexo(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Obtener todos los anexos
    @GetMapping
    public ResponseEntity<List<AnexoSolicitud>> getAll() {
        return ResponseEntity.ok(anexoSolicitudService.getAllAnexos());
    }

    // Obtener anexos por solicitud
    @GetMapping("/solicitud/{id}")
    public ResponseEntity<List<AnexoSolicitud>> getBySolicitud(@PathVariable Integer id) {
        return ResponseEntity.ok(anexoSolicitudService.getAnexosBySolicitudId(id));
    }

    // Obtener anexo por ID
    @GetMapping("/{id}")
    public ResponseEntity<AnexoSolicitud> getAnexoById(@PathVariable Integer id) {
        return anexoSolicitudService.getAnexoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar anexo
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnexo(@PathVariable Integer id) {
        anexoSolicitudService.deleteAnexo(id);
        return ResponseEntity.ok().build();
    }
}
