package com.sena.crud_basic.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.employeeDTO;
import com.sena.crud_basic.repository.IEmployeeRepository;

@Service
public class EmployeeService {
    
    @Autowired
    private IEmployeeRepository IEmployeeRepository;

    public List<employeeDTO> getAllEmployee(){
        return IEmployeeRepository.findAllEmployeeActive();
    }
    public List<employeeDTO> getFilterEmployee(String filter) {
        return IEmployeeRepository.search(filter);
    }

    public employeeDTO getEmployeeById(int id) {
        return IEmployeeRepository.findById(id).get();
    }
   public responseDTO save(employeeDTO employee) {
        if (employee.getName().length() < 1 || employee.getName().length() > 30) {
            responseDTO response = new responseDTO(
                    "Error",
                    "El nombre debe tener una longitud entre 1 y 30 caracteres");
            return response;
        }

        // añadir las n condiciones

        IEmployeeRepository.save(employee);
        responseDTO response = new responseDTO(
                "OK",
                "Se registró correctamente");
        return response;
        // return true;
    }

    public responseDTO delete(int id) {
        // IBookRepository.deleteById(id);
        employeeDTO employee = getEmployeeById(id);
        employee.setStatus(0);
        IEmployeeRepository.save(employee);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
    }


   
}
