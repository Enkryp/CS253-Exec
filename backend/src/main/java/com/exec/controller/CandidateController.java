package com.exec.controller;

import com.exec.EmailServiceImpl;
import com.exec.Utils;
import com.exec.model.Candidate;
import com.exec.model.CandidateInfo;
import com.exec.model.GBM;
import com.exec.service.CandidateService;
import com.exec.service.GBMService;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequestMapping("/api/candidate")
@RestController
public class CandidateController {

    private final CandidateService candidateservice;
    private final GBMService gbmservice;
    private Utils utils = new Utils();
    private EmailServiceImpl emailSender= new EmailServiceImpl();

    public CandidateController(CandidateService candidateservice, GBMService gbmservice) {
        this.candidateservice = candidateservice;
        this.gbmservice = gbmservice;
    }
    // First you signup with your roll, name and email. 
    // If an object does not already exist in the candidate database yet, it will be created
    // after the necessary checks. Otherwise rejected.

    // Then you have to activate the candidate account. Such an account must have at least one proposer and two seconders
    //TODO: add the httpsession access level to admin when the class is made

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@RequestBody Map<String, String> body, HttpSession session) {
        try
        {
            Candidate candidate;
            Map<String, String> response = new HashMap<String, String>();

            String roll_no = utils.isLoggedIn(session);
            if(roll_no != null){
                response.put("message", "You are already logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            try{
                candidate = candidateservice.getCandidateByRoll(body.get("roll_no"));
            }
            catch(Exception E){
                response.put("message", "No candidate with this roll no.");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            if(candidate.is_activated == true)
            {
                response.put("message", "Candidate already signed up");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            String otp = utils.otpGenerator();
            candidateservice.setOtp(body.get("roll_no"), otp);
            emailSender.sendOTPMessage(candidate.email, candidate.name, otp);
            session.setAttribute("unverified_roll_no", body.get("roll_no"));
            session.setAttribute("unverified_access_level", "Candidate");
            return ResponseEntity.status(HttpStatus.OK).build();
  
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@RequestBody Map<String, String> body, HttpSession session) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        try{
            String roll_no = utils.isLoggedInUnverified(session);
            Map<String,String> response = new HashMap<>();

            if(roll_no == null || !session.getAttribute("unverified_access_level").equals("Candidate"))
            {
                response.put("message", "Invalid password change request");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }
            
            Candidate candidate = candidateservice.getCandidateByRoll(roll_no);

            if(! (candidate.otp).equals(body.get("otp"))){
                response.put("message", "Invalid OTP");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            String password = passwordEncoder.encode(body.get("password"));
            candidateservice.activateCandidate(roll_no, password);
            gbmservice.removeOtp(roll_no);
            session.removeAttribute("unverified_roll_no");
            session.removeAttribute("unverified_access_level");
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> body, HttpSession session) {

        Map<String,String> response = new HashMap<>();

        try{

            String roll_no = utils.isLoggedIn(session);
            if(roll_no != null)
            {
                response.put("message", "Already logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }
            Candidate candidate;
            try{
                candidate = candidateservice.getCandidateByRoll(body.get("roll_no"));
            }
            catch(Exception E){
                response.put("message", "No candidate with this roll no.");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(! passwordEncoder.matches(body.get("password"), candidate.password)){
                response.put("message", "Invalid credentials");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            session.setAttribute("roll_no", candidate.roll_no);
            session.setAttribute("access_level", "Candidate");
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpSession session) {

        Map<String,String> response = new HashMap<>();

        try{
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate"))
            {
                response.put("message", "Candidate not logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            session.removeAttribute("roll_no");
            session.removeAttribute("access_level");
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/requestCampaigner")
    public ResponseEntity<Object> request_Campaigner(@RequestBody Map<String,String> body, HttpSession session){
        try {
            Map<String, String> response = new HashMap<String, String>();
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")){
                response.put("message", "No candidate logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            GBM requested_gbm;
            try{
                requested_gbm = gbmservice.getGBMByRoll(body.get("gbm_roll_no"));
            }
            catch(Exception E){
                response.put("message", "No GBM with this roll no.");
                return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
            }

            if(requested_gbm.is_campaigner){
                response.put("message", "GBM already in a Candidate's team");
                return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
            }

            if(requested_gbm.campaign_requests.contains(roll_no)){
                response.put("message", "GBM already requested");
                return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
            }
            
            gbmservice.addCampainRequests(requested_gbm.roll_no, roll_no);
            emailSender.sendCampaignRequestMessage(requested_gbm.email, requested_gbm.name, candidateservice.getCandidateByRoll(roll_no).name);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @PostMapping("/addform")
    public ResponseEntity<Object> add_form_link(@RequestBody Map<String, String> body, HttpSession session){
        Map<String,String> response = new HashMap<>();
        try{
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")){
                response.put("message", "Candidate not logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }
            candidateservice.add_form(roll_no, body.get("form_link"));
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/removeform")
    public ResponseEntity<Object> remove_form_link(@RequestBody Map<String, String> body, HttpSession session){
        Map<String,String> response = new HashMap<>();
        try{
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")){
                response.put("message", "Candidate not logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }
            try{
                candidateservice.remove_form(roll_no, body.get("form_link"));
            }
            catch(Exception E){
                response.put("message", "No such form found");
                return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
            }
    
           return ResponseEntity.status(HttpStatus.OK).build();
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/viewmyforms")
    public ResponseEntity<Object> view_my_forms(HttpSession session){
        Map<String,String> response = new HashMap<>();
        try{
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")){
                response.put("message", "Candidate not logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }
            List <String> forms = candidateservice.view_forms(roll_no); 
            List<Map<String,String>> form_links = new ArrayList<>();
            for (Integer i = 0; i < forms.size(); ++i){
                Map<String, String> _response = new HashMap<String, String>();
                _response.put("name", "Form " + i.toString());
                _response.put("link", forms.get(i));
                form_links.add(_response);
            }
            return new ResponseEntity<Object>(form_links, HttpStatus.OK);
        }
        catch(Exception E){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/addVideos")
    public ResponseEntity<Object> add_video(@RequestBody Map<String, String> body, HttpSession session){
        try {
            Map<String, String> response = new HashMap<String, String>();
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")){
                response.put("message", "No candidate logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            candidateservice.add_video(roll_no, body.get("video_link"));

            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/viewmyvideos")
    public ResponseEntity<Object> view_my_videos(HttpSession session) {
        try {
            Map<String, String> response = new HashMap<String, String>();
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")) {
                response.put("message", "No candidate logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            List<String> videos = candidateservice.view_videos(roll_no);
            List<Map<String,String>> video_links = new ArrayList<>();
            for(Integer i = 1; i <= videos.size(); i++) {
                Map<String, String> _response = new HashMap<String, String>();
                _response.put("name", "Video " + i.toString());
                _response.put("link", videos.get(i-1));
                video_links.add(_response);
            }

            return new ResponseEntity<Object>(video_links, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/addPoster")
    public ResponseEntity<Object> add_poster(@RequestBody Map<String,String> body, HttpSession session){
        try {
            Map<String, String> response = new HashMap<String, String>();
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")){
                response.put("message", "No candidate logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            Candidate candidate = candidateservice.getCandidateByRoll(roll_no);
            if(candidate.poster_link != null){
                response.put("message", "Poster already uploaded");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            Pattern pattern = Pattern.compile("^(https://drive.google.com/)file/d/([^/]+)/.*$");
            Matcher matcher = pattern.matcher(body.get("poster_link"));

            if(!matcher.find()){
                response.put("message", "Not a valid google drive link");
                return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
            }
            String poster_link = body.get("poster_link");
            poster_link = poster_link.replace("/file/d/", "/uc?export=view&id=")
                                    .replace("/edit?usp=sharing", "")
                                    .replace("/view?usp=sharing", "")
                                    .replace("/view", "")
                                    .replace("/edit", "");

            candidateservice.add_poster(roll_no, poster_link);

            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/viewmyposter")
    public ResponseEntity<Object> view_my_poster(HttpSession session) {
        try {
            Map<String, String> response = new HashMap<String, String>();
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")) {
                response.put("message", "No candidate logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            String poster = candidateservice.view_poster(roll_no);
            response.put("name", "Poster");
            response.put("link", poster);

            return new ResponseEntity<Object>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Object> profile(HttpSession session){

        try {
            Map<String, String> response = new HashMap<String, String>();
            String roll_no = utils.isLoggedIn(session);
            if(roll_no == null || !session.getAttribute("access_level").equals("Candidate")) {
                response.put("message", "No candidate logged in");
                return new ResponseEntity<Object>(response, HttpStatus.UNAUTHORIZED);
            }

            CandidateInfo candidateInfo = candidateservice.getCandidateInfo(roll_no);
            return  new ResponseEntity<Object>(candidateInfo, HttpStatus.OK);
        }
        catch(Exception E)
        {
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
            
}