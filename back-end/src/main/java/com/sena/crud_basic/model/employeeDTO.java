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

@Column (name= "name", nullable = false, length = 30)
private String name;

@Column (name= "position", nullable = false, length = 30)
private String position;

@Column (name= "phone_number", nullable = false, length = 20)
private String phone_number;

@Column(name = "status", nullable = false)
private int status;


public int getId_employee() {
    return id_employee;
}

public void setId_employee(int id_employee) {
    this.id_employee = id_employee;
}

public int getStatus() {
    return status;
}

public void setStatus(int status) {
    this.status = status;
}

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

public employeeDTO(int id_employee, String name, String position, String phone_number, int status) {
    this.id_employee = id_employee;
    this.name = name;
    this.position = position;
    this.phone_number = phone_number;
    this.status = status;
}


}
