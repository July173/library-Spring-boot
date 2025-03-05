package com.sena.crud_basic.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.loanDTO;

public interface ILoanRepository extends JpaRepository<loanDTO,Integer> {

}
