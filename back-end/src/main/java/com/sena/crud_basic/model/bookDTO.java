package com.sena.crud_basic.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name="book")
public class bookDTO {

@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id", length = 20)
private int id_book;

@Column(name="title", nullable = false, length = 255)
private String title;

@Column(name="author", nullable= false, length = 225)
private String author;

@Column(name="publisher", nullable= false, length = 225)
private String publisher;

@Column(name="general", nullable= false, length = 225)
private String general;

@Column(name="isbn", nullable= false, length = 13)
private int isbn;


public int getId_book(){
    return id_book;
}

public void setId_book(int id_book){
    this.id_book = id_book;
}


public String getTitle(){
    return title;
}

public void setTilte(String title){
    this.title = title;
}


public String getAuthor(){
    return author;
}
public void setAuthor(String author){
    this.author = author;
}



public String getPublisher(){
    return publisher;
}

public void setPublisher(String publisher){
    this.publisher = publisher;
}


public String getGeneral(){
    return general;
}

public void setGeneral(String general){
    this.general = general;
}


public int getIsbn(){
    return isbn;
}

public void setIsbn(int isbn){
    this.isbn = isbn;
}

}
