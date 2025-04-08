package com.sena.crud_basic.controller;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.service.BookService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<Object> registerBook(
            @RequestBody bookDTO book) {
        responseDTO response = bookService.save(book);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /*
     * GET: consultar
     * POST:crear registros
     * PUT: actualizar todo
     * DELETE: eliminar
     * PATCH: actualizar parcial
     */

    @GetMapping("/")
    public ResponseEntity<Object> findAllBook() {
        List<bookDTO> listBook = bookService.getAllBook();
        return new ResponseEntity<>(listBook, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findByIdBook(@PathVariable int id) {
        bookDTO book = bookService.getBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    
    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        List<bookDTO> ListBook = bookService.getFilterBook(filter);
        return new ResponseEntity<>(ListBook, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable int id) {
        responseDTO response = bookService.delete(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
