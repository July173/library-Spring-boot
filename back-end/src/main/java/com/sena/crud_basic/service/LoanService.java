package com.sena.crud_basic.service;
import java.time.LocalDate;
import java.util.List;

import com.sena.crud_basic.repository.IBookRepository;
import com.sena.crud_basic.repository.ILoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.model.loanDTO;

@Service
public class LoanService {
    @Autowired
    private ILoanRepository ILoanRepository;

    public List<loanDTO> getAllLoan(){
        return ILoanRepository.findAllLoanActive();
    }
    public loanDTO getLoanById(int id){
        return ILoanRepository.findById(id).get();
    }
     public responseDTO save(loanDTO loan) {
        if (loan.getDate_loan().isAfter(LocalDate.now())){
            responseDTO response = new responseDTO(
                    "Error",
                    "");
            return response;
        }

        // añadir las n condiciones

        ILoanRepository.save(loan);
        responseDTO response = new responseDTO(
                "OK",
                "Se registró correctamente");
        return response;
        // return true;
    }
        public responseDTO delete(int id) {
        // IBookRepository.deleteById(id);
        loanDTO loan = getLoanById(id);
        loan.setStatus(0);
        ILoanRepository.save(loan);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
    }


}
