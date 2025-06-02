package com.geredu.cotizaciones.cotizaciones_backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "items_cotizados")
public class ItemCotizado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cotizacion_id")
    private Cotizacion cotizacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_solicitud_id")
    private ItemSolicitud itemSolicitud;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    // Getters y setters

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Cotizacion getCotizacion() { return cotizacion; }
    public void setCotizacion(Cotizacion cotizacion) { this.cotizacion = cotizacion; }

    public ItemSolicitud getItemSolicitud() { return itemSolicitud; }
    public void setItemSolicitud(ItemSolicitud itemSolicitud) { this.itemSolicitud = itemSolicitud; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}
