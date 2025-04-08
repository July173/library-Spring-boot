package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "book")
public class bookDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 20)
    private int id_book;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "author", nullable = false, length = 225)
    private String author;

    @Column(name = "publisher", nullable = false, length = 225)
    private String publisher;

    @Column(name = "description", nullable = false, length = 225)
    private String description;

    @Column(name = "isbn", nullable = false, length = 13)
    private long isbn;
    @Column(name = "stock", nullable = false)
    private int stock;

    @Column(name = "status", nullable = false)
    private int status;

    @Column(name = "state_book", nullable = false, length = 30)
    private long state_book;
    
    @Column(name = "url", nullable = false, length = 255)
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int isStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getState_book() {
        return state_book;
    }

    public void setState_book(int state_book) {
        this.state_book = state_book;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getId_book() {
        return id_book;
    }

    public void setId_book(int id_book) {
        this.id_book = id_book;
    }

    public String getTitle() {
        return title;
    }

    public void setTilte(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public long getIsbn() {
        return isbn;
    }

    public void setIsbn(long isbn) {
        this.isbn = isbn;
    }
 // ✅ Constructor vacío requerido por Hibernate
    public bookDTO() {
    }
    public bookDTO(int id_book, String title, String author, String publisher, String description, long isbn, int stock,
            int status, int state_book, String url) {
        this.id_book = id_book;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.description = description;
        this.isbn = isbn;
        this.stock = stock;
        this.status = status;
        this.state_book = state_book;
        this.url = url;
    }



}
