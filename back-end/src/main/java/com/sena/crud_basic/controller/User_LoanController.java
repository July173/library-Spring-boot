package com.sena.crud_basic.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.sena.crud_basic.model.user_loanDTO;
import com.sena.crud_basic.service.User_LoanService;

@RestController
public class User_LoanController {

    @Autowired
    private User_LoanService user_LoanService;

    @PostMapping("/user_loan")
    public String registerUser_Loan(
        @RequestBody user_loanDTO user_loan
        ){
        user_LoanService.save(user_loan);
        return "";
        
    }	

}
