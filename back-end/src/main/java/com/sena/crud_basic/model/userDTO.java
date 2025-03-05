package com.sena.crud_basic.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
/*
 * Para indicar que la clase es un modelo, se utiliza la anotacion bean @Entity
 * name= el nombre de la entidad en la base de datos
 */

@Entity(name="user")
public class userDTO {
/**
 * dto= Data transfer object
 * las clases DTO contienen las entidades de la base de datos
 */
//id= PRIMARY KEY
//GeneratedValue= Auto increment
//@Column=para indicar que el atributo es una colimna
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id", length = 20 )
private int id_user;

@Column(name="name", nullable = false,length = 255)
private String name;

@Column(name="last_name", nullable = false,length = 255 )
private String last_name;

@Column(name="address",  nullable = false,length = 255)
private String address;

@Column(name="phone_number", nullable = false,length = 20)
private String phone_number;

@Column(name="email", nullable = false,length = 120 )
private String email;

// Getter y Setter para id_user
public int getId_user() {
    return id_user;
}

public void setId_user(int id_user) {
    this.id_user = id_user;
}

// Getter y Setter para name
public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

// Getter y Setter para last_name
public String getLast_name() {
    return last_name;
}

public void setLast_name(String last_name) {
    this.last_name = last_name;
}

// Getter y Setter para address
public String getAddress() {
    return address;
}

public void setAddress(String address) {
    this.address = address;
}

// Getter y Setter para phone_number
public String getPhone_number() {
    return phone_number;
}

public void setPhone_number(String phone_number) {
    this.phone_number = phone_number;
}

// Getter y Setter para email
public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}
}
