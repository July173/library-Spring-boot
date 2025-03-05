package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class user_loanDTO {
// 🔑 Llave foránea hacia user
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private userDTO usuario;


    public userDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(userDTO usuario) {
        this.usuario = usuario;
    }

    // 🔑 Llave foránea hacia prestamo
    @ManyToOne
    @JoinColumn(name = "id_prestamo", nullable = false)
    private loanDTO prestamo;


    public loanDTO getPrestamo() {
        return prestamo;
    }

    public void setPrestamo(loanDTO prestamo) {
        this.prestamo = prestamo;
    }

    @Column(name = "state", nullable = false, length = 255)
    private String state;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Column(name = "observations", length = 255)
    private String observations;

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }
}

