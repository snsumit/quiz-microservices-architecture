package com.example.quiz_service.controller;

import com.example.quiz_service.model.QuestionWrapper;
import com.example.quiz_service.model.QuizDTO;
import com.example.quiz_service.model.Response;
import com.example.quiz_service.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public ResponseEntity<Integer> createQuiz(@RequestBody QuizDTO quizDTO){
        Integer quizId =  quizService.createQuiz(quizDTO.getCategory(),quizDTO.getQuizTitle(),quizDTO.getNumOfQuestions()).getId();
        return new ResponseEntity<>(quizId, HttpStatus.CREATED);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("getScore/{id}")
    public ResponseEntity<Integer> getQuizScore(@PathVariable Integer id,@RequestBody List<Response> response){
        return quizService.getQuizScore(id,response);
    }

}
