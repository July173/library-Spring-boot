package com.sena.crud_basic.repository;
import com.sena.crud_basic.model.user_loanDTO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IUser_LoanRepository extends JpaRepository<user_loanDTO,Integer> {

     @Query("SELECT ul FROM user_loan ul WHERE ul.status=1")
    List<user_loanDTO> findAllUserLoanActive();

    @Query("SELECT ul FROM user_loan ul WHERE ul.name LIKE %?1% ")
    List<user_loanDTO> search(String filter);

}
