package com.example.myjwt.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myjwt.models.ResignationEmployee;
import com.example.myjwt.repo.ResignationEmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ResignationController extends BaseController{

    private ResignationEmployeeRepository resignationEmployeeRepository;

    public ResignationController(ResignationEmployeeRepository resignationEmployeeRepository) {
        this.resignationEmployeeRepository = resignationEmployeeRepository;
    }
    public static ResignationEmployee dtoToEntity(ResignationEmployee resignationEmployee){
        ResignationEmployee resignationEmployeeEntity = new ResignationEmployee();
        resignationEmployeeEntity.setEmp_ID(resignationEmployee.getEmp_ID());
        resignationEmployeeEntity.setEmployee_Name(resignationEmployee.getEmployee_Name());
        resignationEmployeeEntity.setLast_working_date(resignationEmployee.getLast_working_date());
        resignationEmployeeEntity.setResignation_reason(resignationEmployee.getResignation_reason());
        resignationEmployeeEntity.setResignation_status(resignationEmployee.getResignation_status());
        resignationEmployeeEntity.setResigned_on(resignationEmployee.getResigned_on());
        return resignationEmployeeEntity;
    }


    @GetMapping("/resignation")
    public List<ResignationEmployee> getUploadedSheetData(){
		return resignationEmployeeRepository.findAll();   
    }

    @PostMapping("/upload-resignation-data")
    public List<ResignationEmployee> uploadSheetData(@RequestBody List<ResignationEmployee> resignationEmployeeListData){
        List<ResignationEmployee> resignationEmployeeEntities = new ArrayList<>();

    for (ResignationEmployee resignationEmployee : resignationEmployeeListData) {
        resignationEmployeeEntities.add(dtoToEntity(resignationEmployee));
    }

     resignationEmployeeRepository.deleteAll();
    Iterable<ResignationEmployee> persistedUser = resignationEmployeeRepository.saveAll(resignationEmployeeEntities);
         System.out.println(persistedUser);
		return resignationEmployeeListData;   
    }

    

    @PostMapping("/update-resignation-employee-status")
    public ResignationEmployee getUserProfile(@RequestBody ResignationEmployee resignationEmployeeUpdateObject) {
		resignationEmployeeRepository.save(resignationEmployeeUpdateObject);
		return resignationEmployeeUpdateObject;
	}

}
