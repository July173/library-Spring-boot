package com.sena.crud_basic.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sena.crud_basic.model.loanDTO;
import com.sena.crud_basic.service.LoanService;

@RestController
@RequestMapping("/api/v1/loan")

public class LoanController {
    @Autowired
    private LoanService loanService;

    @PostMapping("/")
    public String registerLoan(
        @RequestBody loanDTO loan
        ){
        loanService.save(loan);
        return "";
        
    }
}
