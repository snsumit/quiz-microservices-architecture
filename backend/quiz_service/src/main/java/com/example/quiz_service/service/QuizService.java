package com.example.quiz_service.service;

import com.example.quiz_service.model.QuestionWrapper;
import com.example.quiz_service.model.Quiz;
import com.example.quiz_service.model.QuizInterface;
import com.example.quiz_service.model.Response;
import com.example.quiz_service.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

  @Autowired
  QuizRepository quizRepository;

  @Autowired
    QuizInterface quizInterface;
    public Quiz createQuiz(String category, String quizTitle, Integer numOfQuestions) {
        List<Integer> questionIds  = quizInterface.getQuestionIds(category,numOfQuestions).getBody();
        Quiz quiz = new Quiz();
        quiz.setQuizTitle(quizTitle);
        quiz.setQuestionIds(questionIds);
        return quizRepository.save(quiz);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Quiz quiz = quizRepository.findById(id).get();
        List<Integer> questionsIds = quiz.getQuestionIds();
        List<QuestionWrapper> questionForUser = quizInterface.getQuestions(questionsIds).getBody();
        return new ResponseEntity<>(questionForUser, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getQuizScore(Integer id, List<Response> responses) {
        Quiz quiz = quizRepository.findById(id).get();
        return quizInterface.getScore(responses);
    }
}
