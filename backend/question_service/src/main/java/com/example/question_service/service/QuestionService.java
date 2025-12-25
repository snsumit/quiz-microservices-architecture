package com.example.question_service.service;

import com.example.question_service.model.Question;
import com.example.question_service.model.QuestionWrapper;
import com.example.question_service.model.Response;
import com.example.question_service.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository repository;
    public ResponseEntity<List<Question>> getAllQuestion() {
         try {
             return new ResponseEntity<>(repository.findAll(),HttpStatus.OK);
         } catch (Exception e){
             System.out.println("Error" + e.getMessage());
         }
         return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Question>> getAllQuestionsByCategory(String category) {
        try {
            return new ResponseEntity<>(repository.findByCategory(category),HttpStatus.OK);
        } catch (Exception e){
            System.out.println("Error :" + e.getMessage());
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    public void addQuestion(Question question) {
        repository.save(question);

    }

    public void removeQuestion(Integer id) {
        repository.deleteById(id);
    }

    public void updateQuestion(Question question) {
        repository.save(question);
    }


    public ResponseEntity<List<Integer>> getQuizQuestion(String category, Integer numOfQuestions) {
        Pageable pageable = PageRequest.of(0,numOfQuestions);
        List<Integer> questionIds =  repository.findRandomQuestionsByCategory(category,pageable);
        return new ResponseEntity<>(questionIds,HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuestions(List<Integer> questionIds) {
        List<QuestionWrapper> questionWrappers = new ArrayList<>();
        for (Integer i : questionIds){
            Question question = repository.findById(i).get();
            QuestionWrapper questionWrapper = new QuestionWrapper();
            questionWrapper.setId(question.getId());
            questionWrapper.setQuestion(question.getQuestion());
            questionWrapper.setOption1(question.getOption1());
            questionWrapper.setOption2(question.getOption2());
            questionWrapper.setOption3(question.getOption3());
            questionWrapper.setOption4(question.getOption4());
            questionWrappers.add(questionWrapper);
        }
        return new ResponseEntity<>(questionWrappers,HttpStatus.OK);
    }


    public ResponseEntity<Integer> getScore(List<Response> responses) {
        int rightCount = 0;
        for (Response response:responses){
            Question question = repository.findById(response.getId()).get();
            if(response.getResponse().equals(question.getRightAnswer())) rightCount++;
        }
        return  new ResponseEntity<>(rightCount,HttpStatus.OK);
    }
}
