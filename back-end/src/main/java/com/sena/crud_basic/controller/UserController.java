package com.sena.crud_basic.controller;
import org.springframework.web.bind.annotation.RestController;
import com.sena.crud_basic.model.userDTO;
import com.sena.crud_basic.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public String registerUser(
        @RequestBody userDTO user
        ){
        userService.save(user);
        return "";
        
    }
}
