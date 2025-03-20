package com.sena.crud_basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.employeeDTO;
import com.sena.crud_basic.service.EmployeeService;

@RestController
@RequestMapping("/api/v1/employee")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/")
    public ResponseEntity<Object> registerEmployee(
            @RequestBody employeeDTO employee) {
            responseDTO response = employeeService.save(employee);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/")
    public ResponseEntity<Object> findAllEmployee() {
        List<employeeDTO> listEmployee = employeeService.getAllEmployee();
        return new ResponseEntity<>(listEmployee, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findByIdEmployee(@PathVariable int id) {
        employeeDTO employee = employeeService.getEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        List<employeeDTO> listEmployee = employeeService.getFilterEmployee(filter);
        return new ResponseEntity<>(listEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable int id) {
        responseDTO response = employeeService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
