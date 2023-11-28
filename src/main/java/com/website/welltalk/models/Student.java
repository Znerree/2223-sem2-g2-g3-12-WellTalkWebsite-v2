package com.website.welltalk.models;

import javax.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstname;

    @Column
    private String lastname;
    
    @Column
    private String email;
    
    @Column
    private int year;

    @Column
    private int studentID;
    
    @Column
    private String department;
    
    @Column
    private String course;

    public Student(){}

    public Student(String firstname, String lastname, String email, int year, int studentID, String department, String course) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.year = year;
        this.studentID = studentID;
        this.department = department;
        this.course = course;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String name) {
        this.firstname = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String name) {
        this.lastname = name;
    }

    public Long getId() {
        return id;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

    public int getStudentID() {
        return studentID;
    }

    public void setStudentID(int studentID) {
        this.studentID = studentID;
    }
}
