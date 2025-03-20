package com.sena.crud_basic.service;

import java.util.List;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.bookDTO;
import com.sena.crud_basic.repository.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    // se realiza la conexion con el repositorio
    @Autowired
    private IBookRepository IBookRepository;

    public List<bookDTO> getAllBook() {
        return IBookRepository.findAllBookActive();
    }

    public List<bookDTO> getFilterBook(String filter) {
        return IBookRepository.search(filter);
    }

    public bookDTO getBookById(int id) {
        return IBookRepository.findById(id).get();
    }

    public responseDTO save(bookDTO book) {
        if (book.getTitle().length() < 1 || book.getTitle().length() > 255) {
            responseDTO response = new responseDTO(
                    "Error",
                    "El titulo debe tener una longitud entre 1 y 255 caracteres");
            return response;
        }

        // añadir las n condiciones

        IBookRepository.save(book);
        responseDTO response = new responseDTO(
                "OK",
                "Se registró correctamente");
        return response;
        // return true;
    }

    /*
     * private int id_book;
     * private String title;
     * private String author;
     * private String publisher;
     * private String general;
     * private int isbn;
     */

    public responseDTO delete(int id) {
        // IBookRepository.deleteById(id);
        bookDTO book = getBookById(id);
        book.setStatus(0);
        IBookRepository.save(book);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
    }

}
