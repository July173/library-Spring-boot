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

    public List<employeeDTO> getAllEmployee() {
        return IEmployeeRepository.findAllEmployeeActive();
    }

    public List<employeeDTO> getFilterEmployee(String filter) {
        return IEmployeeRepository.search(filter);
    }

    public employeeDTO getEmployeeById(int id) {
        return IEmployeeRepository.findById(id).get();
    }

    public responseDTO save(employeeDTO employee) {
        // Validar que el nombre no sea vacío y tenga una longitud entre 1 y 30 caracteres
        if (employee.getName() == null || employee.getName().trim().isEmpty() || employee.getName().length() > 30) {
            return new responseDTO(
                    "Error",
                    "El nombre no puede estar vacío y debe tener una longitud entre 1 y 30 caracteres");
        }

        // Validar que el puesto (position) no sea vacío
        if (employee.getPosition() == null || employee.getPosition().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "El puesto no puede estar vacío");
        }

        // Validar que el número de teléfono no sea vacío y tenga exactamente 10 dígitos
        if (employee.getPhone_number() == null || String.valueOf(employee.getPhone_number()).length() != 10) {
            return new responseDTO(
                    "Error",
                    "El número de teléfono debe tener exactamente 10 dígitos");
        }

        // Si todas las validaciones pasan, guardar el empleado
        IEmployeeRepository.save(employee);
        return new responseDTO(
                "OK",
                "Se registró correctamente");
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

    public responseDTO update(int id, employeeDTO employee) {
        employeeDTO employeeUpdate = getEmployeeById(id);
        employeeUpdate.setName(employee.getName());
        employeeUpdate.setPhone_number(employee.getPhone_number());
        employeeUpdate.setPosition(employee.getPosition());
        IEmployeeRepository.save(employeeUpdate);
        responseDTO response = new responseDTO(
                "OK",
                "Se actualizó correctamente");
        return response;
    }

}
