package com.geredu.cotizaciones.cotizaciones_backend.repository;

import com.geredu.cotizaciones.cotizaciones_backend.model.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Integer> {}