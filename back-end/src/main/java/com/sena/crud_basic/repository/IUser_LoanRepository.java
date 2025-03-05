package com.sena.crud_basic.repository;
import com.sena.crud_basic.model.user_loanDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUser_LoanRepository extends JpaRepository<user_loanDTO,Integer> {

}
