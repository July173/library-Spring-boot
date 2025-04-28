package com.sena.crud_basic.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.sena.crud_basic.repository.IBookRepository;
import com.sena.crud_basic.repository.ILoanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.DTO.reponseLoanDTO;
import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.model.loanDTO;

@Service
public class LoanService {
    @Autowired
    private ILoanRepository ILoanRepository;
    @Autowired
    private IBookRepository IBookRepository;
    @Autowired
    private User_LoanService User_LoanService;

    public List<loanDTO> getAllLoan() {
        return ILoanRepository.findAllLoanActive();

    }

    public loanDTO getLoanById(int id) {
        return ILoanRepository.findById(id).get();
    }

    public List<loanDTO> getFilterLoan(String filter, LocalDate startDate, LocalDate endDate) {
        return ILoanRepository.search(filter, startDate, endDate);
    }

    public reponseLoanDTO save(loanDTO loan) {
        if (loan.getDate_loan().isAfter(LocalDate.now())) {
            reponseLoanDTO response = new reponseLoanDTO(
                    "Error",
                    "La fecha de prestamo no puede ser mayor a la fecha actual",
                    null);
            return response;
        }

        // añadir las n condiciones

        // bookDTO book = loan.getId_book();
        // Buscar el libro desde el repositorio usando el ID
        Optional<bookDTO> optionalBook = IBookRepository.findById(loan.getId_book().getId_book());
        if (optionalBook.isEmpty()) {
            return new reponseLoanDTO("Error", "No se encontró el libro", null);
        }

        bookDTO book = optionalBook.get();
        // 🔥 Verificar que haya stock disponible
        if (book.getStock() <= 0) {
            return new reponseLoanDTO("Error", "No hay stock disponible para este libro", null);
        }
        ILoanRepository.save(loan);
        book.setStock(book.getStock() - 1);
        IBookRepository.save(book);
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
        User_LoanService.deleteByIdLoan(loan.getId_loan());
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
    }

    public responseDTO update(int id, loanDTO loan) {

        //if(loan.getId_book().getId_book() == 0){
        //    return new responseDTO("Error", "El libro no puede ser nulo");
        //}

        if (loan.getId_book().getId_book() == 0) {
            return new responseDTO("Error", "No se encontró el libro");
        }

        loanDTO loanUpdate = getLoanById(id);

        String previousState = loanUpdate.getState_loan();
        String newState = loan.getState_loan();

        loanUpdate.setDate_loan(loan.getDate_loan());
        loanUpdate.setDate_return(loan.getDate_return());
        loanUpdate.setState_loan(loan.getState_loan());

        ILoanRepository.save(loanUpdate);

        if (!previousState.equals(newState)) {
            if (loan.getId_book() == null) {
                return new responseDTO("Error", "No se encontró el libro");
            }
            Optional<bookDTO> optionalBook = IBookRepository.findById(loan.getId_book().getId_book());
            if (optionalBook.isEmpty()) {
                return new responseDTO("Error", "No se encontró el libro");
            }
            bookDTO book = optionalBook.get();
            if (previousState.equals("En prestamo") && newState.equals("Devuelto")) {
                book.setStock(book.getStock() + 1);
            } else if (previousState.equals("Devuelto") && newState.equals("En prestamo")) {
                book.setStock(book.getStock() - 1);
            }
            IBookRepository.save(book);
        }

        responseDTO response = new responseDTO(
                "OK",
                "Se actualizó correctamente");
        return response;

    }
}