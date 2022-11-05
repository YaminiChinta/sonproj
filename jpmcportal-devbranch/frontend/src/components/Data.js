import React from 'react';
import {IndividualData} from '../components/IndividualData';

export const Data =({ excelData }) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.EmpId}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>
    ))
}
