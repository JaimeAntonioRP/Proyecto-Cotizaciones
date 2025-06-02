package com.geredu.cotizaciones.cotizaciones_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "solicitudes")
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero_solicitud")
    private String numeroSolicitud;

    private Integer anio;
    private String tipo;

    @Column(name = "numero_pedido")
    private String numeroPedido;

    @Column(name = "unidad_ejecutora")
    private String unidadEjecutora;

    @Column(name = "codigo_unidad")
    private String codigoUnidad;

    @Column(name = "numero_consolidado")
    private String numeroConsolidado;

    private String rubro;

    @Column(columnDefinition = "TEXT")
    private String concepto;

    @Column(name = "publicado_por")
    private String publicadoPor;

    @Column(name = "fecha_inicio")
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_limite")
    private LocalDateTime fechaLimite;

    // Relaciones uno a muchos

    @OneToMany(mappedBy = "solicitud", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnexoSolicitud> anexos;

    @OneToMany(mappedBy = "solicitud", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSolicitud> items;

    // Getters y Setters

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNumeroSolicitud() { return numeroSolicitud; }
    public void setNumeroSolicitud(String numeroSolicitud) { this.numeroSolicitud = numeroSolicitud; }

    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getNumeroPedido() { return numeroPedido; }
    public void setNumeroPedido(String numeroPedido) { this.numeroPedido = numeroPedido; }

    public String getUnidadEjecutora() { return unidadEjecutora; }
    public void setUnidadEjecutora(String unidadEjecutora) { this.unidadEjecutora = unidadEjecutora; }

    public String getCodigoUnidad() { return codigoUnidad; }
    public void setCodigoUnidad(String codigoUnidad) { this.codigoUnidad = codigoUnidad; }

    public String getNumeroConsolidado() { return numeroConsolidado; }
    public void setNumeroConsolidado(String numeroConsolidado) { this.numeroConsolidado = numeroConsolidado; }

    public String getRubro() { return rubro; }
    public void setRubro(String rubro) { this.rubro = rubro; }

    public String getConcepto() { return concepto; }
    public void setConcepto(String concepto) { this.concepto = concepto; }

    public String getPublicadoPor() { return publicadoPor; }
    public void setPublicadoPor(String publicadoPor) { this.publicadoPor = publicadoPor; }

    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDateTime getFechaLimite() { return fechaLimite; }
    public void setFechaLimite(LocalDateTime fechaLimite) { this.fechaLimite = fechaLimite; }

    public List<AnexoSolicitud> getAnexos() { return anexos; }
    public void setAnexos(List<AnexoSolicitud> anexos) { this.anexos = anexos; }

    public List<ItemSolicitud> getItems() { return items; }
    public void setItems(List<ItemSolicitud> items) { this.items = items; }
}
