package com.sena.crud_basic.service;
import java.util.List;
import com.sena.crud_basic.repository.ILoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.model.loanDTO;

@Service
public class LoanService {
    @Autowired
    private ILoanRepository ILoanRepository;

    public List<loanDTO> getAllLoan(){
        return ILoanRepository.findAll();
    }
    public loanDTO getLoanById(int id){
        return ILoanRepository.findById(id).get();
    }
    public boolean save(loanDTO loan){
        ILoanRepository.save(loan);
        return true;
    }


}
