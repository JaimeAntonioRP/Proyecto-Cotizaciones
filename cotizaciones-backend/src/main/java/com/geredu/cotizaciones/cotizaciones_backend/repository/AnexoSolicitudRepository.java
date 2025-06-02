package com.geredu.cotizaciones.cotizaciones_backend.repository;

import com.geredu.cotizaciones.cotizaciones_backend.model.AnexoSolicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AnexoSolicitudRepository extends JpaRepository<AnexoSolicitud, Integer> {
    List<AnexoSolicitud> findBySolicitudId(Integer solicitudId);
}