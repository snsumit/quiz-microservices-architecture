package com.example.quiz_service.model;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@FeignClient("QUESTION-SERVICE")
public interface QuizInterface {
    @PostMapping("question/generate")
    public ResponseEntity<List<Integer>> getQuestionIds(@RequestParam String category, @RequestParam Integer numOfQuestions);

    @PostMapping("question/getQuestion")
    public ResponseEntity<List<QuestionWrapper>> getQuestions(@RequestBody List<Integer> questionsIds);

    @PostMapping("question/getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses);
}
