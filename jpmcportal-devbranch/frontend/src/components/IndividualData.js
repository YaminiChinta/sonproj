import React from 'react';
import Select from "react-select";
import moment from 'moment';

export const IndividualData = ({individualExcelData}) => {
    return(
        <>
            <td>{individualExcelData.EmpId}</td>
            <td>{individualExcelData.EmployeeName}</td>
            <td style={{width:"13%", textAlign:'center'}}>{moment(individualExcelData.ResignedOn).format('DD-MM-YYYY')}</td>
            <td style={{width:"13%", textAlign:'center'}}>{moment(individualExcelData.LWD).format('DD-MM-YYYY')}</td>
            <td>{individualExcelData.ResignationReason}</td>
            <td><Select
                  options={[{ value: "Resignation", label: "Resignation" }, { value: "RTH", label: "RTH" }, { value: "Long Leaves", label: "Long Leaves" }]}></Select></td>
        </>
    )
}
