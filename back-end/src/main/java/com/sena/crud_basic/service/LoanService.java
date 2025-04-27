package com.sena.crud_basic.service;
import java.time.LocalDate;
import java.util.List;

import com.sena.crud_basic.repository.IBookRepository;
import com.sena.crud_basic.repository.ILoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.DTO.reponseLoanDTO;
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
    public List<loanDTO> getFilterLoan(String filter, LocalDate startDate, LocalDate endDate) {
        return ILoanRepository.search(filter, startDate, endDate);
    }
     public reponseLoanDTO save(loanDTO loan) {
        if (loan.getDate_loan().isAfter(LocalDate.now())){
            reponseLoanDTO response = new reponseLoanDTO(
                    "Error",
                    "La fecha de prestamo no puede ser mayor a la fecha actual",
                    null);
            return response;
        }

        // añadir las n condiciones

        ILoanRepository.save(loan);
        reponseLoanDTO response = new reponseLoanDTO(
                "OK",
                "Se registró correctamente",
                loan);
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
