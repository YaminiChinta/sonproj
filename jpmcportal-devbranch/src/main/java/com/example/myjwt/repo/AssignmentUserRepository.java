package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import com.example.myjwt.models.AssignmentReport;
import com.example.myjwt.models.AssignmentUser;

import com.example.myjwt.models.Grade;

import com.example.myjwt.models.User;

@Repository
public interface AssignmentUserRepository extends JpaRepository<AssignmentUser, Long> {
	@Query(value = "SELECT associateID, associateName, sID, sIDStatus, screeningStatus, latestStart, screeningStatus, "
			+ "vLAN, assignmentID, sOID, sOLine, projectID, projectDescription, projectBillability, projectType, projectstatus, project_Solution_Type, "
			+ "projectManagerID, projectManagerName, accountID, accountName, accountManagerID, "
			+ "accountManagerName, lOB, region, cP, cRM, eDP, ePL_ID, ePL_Name, verticalHorizontal, jobCode, designation, "
			+ "grade, gradeDescription, pAQGrade, pA_Category, fINID, departmentName, serviceLine, hCMSetID, "
			+ "hCMSupervisorID, projectOwningDepartment, projectOwningPractice, billabilityStatus, "
			+ "billabilityReason, secondaryStageTag, criticalFlag, locationID, onOff, country, state, "
			+ "city, assignmentStart, assignmentEnd, assignmentStatus, futureAssignment, percentAllocation, "
			+ "assignment_City, assignment_location, assgn_state, assgn_country, fTE, associatelevelFTE, "
			+ "correctedAssociatelevelFTE, projectRole, operationalRole, locationReasoncode, projectStart, "
			+ "projectEnd, subVertical, sBU1, sBU2, contractorEnd, eSAComments, bURMA_Id, bURMA_Name FROM assignmentuser", nativeQuery = true)
	List<Object[]> findAllAssignmentUsers();
	
	List<AssignmentUser> findAll();
	
	List<AssignmentUser> findByAssignmentReport(AssignmentReport assignmentReport);
	
	List<AssignmentUser> findByAssignmentReportAndServiceLineAndLOB(AssignmentReport assignmentReport, String selServiceLine, String selLOB);
	
	List<AssignmentUser> findByAssignmentReportAndServiceLine(AssignmentReport assignmentReport, String selServiceLine);

	List<AssignmentUser> findByAssignmentReportAndServiceLineAndOnOff(AssignmentReport assignmentReport, String selPractice, String onOff);

	@Query(value="select distinct service_line from assignmentuser",nativeQuery=true)
	List<String> getAllServiceLine();
	Optional<AssignmentUser> findByAssociateID(Long id);
		
	
	
}
