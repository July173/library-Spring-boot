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
        // Validar que el usuario no sea nulo
        if (user_loan.getUser() == null || user_loan.getUser().getId_user() == 0) {
            return new responseDTO(
                    "Error",
                    "El usuario no puede estar vacío");
        }

        // Validar que el préstamo no sea nulo
        if (user_loan.getLoan() == null || user_loan.getLoan().getId_loan() == 0) {
            return new responseDTO(
                    "Error",
                    "El préstamo no puede estar vacío");
        }

        // Validar que el estado no sea nulo o vacío
        if (user_loan.getState() == null || user_loan.getState().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "El estado no puede estar vacío");
        }

        // Validar que las observaciones no sean nulas
        if (user_loan.getObservations() == null || user_loan.getObservations().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "Las observaciones no pueden estar vacías");
        }

        // Si todas las validaciones pasan, guardar el registro de préstamo de usuario
        IUser_LoanRepository.save(user_loan);
        return new responseDTO(
                "OK",
                "Se registró correctamente");
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