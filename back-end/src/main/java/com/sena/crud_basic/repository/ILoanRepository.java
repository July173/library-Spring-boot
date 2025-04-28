package com.sena.crud_basic.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena.crud_basic.model.loanDTO;

public interface ILoanRepository extends JpaRepository<loanDTO, Integer> {

       // Obtener todos los préstamos activos
       @Query("SELECT l FROM loan l WHERE l.status = 1")
       List<loanDTO> findAllLoanActive();

       // Buscar préstamos según los filtros y el rango de fechas
       @Query("SELECT new com.sena.crud_basic.model.loanDTO(l.id_loan, l.date_loan, l.date_return, l.state_loan, l.status, e, b) "
                     +
                     "FROM loan l " +
                     "INNER JOIN l.id_employee e " +
                     "INNER JOIN l.id_book b " +
                     "WHERE (LOWER(b.title) LIKE LOWER(CONCAT('%', :filter, '%')) " +
                     "   OR LOWER(b.author) LIKE LOWER(CONCAT('%', :filter, '%')) " +
                     "   OR LOWER(e.name) LIKE LOWER(CONCAT('%', :filter, '%'))) " +
                     "AND l.status = 1 " +
                     "AND l.date_loan BETWEEN :startDate AND :endDate")
       List<loanDTO> search(@Param("filter") String filter,
                     @Param("startDate") LocalDate startDate,
                     @Param("endDate") LocalDate endDate);

       @Query("SELECT l FROM loan l JOIN FETCH l.id_book WHERE l.id_loan = :id")
       loanDTO findLoanByIdWithBook(@Param("id") int id);
}
