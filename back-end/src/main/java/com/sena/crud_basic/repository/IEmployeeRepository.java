package com.sena.crud_basic.repository;
import com.sena.crud_basic.model.employeeDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEmployeeRepository extends JpaRepository<employeeDTO,Integer> {

}
