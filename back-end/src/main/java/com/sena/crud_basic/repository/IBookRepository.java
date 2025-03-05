package com.sena.crud_basic.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.bookDTO;

public interface IBookRepository extends JpaRepository<bookDTO,Integer> {

}
