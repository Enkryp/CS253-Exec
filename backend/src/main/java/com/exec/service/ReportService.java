package com.exec.service;

import com.exec.repository.KeyRepository;
import com.exec.repository.ReportRepository;

import org.springframework.stereotype.Service;

import java.util.*;
import com.exec.model.Key;
import com.exec.model.Report;


@Service
public class ReportService {
    
    private final ReportRepository reportRepository;
    private final KeyRepository keyRepository;


    public ReportService(ReportRepository reportRepository,KeyRepository keyRepository) {
        this.reportRepository = reportRepository;
        this.keyRepository = keyRepository;
    }

    public void addReport(Report Report) {
        reportRepository.insert(Report);
    }
    public void addKey(Key kk) {
        keyRepository.insert(kk);
    }
    public List<Key> getKeys() {
        // List<String> myList = new ArrayList<String>();
        // for(Key key: keyRepository.findAll()){
        //     myList.add(key.getPublicKey());
        // }
        return keyRepository.findAll();
        // return myList;

    }

    public List<String> getPublicKeys() {
        List<String> myList = new ArrayList<String>();
        for(Key key: keyRepository.findAll()){
            myList.add(key.getPublicKey());
        }
        // return keyRepository.findAll();
        return myList;

    }
    

    public List<Map<String, String>> getAllReports() {
        List< Map<String, String> > report_messages = new ArrayList< Map<String, String> >();
        for(Report report: reportRepository.findAll()){
            Map<String, String> report_message = new HashMap<String, String>();
            report_message.put("message", report.message);
            report_messages.add(report_message);
        }
        return report_messages;
    }

}


