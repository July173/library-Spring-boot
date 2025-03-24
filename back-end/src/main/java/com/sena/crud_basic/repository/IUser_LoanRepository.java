package com.sena.crud_basic.repository;
import com.sena.crud_basic.model.user_loanDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUser_LoanRepository extends JpaRepository<user_loanDTO,Integer> {

     @Query("SELECT ul FROM user_loan ul WHERE ul.status=1")
    List<useer_loankDTO> findAllUser_LoanActive();

}
