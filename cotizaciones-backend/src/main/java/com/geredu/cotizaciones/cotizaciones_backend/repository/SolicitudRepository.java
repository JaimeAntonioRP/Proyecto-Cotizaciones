package com.geredu.cotizaciones.cotizaciones_backend.repository;

import com.geredu.cotizaciones.cotizaciones_backend.model.Solicitud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {
    // Puedes agregar consultas personalizadas si quieres
    @Query("SELECT MAX(CAST(SUBSTRING(s.numeroSolicitud, 1, 4) AS int)) FROM Solicitud s WHERE s.anio = :anio")
    Integer findMaxNumeroSolicitudByAnio(@Param("anio") int anio);


}