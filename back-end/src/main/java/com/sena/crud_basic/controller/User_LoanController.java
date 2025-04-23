package com.sena.crud_basic.controller;
import org.springframework.web.bind.annotation.RestController;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.user_loanDTO;
import com.sena.crud_basic.service.User_LoanService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/user_loan/")

public class User_LoanController {

    @Autowired
    private User_LoanService user_LoanService;

    @PostMapping("/")
    public ResponseEntity<Object> registerUser_Loan(
             @RequestBody user_loanDTO user_loan ) {
        responseDTO response = user_LoanService.save(user_loan);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }	
      @GetMapping("/")
    public ResponseEntity<Object> findAllUser_Loan() {
        List<user_loanDTO> listUser_Loan = user_LoanService.getAllUserLoan();
        return new ResponseEntity<>(listUser_Loan, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findByIdUser_Loan(@PathVariable int id) {
        user_loanDTO user_loan = user_LoanService.getUserLoanById(id);
        return new ResponseEntity<>(user_loan, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUserLoan(@PathVariable int id) {
        responseDTO response = user_LoanService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
