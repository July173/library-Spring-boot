package com.sena.crud_basic.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.userDTO;

public interface IUserRepository extends JpaRepository<userDTO,Integer> {

}
