package com.sena.crud_basic.controller;

import org.springframework.web.bind.annotation.RestController;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.userDTO;
import com.sena.crud_basic.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/user/")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Object> registerUser(
            @RequestBody userDTO user) {
                user.setStatus(1); // Activo por defecto
        responseDTO response = userService.save(user);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/")
    public ResponseEntity<Object> findAllUser() {
        List<userDTO> listUser = userService.getAllUser();
        return new ResponseEntity<>(listUser, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findByIdUser(@PathVariable int id) {
        userDTO user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        List<userDTO> ListUser = userService.getFilterUser(filter);
        return new ResponseEntity<>(ListUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
        responseDTO response = userService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

  

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable int id, @RequestBody userDTO user) {
        responseDTO response = userService.update(id, user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}