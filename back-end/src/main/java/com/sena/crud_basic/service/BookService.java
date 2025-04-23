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
    
        // ✅ Validación de longitud del ISBN (13 dígitos exactos)
        long isbn = book.getIsbn();
        if (isbn < 1000000000000L || isbn > 9999999999999L) {
            responseDTO response = new responseDTO(
                    "Error",
                    "El ISBN debe tener exactamente 13 dígitos");
            return response;
        }
    
        // añadir las n condiciones
    
        IBookRepository.save(book);
        responseDTO response = new responseDTO(
                "OK",
                "Se registró correctamente");
        return response;
    }
    
    /*
     * private int id_book;
     * private String title;
     * private String author;
     * private String publisher;
     * private String general;
     * private int isbn;
     */

    public responseDTO delete(int  id) {
        // IBookRepository.deleteById(id);
        bookDTO book = getBookById(id);
        book.setStatus(0);
        IBookRepository.save(book);
        responseDTO response = new responseDTO(
                "OK",
                "Se eliminó correctamente");
        return response;
        
    }

    public responseDTO update(bookDTO book) {
        IBookRepository.save(book);
        responseDTO response = new responseDTO(
                "OK",
                "Se actualizó correctamente");
        return response;
    }
    public responseDTO update(int id, bookDTO book) {
        bookDTO bookUpdate = getBookById(id);
        bookUpdate.setTilte(book.getTitle());
        bookUpdate.setAuthor(book.getAuthor());
        bookUpdate.setPublisher(book.getPublisher());
        bookUpdate.setDescription(book.getDescription());
        bookUpdate.setIsbn(book.getIsbn());
        IBookRepository.save(bookUpdate);
        responseDTO response = new responseDTO(
                "OK",
                "Se actualizó correctamente");
        return response;
    }

}
