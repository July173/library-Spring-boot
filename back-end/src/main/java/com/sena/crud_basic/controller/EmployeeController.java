package com.sena.crud_basic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.model.employeeDTO;
import com.sena.crud_basic.service.EmployeeService;

@RestController
@RequestMapping("/api/v1/employee")

public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;    

    @PostMapping("/")
    public String registerEmployee(
        @RequestBody employeeDTO employee
        ){
        employeeService.save(employee);
        return "";
        
    }

}
