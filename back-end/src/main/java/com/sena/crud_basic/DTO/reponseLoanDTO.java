package com.sena.crud_basic.DTO;

import com.sena.crud_basic.model.loanDTO;

public class reponseLoanDTO {
  private String status;
    private String message;
    private loanDTO loan;

    public loanDTO getLoan() {
        return loan;
    }

    public void setLoan(loanDTO loan) {
        this.loan = loan;
    }

   
    public reponseLoanDTO(String status, String message, loanDTO loan) {
        this.status = status;
        this.message = message;
        this.loan = loan;
    }

    public reponseLoanDTO() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
