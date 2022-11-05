import axios from "axios";
import { API_URL } from "../common/constants";
import {
  apiGetAssignmentReportNames,
  apiGetAssignmentReportStat,
} from "../utils/AppUtils";

const getHomeContent = () => {
  return apiGetAssignmentReportNames();
};

const getAssignmentReportStat = (reportID, paramId) => {
  return apiGetAssignmentReportStat(reportID, paramId);
};

const HomeService = {
  getHomeContent,
  getAssignmentReportStat,
};

export default HomeService;
