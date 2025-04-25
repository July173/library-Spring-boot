package com.sena.crud_basic.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sena.crud_basic.model.userDTO;

public interface IUserRepository extends JpaRepository<userDTO,Integer> {

    @Query("SELECT u FROM user u WHERE u.status=1")
    List<userDTO> findAllUserActive();

    @Query("SELECT u FROM user u WHERE u.name LIKE %?1%OR u.last_name LIKE %?1%")
    List<userDTO> search(String filter);
}
