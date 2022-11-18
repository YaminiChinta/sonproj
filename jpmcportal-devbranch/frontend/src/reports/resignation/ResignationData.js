import { useState ,useEffect} from 'react'
import {Data} from '../../components/Data';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
import "../../css/resignation.css";
import {apiGetAllResignationEmployee,apiPostUpdateResignationEmployeeStatus,apiResignationGroupValueDropDown} from '../../utils/AppUtils';

const ResignationData = ()  =>{

 
  const [excelData, setExcelData]=useState(null);
  const [resingationCategoryData, setResingationCategoryData]=useState([]);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";


useEffect(()=>{
  apiResignationGroupValueDropDown().then((categories)=>{
    console.log(categories.data);
    setResingationCategoryData(categories.data);
  }).catch((err)=>{
    alert("Something went wrong :- ",err);
  })
  getAllData();  
},[])

function getAllData(){
  apiGetAllResignationEmployee().then((data) => {         
    setExcelData(data);
  }).catch((err) => {
    alert("Something went wrong :- ",err);
  });
}
const updateResignationEmployeeStatus = (item) => {
  apiPostUpdateResignationEmployeeStatus(item).then((element)=>{
    alert(`${element.employee_Name} resignation status is updated`);
    getAllData();
  });
}

  
  return (
    <div className="container">
      <br></br>
      <label className="formheading col-3">Resignation Employees Details</label>
      <label className='col-8'></label>
      <label className='col-1'><button className='formheading col-10' style={{border:"none"}}>save</button></label>
      <center><h3></h3></center>
      <div className='viewer'>
      {excelData===null&&<>No file selected
        <div className='table-responsive'>
        <table className="table gdvheader" width="100%">
        <thead>
                <tr width="100%">
                <th scope='col'>EmpId</th>
                  <th scope='col'>Employee Name</th>
                  <th scope='col'>Resigned On</th>
                  <th scope='col'>Last Working Date</th>
                  <th scope='col'>Resignation Reason</th>   
                  <th scope='col'>Category</th>                                
                </tr>
              </thead>
        </table>
        </div>
        </>}
        
        {excelData!==null&&(
          <div className='container'>
            <table className="table gdvheader" width="100%" >
              <thead>
                <tr width="100%" >
                  <th scope='col'>EmpId</th>
                  <th scope='col'>Employee Name</th>
                  <th scope='col'>Resigned On</th>
                  <th scope='col'>Last Working Date</th>
                  <th scope='col'>Resignation Reason</th>   
                  <th scope='col'>Category</th>         
                  <th scope='col'>Save</th>      
                </tr>
              </thead>
              <tbody className='tdcontent'>
                <Data excelData={excelData} categories={resingationCategoryData} updateResignationEmployeeStatus={updateResignationEmployeeStatus}/>
              </tbody>
            </table>            
          </div>
        )}        
      </div>

    </div>
  );

}

export default ResignationData;