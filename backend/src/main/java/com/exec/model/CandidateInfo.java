package com.exec.model;
import java.util.*;

public class CandidateInfo {
    
    public String name;
    public String roll_no;
    public String post;
    public List<String> Campaigners;
    public List<String> Seconders;
    public List<String> Proposers;
    public String manifesto_link;
    public List<String> video_links;
    public String poster_link;
    public List<String> form_link;
    
    public CandidateInfo(String name, String roll_no, List<String> Campaigners, List<String> Proposers, List<String> Seconders, String manifesto_link, List<String> video_links, String poster_link, String post, List<String> form_link) {
        this.name = name;
        this.roll_no = roll_no;
        this.Campaigners = Campaigners;
        this.Seconders = Seconders;
        this.Proposers = Proposers;
        this.manifesto_link = manifesto_link;
        this.video_links = video_links;
        this.poster_link = poster_link;
        this.post = post;
        this.form_link = form_link;
    }
    
}
