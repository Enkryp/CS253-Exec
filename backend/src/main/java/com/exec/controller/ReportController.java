package com.exec.controller;
import com.exec.ReportAuth;
import com.exec.model.Key;
import com.exec.model.Report;
import com.exec.service.ReportService;

import com.exec.Utils;

// import java.security.Key;
import java.util.*;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/report")
@RestController
public class ReportController {
    
    private final ReportService Reportservice;
    private Utils utils = new Utils();

    public ReportController(ReportService Reportservice) {
        this.Reportservice = Reportservice;
    }


//Open APIs---- Not to be Authenticated
    @PostMapping("/post/")
    public ResponseEntity<Object> post(@RequestBody Map<String, String> body) {
         
        try{
            Report rep = new Report(body.get("message"), body.get("signed"));
            if(ReportAuth.check(Reportservice.getPublicKeys().toString(), body.get("signed"), body.get("message"))){
                Reportservice.addReport(rep);
                return ResponseEntity.status(HttpStatus.CREATED).build(); 
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/keys/public")
    public ResponseEntity<Object> getAllKeys() {

        try{
            List<Key> requests = Reportservice.getKeys();
            return new ResponseEntity<Object>(requests, HttpStatus.OK);
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @GetMapping("/view")
    public ResponseEntity<Object> viewReport( HttpSession session) {

        Map<String, String> response = new HashMap<String, String>();
        try{
            String roll_no = utils.isLoggedIn(session);

            if(roll_no == null || !session.getAttribute("access_level").equals("Admin")){
                response.put("message", "You are not authorized to perform this action");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            List< Map<String, String> > requests = Reportservice.getAllReports();
            return new ResponseEntity<Object>(requests, HttpStatus.OK);

            // return ResponseEntity.status(HttpStatus.CREATED).build(); 
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
