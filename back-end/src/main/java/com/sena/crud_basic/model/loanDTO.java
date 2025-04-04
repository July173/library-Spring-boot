package com.sena.crud_basic.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "loan")

public class loanDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 20)
    private int id_loan;

    @Column(name = "date_loan", nullable = false)
    private LocalDate date_loan;

    @Column(name = "date_return", nullable = false)
    private LocalDate date_return;

    @Column(name = "state_loan", length = 30, nullable = false)
    private String state_loan;

    @Column(name = "status", nullable = false)
    private int status;

    @ManyToOne
    @JoinColumn(name = "id_employee", nullable = false) // Nombre de la columna FK en la base de datos
    private employeeDTO id_employee;

    @ManyToOne
    @JoinColumn(name = "id_book", nullable = false) // Nombre de la columna FK en la base de datos
    private bookDTO id_book;

    public String getState_loan() {
        return state_loan;
    }

    public void setState_loan(String state_loan) {
        this.state_loan = state_loan;
    }

    public LocalDate getDate_loan() {
        return date_loan;
    }

    public void setDate_loan(LocalDate date_loan) {
        this.date_loan = date_loan;
    }

    public LocalDate getDate_return() {
        return date_return;
    }

    public void setDate_return(LocalDate date_return) {
        this.date_return = date_return;
    }

    public int isStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

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

    public int getId_loan() {
        return id_loan;
    }

    public void setId_loan(int id_loan) {
        this.id_loan = id_loan;
    }

    public loanDTO(int id_loan, LocalDate date_loan, LocalDate date_return, String state_loan, int status,
            employeeDTO id_employee, bookDTO id_book) {
        this.id_loan = id_loan;
        this.date_loan = date_loan;
        this.date_return = date_return;
        this.state_loan = state_loan;
        this.status = status;
        this.id_employee = id_employee;
        this.id_book = id_book;
    }

}
