package com.exec.controller;

// import java.util.Map;
import com.exec.service.CandidateService;
import com.exec.service.PenaltyService;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.exec.service.AdminService;
// import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.Integral;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import javax.servlet.http.HttpServletResponse;

import com.exec.model.*;
@RestController
public class PublicController {
    
    private final CandidateService candidateservice;
    private final AdminService adminservice;
    private final PenaltyService penaltyService;
    // private final GBMService gbmservice;

    public PublicController(CandidateService candidateservice, AdminService adminservice, PenaltyService penaltyService) {
        this.candidateservice = candidateservice;
        this.penaltyService = penaltyService;
        // this.gbmservice = gbmservice;
        this.adminservice = adminservice;
    }

    @GetMapping("/viewCandidates")
    public ResponseEntity<Object> viewCandidates(){
        return new ResponseEntity<Object>(candidateservice.getAllCandidatesBasicInfo(), HttpStatus.OK);
    }

    @GetMapping("/viewCandidate")
    public ResponseEntity<Object> viewCandidate(@RequestParam(value = "roll_no") String roll){

        Map<String, String> response = new HashMap<String, String>(); 

        try{
            try{
                Candidate candidate = candidateservice.getCandidateByRoll(roll);
            }
            catch(Exception e){
                response.put("message", "No candidate found with roll number: " + roll);
                return new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
            }
            
            CandidateInfo candidateInfo = candidateservice.getCandidateInfo(roll);
            return  new ResponseEntity<Object>(candidateInfo, HttpStatus.OK);
        }
        catch(Exception E)
        {
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/viewAnnouncements")
    public ResponseEntity<Object> viewAnnouncements(){
        Map<String, String> response = new HashMap<String, String>();
        try{
        List<String> announcements = adminservice.view_announcements();
        for (Integer i = 0; i < announcements.size(); ++i){
                response.put("announcement" + i.toString(), announcements.get(i));
            }
            return new ResponseEntity<Object>(response, HttpStatus.OK);
        }
        catch (Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/getPenaltyCsv")
    public void viewPenalties(HttpServletResponse response){

        try{
            String filename = "Penalties.csv";

            response.setContentType("text/csv");
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, 
                       "attachment; filename=\"" + filename + "\"");

            StatefulBeanToCsv<Penalty> writer = new StatefulBeanToCsvBuilder<Penalty>(response.getWriter())
                                                    .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                                                    .withSeparator(CSVWriter.DEFAULT_SEPARATOR)
                                                    .withOrderedResults(false).build();

            writer.write(penaltyService.getAllPenalties());
        }
        catch (Exception E){
            
        }
    }

}
