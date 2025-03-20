package com.sena.crud_basic.repository;
import com.sena.crud_basic.model.employeeDTO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IEmployeeRepository extends JpaRepository<employeeDTO,Integer> {
     @Query("SELECT e FROM employee e WHERE e.status=1")
    List<employeeDTO> findAllEmployeeActive();
 
    @Query("SELECT e FROM employee e WHERE e.name LIKE %?1%")
    List<employeeDTO> search(String filter);
    
}
