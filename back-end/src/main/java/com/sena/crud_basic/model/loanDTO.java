package com.sena.crud_basic.model;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name="loan")

public class loanDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", length = 20 )
    private int id_loan;

    @Column (name= "fecha_prestamo", nullable = false)
    private LocalDate fecha_prestamo;

    
    @Column (name= "fecha_devolucion", nullable = false)
    private LocalDate fecha_devolucion;

    @Column(name = "status", nullable = false)
    private int status;


   

    // 🔑 Llave foránea hacia la tabla Role
    @ManyToOne
    @JoinColumn(name = "id_employee", nullable = false) // Nombre de la columna FK en la base de datos
    private employeeDTO id_employee;

    @ManyToOne
    @JoinColumn(name = "id_book", nullable = false) // Nombre de la columna FK en la base de datos
    private bookDTO id_book;

    public bookDTO getId_book() {
        return id_book;
    }

    public void setId_book(bookDTO id_book) {
        this.id_book = id_book;
    }

    public employeeDTO getId_employee() {
        return id_employee;
    }

    public void setId_employee(employeeDTO id_employee) {
        this.id_employee = id_employee;
    }

    public LocalDate getFecha_devolucion() {
        return fecha_devolucion;
    }

    public void setFecha_devolucion(LocalDate fecha_devolucion) {
        this.fecha_devolucion = fecha_devolucion;
    }


    public int getId_loan() {
        return id_loan;
    }

    public void setId_loan(int id_loan) {
        this.id_loan = id_loan;
    }

    public LocalDate getFecha_prestamo() {
        return fecha_prestamo;
    }

    public void setFecha_prestamo(LocalDate fecha_prestamo) {
        this.fecha_prestamo = fecha_prestamo;
    }
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public loanDTO(int id_loan, LocalDate fecha_prestamo, LocalDate fecha_devolucion, int status,
            employeeDTO id_employee, bookDTO id_book) {
        this.id_loan = id_loan;
        this.fecha_prestamo = fecha_prestamo;
        this.fecha_devolucion = fecha_devolucion;
        this.status = status;
        this.id_employee = id_employee;
        this.id_book = id_book;
    }

   
}
