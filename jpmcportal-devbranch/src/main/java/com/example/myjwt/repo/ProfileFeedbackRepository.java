package com.example.myjwt.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


import com.example.myjwt.models.AssignmentUser;

import com.example.myjwt.models.Feedback;
import com.example.myjwt.models.Grade;
import com.example.myjwt.models.Profile;
import com.example.myjwt.models.Skill;
import com.example.myjwt.models.User;

@Repository
public interface ProfileFeedbackRepository extends JpaRepository<Feedback, Long> {
	Optional<Feedback> findById(Long id);
	List<Feedback> findAll();
}
