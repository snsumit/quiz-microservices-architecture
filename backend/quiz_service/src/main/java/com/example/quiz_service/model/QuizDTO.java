package com.example.quiz_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class QuizDTO {
  private String category;
  private String quizTitle;
  private Integer numOfQuestions;

}
