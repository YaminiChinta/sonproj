package com.example.myjwt.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myjwt.models.ResignationEmployee;

public interface ResignationEmployeeRepository extends JpaRepository<ResignationEmployee, Long>{
    
}
