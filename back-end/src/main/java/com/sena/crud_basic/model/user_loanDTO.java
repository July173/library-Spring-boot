package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "user_loan")
public class user_loanDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 20)
    private int id_user_loan;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private userDTO user;

    @ManyToOne
    @JoinColumn(name = "id_loan", nullable = false)
    private loanDTO loan;

    @Column(name = "state_loan", nullable = false, length = 255)
    private String state;

    @Column(name = "status", nullable = false)
    private boolean status;

    @Column(name = "observations", length = 255, nullable = false)
    private String observations;

    public int getId_user_loan() {
        return id_user_loan;
    }

    public void setId_user_loan(int id_user_loan) {
        this.id_user_loan = id_user_loan;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public userDTO getUser() {
        return user;
    }

    public void setUser(userDTO user) {
        this.user = user;
    }

    public loanDTO getLoan() {
        return loan;
    }

    public void setLoan(loanDTO loan) {
        this.loan = loan;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public user_loanDTO(int id_user_loan, userDTO user, loanDTO loan, String state, boolean status,
            String observations) {
        this.id_user_loan = id_user_loan;
        this.user = user;
        this.loan = loan;
        this.state = state;
        this.status = status;
        this.observations = observations;
    }

}
