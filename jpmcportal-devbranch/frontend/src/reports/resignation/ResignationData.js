import { useState } from 'react'
import {Data} from '../../components/Data';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
import "../../css/resignation.css";

const ResignationData = ()  =>{

  const { state } = useLocation();
  const {query} = state;
  console.log("stateData,",state);
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
  const [excelData, setExcelData]=useState(query);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    else{
      setExcelData(null);
    }
  }
  
  return (
    <div className="container">
      <br></br>
      <label className="formheading">Resignation Employees Details</label>
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
                </tr>
              </thead>
              <tbody className='tdcontent'>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}        
      </div>

    </div>
  );

}

export default ResignationData;