package com.sena.crud_basic.service;
import java.util.List;
import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.repository.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    //se realiza la conexion con el repositorio 
    @Autowired
    private IBookRepository IBookRepository;

    public List<bookDTO>getAllCustomer(){
        return IBookRepository.findAll();
    }
    public bookDTO getBookById(int id){
        return IBookRepository.findById(id).get();
    }
    public boolean save(bookDTO book){
        IBookRepository.save(book);
        return true;
    }
}
