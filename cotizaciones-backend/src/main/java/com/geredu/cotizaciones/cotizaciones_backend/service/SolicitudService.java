package com.geredu.cotizaciones.cotizaciones_backend.service;

import com.geredu.cotizaciones.cotizaciones_backend.model.Solicitud;
import com.geredu.cotizaciones.cotizaciones_backend.repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository solicitudRepository;

    public List<Solicitud> getAllSolicitudes() {
        return solicitudRepository.findAll();
    }

    public Optional<Solicitud> getSolicitudById(Integer id) {
        return solicitudRepository.findById(id);
    }

    public Solicitud saveSolicitud(Solicitud solicitud) {
        int anio = solicitud.getAnio();
        Integer maxNumero = solicitudRepository.findMaxNumeroSolicitudByAnio(anio);
        int siguienteNumero = (maxNumero != null ? maxNumero + 1 : 1);

        String numeroSolicitud = String.format("%04d-%d-GEREDU", siguienteNumero, anio);

        solicitud.setNumeroSolicitud(numeroSolicitud);
        solicitud.setUnidadEjecutora("GEREDU");
        solicitud.setRubro("GENERAL");

        return solicitudRepository.save(solicitud);
    }

    public Optional<Solicitud> updateSolicitud(Integer id, Solicitud solicitudDetails) {
        return solicitudRepository.findById(id).map(solicitud -> {
            copyFields(solicitud, solicitudDetails);
            return solicitudRepository.save(solicitud);
        });
    }

    public boolean deleteSolicitud(Integer id) {
        return solicitudRepository.findById(id).map(solicitud -> {
            solicitudRepository.delete(solicitud);
            return true;
        }).orElse(false);
    }

    private void copyFields(Solicitud s, Solicitud d) {
        s.setNumeroSolicitud(d.getNumeroSolicitud()); // solo si quieres permitir modificarlo manualmente
        s.setAnio(d.getAnio());
        s.setTipo(d.getTipo());
        s.setNumeroPedido(d.getNumeroPedido());
        s.setUnidadEjecutora(d.getUnidadEjecutora());
        s.setCodigoUnidad(d.getCodigoUnidad());
        s.setNumeroConsolidado(d.getNumeroConsolidado());
        s.setRubro(d.getRubro());
        s.setConcepto(d.getConcepto());
        s.setPublicadoPor(d.getPublicadoPor());
        s.setFechaInicio(d.getFechaInicio());
        s.setFechaLimite(d.getFechaLimite());
    }
}
