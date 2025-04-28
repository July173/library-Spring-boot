package com.sena.crud_basic.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.model.userDTO;
import com.sena.crud_basic.repository.IBookRepository;
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
        // Validar que el nombre no sea vacío y tenga una longitud entre 1 y 30 caracteres
        if (user.getName() == null || user.getName().trim().isEmpty() || user.getName().length() > 30) {
            return new responseDTO(
                    "Error",
                    "El nombre no puede estar vacío y debe tener una longitud entre 1 y 30 caracteres");
        }

        // Validar que el apellido no sea vacío
        if (user.getLast_name() == null || user.getLast_name().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "El apellido no puede estar vacío");
        }

        // Validar que la dirección no sea vacía
        if (user.getAddress() == null || user.getAddress().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "La dirección no puede estar vacía");
        }

        // Validar que el número de teléfono no sea vacío y tenga exactamente 10 dígitos
        if (user.getPhone_number() == null || String.valueOf(user.getPhone_number()).length() != 10) {
            return new responseDTO(
                    "Error",
                    "El número de teléfono debe tener exactamente 10 dígitos");
        }

        // Validar que el correo electrónico tenga un formato válido
        if (user.getEmail() == null || !user.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            return new responseDTO(
                    "Error",
                    "El correo electrónico no tiene un formato válido");
        }

        // Si todas las validaciones pasan, guardar el usuario
        IUserRepository.save(user);
        return new responseDTO(
                "OK",
                "Se registró correctamente");
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

    public responseDTO update(int id, userDTO user) {
        userDTO userUpdate = getUserById(id);
        userUpdate.setName(user.getName());
        userUpdate.setLast_name(user.getLast_name());
        userUpdate.setAddress(user.getAddress());
        userUpdate.setPhone_number(user.getPhone_number());
        userUpdate.setEmail(user.getEmail());
        IUserRepository.save(userUpdate);
        responseDTO response = new responseDTO(
                "OK",
                "Se actualizó correctamente");
        return response;
    }
}
