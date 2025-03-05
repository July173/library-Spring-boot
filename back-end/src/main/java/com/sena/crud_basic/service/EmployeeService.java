package com.sena.crud_basic.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena.crud_basic.model.employeeDTO;
import com.sena.crud_basic.repository.IEmployeeRepository;

@Service
public class EmployeeService {
    
    @Autowired
    private IEmployeeRepository IEmployeeRepository;

    public List<employeeDTO> getAllEmployee(){
        return IEmployeeRepository.findAll();
    }
    public employeeDTO getEmployeeById(int id){
        return IEmployeeRepository.findById(id).get();
    }
    public boolean save(employeeDTO employee){
        IEmployeeRepository.save(employee);
        return true;
    }

}
