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
        // Validar que la fecha de préstamo no sea nula
        if (loan.getDate_loan() == null) {
            return new reponseLoanDTO(
                    "Error",
                    "La fecha de préstamo no puede estar vacía",
                    null);
        }

        // Validar que la fecha de devolución no sea nula
        if (loan.getDate_return() == null) {
            return new reponseLoanDTO(
                    "Error",
                    "La fecha de devolución no puede estar vacía",
                    null);
        }

        // Validar que el estado del préstamo no sea nulo o vacío
        if (loan.getState_loan() == null || loan.getState_loan().trim().isEmpty()) {
            return new reponseLoanDTO(
                    "Error",
                    "El estado del préstamo no puede estar vacío",
                    null);
        }

        // Validar que el libro no sea nulo
        if (loan.getId_book() == null || loan.getId_book().getId_book() == 0) {
            return new reponseLoanDTO(
                    "Error",
                    "El libro no puede estar vacío",
                    null);
        }

        // Validar que la fecha de préstamo no sea mayor a la fecha actual
        if (loan.getDate_loan().isAfter(LocalDate.now())) {
            return new reponseLoanDTO(
                    "Error",
                    "La fecha de préstamo no puede ser mayor a la fecha actual",
                    null);
        }

        // Buscar el libro desde el repositorio usando el ID
        Optional<bookDTO> optionalBook = IBookRepository.findById(loan.getId_book().getId_book());
        if (optionalBook.isEmpty()) {
            return new reponseLoanDTO("Error", "No se encontró el libro", null);
        }

        bookDTO book = optionalBook.get();

        // Verificar que haya stock disponible
        if (book.getStock() <= 0) {
            return new reponseLoanDTO("Error", "No hay stock disponible para este libro", null);
        }

        // Guardar el préstamo
        ILoanRepository.save(loan);

        // Actualizar el stock del libro
        book.setStock(book.getStock() - 1);
        IBookRepository.save(book);

        return new reponseLoanDTO(
                "OK",
                "Se registró correctamente",
                loan);
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
            if (previousState.equals("On Loan") && newState.equals("Return")) {
                book.setStock(book.getStock() + 1);
            } else if (previousState.equals("Return") && newState.equals("On Loan")) {
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