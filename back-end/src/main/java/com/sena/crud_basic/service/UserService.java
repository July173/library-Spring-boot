package com.sena.crud_basic.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena.crud_basic.model.userDTO;
import com.sena.crud_basic.repository.IUserRepository;


@Service
public class UserService {
//se realiza la conexion con el repositorio 
    @Autowired
    private IUserRepository IUserRepository;

    public List<userDTO>getAllCustomer(){
        return IUserRepository.findAll();
    }
    public userDTO getUserrById(int id){
        return IUserRepository.findById(id).get();
    }
    public boolean save(userDTO user){
        IUserRepository.save(user);
        return true;
    }


}
