package com.example.question_service.controller;

import com.example.question_service.model.Question;
import com.example.question_service.model.QuestionWrapper;
import com.example.question_service.model.Response;
import com.example.question_service.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return questionService.getAllQuestion();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getAllQuestionsByCategory(@PathVariable String category){
        return questionService.getAllQuestionsByCategory(category);
    }

    @PostMapping("addQuestion")
    public ResponseEntity<String> addQuestion(@RequestBody Question question){
        questionService.addQuestion(question);
        return new ResponseEntity<>("success",HttpStatus.CREATED);
    }

    @DeleteMapping("removeQuestion/{id}")
    public ResponseEntity<String> removeQuestion(@PathVariable Integer id){
        questionService.removeQuestion(id);
        return new ResponseEntity<>("success",HttpStatus.OK);
    }
    @PutMapping("updateQuestion")
    public ResponseEntity<String> updateQuestion(@RequestBody Question question){
       questionService.updateQuestion(question);
       return new ResponseEntity<>("success",HttpStatus.OK);
    }

    @PostMapping("generate")
    public ResponseEntity<List<Integer>> getQuestionIds(@RequestParam String category,@RequestParam Integer numOfQuestions){
        return questionService.getQuizQuestion(category,numOfQuestions);
    }

    @PostMapping("getQuestion")
    public ResponseEntity<List<QuestionWrapper>> getQuestions(@RequestBody List<Integer> questionsIds){
        return questionService.getQuestions(questionsIds);
    }

    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses){
        return questionService.getScore(responses);
    }

}
