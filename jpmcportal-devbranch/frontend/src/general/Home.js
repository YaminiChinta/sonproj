import React, { useState, useEffect } from "react";

import HomeService from "../services/home.service";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../general/home.css";

const Home = () => {
  const [content, setContent] = useState([]);
  const [statData, setStatData] = useState([]);
  const [reportViews, setReportViews] = useState([]);
  const [selected, setSelected] = useState(2);
  const [hasRecords, setHasRecords] = useState(false);
  const { register, handleSubmit, errors, control } = useForm({
    // use mode to specify the event that triggers each input field
    mode: "onBlur",
  });

  /*useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);*/

  useEffect(() => {
    HomeService.getHomeContent().then(
      (response) => {
        setContent(response);
        const reportView = [];
        let idVal;
        let filenameVal;

        response.forEach((assignment, index) => {
          idVal = assignment.id;
          filenameVal = assignment.id + ". " + assignment.filename;
          reportView.push({
            value: idVal,
            label: filenameVal,
          });
        });
        setReportViews(reportView);
      },
      (error) => {
        console.log(error);
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const onSubmit = (data) => {};

  const handleError = (errors) => {};

  const registerOptions = {
    name: { required: true },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
    role: { required: "Role is required" },
  };

  const getReportData = (reportID, paramId) => {
    HomeService.getAssignmentReportStat(reportID, paramId).then(
      (response) => {
        setStatData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  };

  const handleChange = (event) => {
    setSelected(event.value);
    getReportData(1, event.value);
  };

  const getPercentage = (number, total) => {
    if (total > 0) return ((number * 100) / total).toFixed(1) + "%";
    else return "-";
  };

  const renderTableData = () => {
    let allRowTotalFTE = 0.0;
    let offshoreBillTotalFTE = 0.0;
    let offshoreNBLTotalFTE = 0.0;
    let onsiteBillTotalFTE = 0.0;
    let onsiteNBLTotalFTE = 0.0;
    statData.forEach((row, index) => {
      allRowTotalFTE =
        allRowTotalFTE +
        row.offshoreBillFte +
        row.offshoreNBLFte +
        row.onsiteBillFte +
        row.onsiteNBLFte;

      offshoreBillTotalFTE = offshoreBillTotalFTE + row.offshoreBillFte;
      offshoreNBLTotalFTE = offshoreNBLTotalFTE + row.offshoreNBLFte;
      onsiteBillTotalFTE = onsiteBillTotalFTE + row.onsiteBillFte;
      onsiteNBLTotalFTE = onsiteNBLTotalFTE + row.onsiteNBLFte;
    });

    return statData.map((row, index) => {
      let totalFte;

      totalFte =
        row.offshoreBillFte +
        row.offshoreNBLFte +
        row.onsiteBillFte +
        row.onsiteNBLFte;

      return (
        <tr>
          <td className="gridviewcontentname">{row.grade}</td>
          <td className="gridviewcontentno">{row.offshoreBillFte}</td>
          <td className="gridviewcontentno">
            {getPercentage(
              row.offshoreBillFte,
              row.offshoreBillFte + row.offshoreNBLFte
            )}
          </td>
          <td className="gridviewcontentnbl">{row.offshoreNBLFte}</td>
          <td className="gridviewcontentnbl">
            {getPercentage(
              row.offshoreNBLFte,
              row.offshoreBillFte + row.offshoreNBLFte
            )}
          </td>
          <td className="gridviewcontentsubtotal">
            {row.offshoreBillFte + row.offshoreNBLFte}
          </td>
          <td className="gridviewcontentsubtotal">
            {getPercentage(row.offshoreBillFte + row.offshoreNBLFte, totalFte)}
          </td>

          <td className="gridviewcontentno">{row.onsiteBillFte}</td>
          <td className="gridviewcontentno">
            {getPercentage(
              row.onsiteBillFte,
              row.onsiteBillFte + row.onsiteNBLFte
            )}
          </td>
          <td className="gridviewcontentnbl">{row.onsiteNBLFte}</td>
          <td className="gridviewcontentnbl">
            {getPercentage(
              row.onsiteNBLFte,
              row.onsiteBillFte + row.onsiteNBLFte
            )}
          </td>
          <td className="gridviewcontentsubtotal">
            {row.onsiteBillFte + row.onsiteNBLFte}
          </td>
          <td className="gridviewcontentsubtotal">
            {getPercentage(row.onsiteBillFte + row.onsiteNBLFte, totalFte)}
          </td>

          <td className="gridviewcontentno">
            {row.offshoreBillFte + row.onsiteBillFte}
          </td>
          <td className="gridviewcontentno">
            {getPercentage(row.offshoreBillFte + row.onsiteBillFte, totalFte)}
          </td>
          <td className="gridviewcontentnbl">
            {row.offshoreNBLFte + row.onsiteNBLFte}
          </td>
          <td className="gridviewcontentnbl">
            {getPercentage(row.offshoreNBLFte + row.onsiteNBLFte, totalFte)}
          </td>
          <td className="gridviewcontentsubtotal">
            {row.offshoreBillFte +
              row.onsiteBillFte +
              row.offshoreNBLFte +
              row.onsiteNBLFte}
          </td>
          <td className="gridviewcontentsubtotal">
            {getPercentage(
              row.offshoreBillFte +
                row.onsiteBillFte +
                row.offshoreNBLFte +
                row.onsiteNBLFte,
              allRowTotalFTE
            )}
          </td>
        </tr>
      ); //ends
    }); //ends return loop
  };

  const renderTotalTableData = () => {
    let allRowTotalFTE = 0.0;
    let offshoreBillTotalFTE = 0.0;
    let offshoreNBLTotalFTE = 0.0;
    let onsiteBillTotalFTE = 0.0;
    let onsiteNBLTotalFTE = 0.0;
    statData.forEach((row, index) => {
      allRowTotalFTE =
        allRowTotalFTE +
        row.offshoreBillFte +
        row.offshoreNBLFte +
        row.onsiteBillFte +
        row.onsiteNBLFte;

      offshoreBillTotalFTE = offshoreBillTotalFTE + row.offshoreBillFte;
      offshoreNBLTotalFTE = offshoreNBLTotalFTE + row.offshoreNBLFte;
      onsiteBillTotalFTE = onsiteBillTotalFTE + row.onsiteBillFte;
      onsiteNBLTotalFTE = onsiteNBLTotalFTE + row.onsiteNBLFte;
    });

    return (
      <tr className="datarowttoal">
        <td className="gridviewcontentname">Total</td>
        <td className="gridviewcontentno">{offshoreBillTotalFTE}</td>
        <td className="gridviewcontentno">
          {getPercentage(
            offshoreBillTotalFTE,
            offshoreBillTotalFTE + offshoreNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentnbl">{offshoreNBLTotalFTE}</td>
        <td className="gridviewcontentnbl">
          {getPercentage(
            offshoreNBLTotalFTE,
            offshoreBillTotalFTE + offshoreNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {offshoreBillTotalFTE + offshoreNBLTotalFTE}
        </td>
        <td className="gridviewcontentsubtotal">
          {getPercentage(
            offshoreBillTotalFTE + offshoreNBLTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentno">{onsiteBillTotalFTE}</td>
        <td className="gridviewcontentno">
          {getPercentage(
            onsiteBillTotalFTE,
            onsiteBillTotalFTE + onsiteNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentnbl">{onsiteNBLTotalFTE}</td>
        <td className="gridviewcontentnbl">
          {getPercentage(
            onsiteNBLTotalFTE,
            onsiteBillTotalFTE + onsiteNBLTotalFTE
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {onsiteBillTotalFTE + onsiteNBLTotalFTE}
        </td>
        <td className="gridviewcontentsubtotal">
          {getPercentage(
            onsiteBillTotalFTE + onsiteNBLTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentno">
          {offshoreBillTotalFTE + onsiteBillTotalFTE}
        </td>
        <td className="gridviewcontentno">
          {getPercentage(
            offshoreBillTotalFTE + onsiteBillTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentnbl">
          {offshoreNBLTotalFTE + onsiteNBLTotalFTE}
        </td>
        <td className="gridviewcontentnbl">
          {getPercentage(
            offshoreNBLTotalFTE + onsiteNBLTotalFTE,
            allRowTotalFTE
          )}
        </td>
        <td className="gridviewcontentsubtotal">
          {offshoreBillTotalFTE +
            onsiteBillTotalFTE +
            offshoreNBLTotalFTE +
            onsiteNBLTotalFTE}
        </td>
        <td className="gridviewcontentsubtotal"></td>
      </tr>
    ); //ends
  };

  return (
    <div>
      {/* <FormGroup>
        <Label>Name</Label>
        <Input name="name" {...register("name", registerOptions.name)} />
        {errors?.name && errors.name.message}
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          {...register("email", registerOptions.email)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          {...register("password", registerOptions.password)}
        />
     </FormGroup>*/}

      <div>
        <div>
          <table className="assignmentdropdown">
            <tbody>
              <tr>
                <td className="tddropdownlabel">
                  <Label>Assignent Reports: &nbsp;</Label>
                </td>
                <td className="tdheaderelements">
                  <Form onSubmit={handleSubmit(onSubmit, handleError)}>
                    <FormGroup>
                      <Select
                        onChange={handleChange}
                        options={reportViews}
                      ></Select>
                    </FormGroup>
                  </Form>
                </td>
              </tr>
              <tr width="100%">
                <td>
                  {hasRecords ? (
                    <table
                      cellSpacing="0"
                      cellPadding="5"
                      rules="all"
                      id="tablepyramid"
                    >
                      <tbody>
                        <tr className="gdvheader">
                          <td colSpan="1">Grade</td>
                          <td colSpan="6">Offshore</td>
                          <td colSpan="6">Onsite</td>
                          <td colSpan="6">Total</td>
                        </tr>
                        <tr className="gdvheader">
                          <th className="gdvheader" scope="col">
                            &nbsp;
                          </th>

                          <th className="gdvheader" scope="col">
                            BILL
                          </th>
                          <th className="gdvheader" scope="col">
                            BILL %
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL %
                          </th>
                          <th className="gdvheader" scope="col">
                            Total{" "}
                          </th>
                          <th className="gdvheader" scope="col">
                            Total %
                          </th>

                          <th className="gdvheader" scope="col">
                            BILL
                          </th>
                          <th className="gdvheader" scope="col">
                            BILL %
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL %
                          </th>
                          <th className="gdvheader" scope="col">
                            Total{" "}
                          </th>
                          <th className="gdvheader" scope="col">
                            Total %
                          </th>

                          <th className="gdvheader" scope="col">
                            Bill
                          </th>
                          <th className="gdvheader" scope="col">
                            Bill %
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL
                          </th>
                          <th className="gdvheader" scope="col">
                            NBL %
                          </th>
                          <th className="gdvheader" scope="col">
                            Total
                          </th>
                          <th className="gdvheader" scope="col">
                            Total %
                          </th>
                        </tr>
                        {renderTableData()}
                        {renderTotalTableData()}
                      </tbody>
                    </table>
                  ) : (
                    <div />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
