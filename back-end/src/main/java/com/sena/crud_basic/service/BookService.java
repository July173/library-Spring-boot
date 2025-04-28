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
        // Validar que el título no sea vacío
        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "El título no puede estar vacío");
        }

        // Validar que el autor no sea vacío
        if (book.getAuthor() == null || book.getAuthor().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "El autor no puede estar vacío");
        }

        // Validar que el editor no sea vacío
        if (book.getPublisher() == null || book.getPublisher().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "El editor no puede estar vacío");
        }

        // Validar que la descripción no sea vacía
        if (book.getDescription() == null || book.getDescription().trim().isEmpty()) {
            return new responseDTO(
                    "Error",
                    "La descripción no puede estar vacía");
        }

        // Validar que el ISBN no sea vacío y tenga 13 dígitos
        if (book.getIsbn() <= 0 || String.valueOf(book.getIsbn()).length() != 13) {
            return new responseDTO(
                    "Error",
                    "El ISBN debe tener exactamente 13 dígitos y no puede estar vacío");
        }

        // Validar que el stock no sea negativo
        if (book.getStock() < 0) {
            return new responseDTO(
                    "Error",
                    "El stock no puede ser negativo");
        }

        // Si todas las validaciones pasan, guardar el libro
        IBookRepository.save(book);
        return new responseDTO(
                "OK",
                "Se registró correctamente");
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
