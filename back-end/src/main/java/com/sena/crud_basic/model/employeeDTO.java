package com.sena.crud_basic.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name="employee")
public class employeeDTO {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name= "id", length = 20)
private int id_employee;

@Column (name= "name", nullable = false, length = 255)
private String name;

@Column (name= "position", nullable = false, length = 255)
private String position;

@Column (name= "phone_number", nullable = false, length = 20)
private String phone_number;

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}



// Getter y Setter para phone_number
public String getPosition() {
    return position;
}

public void setPosition(String position) {
    this.position = position;
}


// Getter y Setter para phone_number
public String getPhone_number() {
    return phone_number;
}

public void setPhone_number(String phone_number) {
    this.phone_number = phone_number;
}


}
