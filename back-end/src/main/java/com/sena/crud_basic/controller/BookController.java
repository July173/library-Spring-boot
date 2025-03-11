package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1/book")
public class BookController {

    @Autowired
    private BookService bookService;
    
    @PostMapping("/")
    public String registerBook(
        @RequestBody bookDTO book
        ){
        bookService.save(book);
        return "";
        
    }
}
