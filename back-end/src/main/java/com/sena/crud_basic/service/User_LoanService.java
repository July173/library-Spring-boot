package com.sena.crud_basic.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena.crud_basic.model.user_loanDTO;
import com.sena.crud_basic.repository.IUser_LoanRepository;

@Service
public class User_LoanService {

    @Autowired
    private IUser_LoanRepository IUser_LoanRepository;

    public List <user_loanDTO> getAllCustomer(){
        return IUser_LoanRepository.findAll();
    }
    public user_loanDTO getUser_LoanById(int id){
        return IUser_LoanRepository.findById(id).get();
    }
    public boolean save(user_loanDTO user_loan){
        IUser_LoanRepository.save(user_loan);
        return true;
    }
  

}
