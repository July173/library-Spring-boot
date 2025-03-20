package com.sena.crud_basic.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sena.crud_basic.model.loanDTO;

public interface ILoanRepository extends JpaRepository<loanDTO,Integer> {
 @Query("SELECT l FROM loan l WHERE l.status=1")
    List<loanDTO> findAllLoanActive();

   
   
}
