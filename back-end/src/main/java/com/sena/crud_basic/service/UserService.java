package com.sena.crud_basic.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.userDTO;
import com.sena.crud_basic.repository.IUserRepository;

@Service
public class UserService {
    // se realiza la conexion con el repositorio
    @Autowired
    private IUserRepository IUserRepository;

    public List<userDTO> getAllUser() {
        return IUserRepository.findAllUserActive();
    }

    public userDTO getUserById(int id) {
        return IUserRepository.findById(id).get();
    }

    public List<userDTO> getFilterUser(String filter) {
        return IUserRepository.search(filter);
    }

    public responseDTO save(userDTO user) {
        if (user.getName().length() < 1 || user.getName().length() > 30) {
            responseDTO response = new responseDTO(
                    "Error",
                    "El nombre debe tener una longitud entre 1 y 30 caracteres");
            return response;
        }

        // añadir las n condiciones

        IUserRepository.save(user);
        responseDTO response = new responseDTO(
                "OK",
                "Se registró correctamente");
        return response;
        // return true;
    }

       public responseDTO delete(int id) {
        // IBookRepository.deleteById(id);
        userDTO user = getUserById(id);
        user.setStatus(0);
        IUserRepository.save(user);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
    }
}
