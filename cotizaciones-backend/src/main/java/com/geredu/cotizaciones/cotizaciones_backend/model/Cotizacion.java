package com.geredu.cotizaciones.cotizaciones_backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "cotizaciones")
public class Cotizacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitud_id", nullable = false)
    private Solicitud solicitud;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_persona")
    private TipoPersona tipoPersona;

    private String ruc;

    @Column(name = "razon_social")
    private String razonSocial;

    private String correo;
    private String telefono;

    private String direccion;

    @Column(name = "plazo_entrega")
    private Integer plazoEntrega;

    @Column(name = "validez_cotizacion")
    private Integer validezCotizacion;

    private String observaciones;

    @Column(name = "fecha_envio")
    private LocalDateTime fechaEnvio;

    @Enumerated(EnumType.STRING)
    private EstadoCotizacion estado;

    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemCotizado> itemsCotizados;

    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DocumentoCotizacion> documentos;

    // Getters y setters

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Solicitud getSolicitud() { return solicitud; }
    public void setSolicitud(Solicitud solicitud) { this.solicitud = solicitud; }

    public TipoPersona getTipoPersona() { return tipoPersona; }
    public void setTipoPersona(TipoPersona tipoPersona) { this.tipoPersona = tipoPersona; }

    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }

    public String getRazonSocial() { return razonSocial; }
    public void setRazonSocial(String razonSocial) { this.razonSocial = razonSocial; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Integer getPlazoEntrega() { return plazoEntrega; }
    public void setPlazoEntrega(Integer plazoEntrega) { this.plazoEntrega = plazoEntrega; }

    public Integer getValidezCotizacion() { return validezCotizacion; }
    public void setValidezCotizacion(Integer validezCotizacion) { this.validezCotizacion = validezCotizacion; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public LocalDateTime getFechaEnvio() { return fechaEnvio; }
    public void setFechaEnvio(LocalDateTime fechaEnvio) { this.fechaEnvio = fechaEnvio; }

    public EstadoCotizacion getEstado() { return estado; }
    public void setEstado(EstadoCotizacion estado) { this.estado = estado; }

    public List<ItemCotizado> getItemsCotizados() { return itemsCotizados; }
    public void setItemsCotizados(List<ItemCotizado> itemsCotizados) { this.itemsCotizados = itemsCotizados; }

    public List<DocumentoCotizacion> getDocumentos() { return documentos; }
    public void setDocumentos(List<DocumentoCotizacion> documentos) { this.documentos = documentos; }
}
