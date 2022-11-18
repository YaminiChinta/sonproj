import React from 'react';
import {IndividualData} from '../components/IndividualData';

export const Data =({ excelData,categories,updateResignationEmployeeStatus }) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.EmpId}>
            <IndividualData individualExcelData={individualExcelData} categories={categories} updateResignationEmployeeStatus={updateResignationEmployeeStatus}/>
        </tr>
    ))
}
