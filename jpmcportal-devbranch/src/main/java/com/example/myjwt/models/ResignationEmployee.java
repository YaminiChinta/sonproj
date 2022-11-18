package com.example.myjwt.models;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.Date;

@Entity
@Table(name = "resignationemployee", uniqueConstraints = { @UniqueConstraint(columnNames = "id") })
public class ResignationEmployee {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
	private Long emp_ID;
	
    @Column
    private String employee_Name;

    @Column
    private Date resigned_on;
	
    @Column
    private Date last_working_date;

    @Column
    private String resignation_reason;
	
    @Column
    private String resignation_status;

    public Long getId() {
        return id;
    }

    public Long getEmp_ID() {
        return emp_ID;
    }

    public void setEmp_ID(Long emp_ID) {
        this.emp_ID = emp_ID;
    }

    public String getEmployee_Name() {
        return employee_Name;
    }

    public void setEmployee_Name(String employee_Name) {
        this.employee_Name = employee_Name;
    } 

    public Date getResigned_on() {
        return resigned_on;
    }

    public void setResigned_on(Date resigned_on) {
        this.resigned_on = resigned_on;
    }

    public Date getLast_working_date() {
        return last_working_date;
    }

    public void setLast_working_date(Date last_working_date) {
        this.last_working_date = last_working_date;
    }

    public String getResignation_reason() {
        return resignation_reason;
    }

    public void setResignation_reason(String resignation_reason) {
        this.resignation_reason = resignation_reason;
    }

    public String getResignation_status() {
        return resignation_status;
    }
    
    public void setResignation_status(String resignation_status) {
        this.resignation_status = resignation_status;
    }

    
	
}
