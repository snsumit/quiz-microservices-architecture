package com.example.question_service.repository;

import com.example.question_service.model.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Integer> {
   public List<Question> findByCategory(String category);

   @Query(value = "select q.id from question q where q.category=:category ORDER BY RAND()",nativeQuery = true)
   List<Integer> findRandomQuestionsByCategory(@Param("category") String category, Pageable pageable);
}
