package com.sena.crud_basic.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.user_loanDTO;
import com.sena.crud_basic.repository.IUser_LoanRepository;

@Service
public class User_LoanService {

    @Autowired
    private IUser_LoanRepository IUser_LoanRepository;

    public List <user_loanDTO> getAllUserLoan(){
        return IUser_LoanRepository.findAllUserLoanActive();
    }
    public user_loanDTO getUserLoanById(int id){
        return IUser_LoanRepository.findById(id).get();
    }

    public responseDTO save(user_loanDTO user_loan) {
      

        // añadir las n condiciones

        IUser_LoanRepository.save(user_loan);
        responseDTO response = new responseDTO(
                "OK",
                "Se registró correctamente");
        return response;
        // return true;
    }

       public responseDTO deleteByIdLoan(int id) {
        // IBookRepository.deleteById(id);
        user_loanDTO user_loan = IUser_LoanRepository.findByIdLoan(id);
        user_loan.setStatus(0);
        IUser_LoanRepository.save(user_loan);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
    }
       public responseDTO delete(int id) {
        user_loanDTO user_loan = IUser_LoanRepository.findByIdUserLoan(id);
        user_loan.setStatus(0);
        IUser_LoanRepository.save(user_loan);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
       }
}