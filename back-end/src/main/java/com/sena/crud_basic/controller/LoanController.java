package com.sena.crud_basic.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.loanDTO;
import com.sena.crud_basic.service.LoanService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/loan/")

public class LoanController {
    @Autowired
    private LoanService loanService;

    @PostMapping("/")
    public ResponseEntity<Object> registerLoan(
            @RequestBody loanDTO loan) {
        loan.setDate_loan(LocalDate.now());
        var response = loanService.save(loan);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAllLoan() {
        List<loanDTO> listLoan = loanService.getAllLoan();
        return new ResponseEntity<>(listLoan, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findByIdLoan(@PathVariable int id) {
        loanDTO loan = loanService.getLoanById(id);
        return new ResponseEntity<>(loan, HttpStatus.OK);
    }

  @GetMapping("/search")
public ResponseEntity<Object> search(
        @RequestParam String filter,
        @RequestParam LocalDate startDate,
        @RequestParam LocalDate endDate) {

    List<loanDTO> listLoan = loanService.getFilterLoan(filter, startDate, endDate);
    return new ResponseEntity<>(listLoan, HttpStatus.OK);
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteLoan(@PathVariable int id) {
        responseDTO response = loanService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
