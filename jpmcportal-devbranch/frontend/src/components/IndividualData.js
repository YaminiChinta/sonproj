import React, {useState, useEffect } from "react";
import Select from "react-select";
import moment from 'moment';

export const IndividualData = ({individualExcelData,categories,updateResignationEmployeeStatus}) => {
    
    const [selectedItem,setSelectedItem] = useState(individualExcelData.resignation_status);
function updateData(item){
    individualExcelData.resignation_status = item;
    updateResignationEmployeeStatus(individualExcelData);
}

    return(
        <>
            <td>{individualExcelData.emp_ID}</td>
            <td>{individualExcelData.employee_Name}</td>
            <td style={{width:"13%", textAlign:'center'}}>{moment(individualExcelData.resigned_on).format('DD-MM-YYYY')}</td>
            <td style={{width:"13%", textAlign:'center'}}>{moment(individualExcelData.LWD).format('DD-MM-YYYY')}</td>
            <td>{individualExcelData.resignation_reason}</td>
            
            <td >
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" style={{font:"Verdana",fontSize:"11px"}} value={selectedItem} onChange={(e)=>setSelectedItem(e.target.value)}>
                <option style={{font:"Verdana",fontSize:"11px"}} value="">Select..</option>
                    {categories.map((item) => (
                <option style={{font:"Verdana",fontSize:"11px"}} key={item} value={item} >{item}</option>
                ))
                }
             </select>
             </td>
             <th scope='col' ><button style={{border:"none"}} onClick={()=>updateData(selectedItem)}>save</button></th>
             {/* <img src="/static/media/saveicondisabled.f8285d9ad041d4e85b9f51b01fb7dd3d.svg" alt="Save" name="img939565" id="img939565" width="15" height="15"></img> */}
        </>
    )
}
