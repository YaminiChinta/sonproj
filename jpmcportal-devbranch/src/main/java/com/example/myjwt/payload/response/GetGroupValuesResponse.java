package com.example.myjwt.payload.response;

import java.util.List;

import com.example.myjwt.models.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetGroupValuesResponse {
    
    private boolean error;
    private String message;
    private List<String> data;

}
