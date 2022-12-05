package com.exec;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

//TODO: Test if working :p
public class ReportAuth {
 
    
    public static Boolean check(String a, String b, String c){
        ProcessBuilder processBuilder = new ProcessBuilder();


 
        try {
 
            FileWriter fWritera = new FileWriter(
                "./a.txt");
				FileWriter fWriterb = new FileWriter(
					"./b.txt");
					FileWriter fWriterc = new FileWriter(
                "./c.txt");
 
            
            fWritera.write(a);
            fWritera.close();
			fWriterb.write(b);
            fWriterb.close();
			fWriterc.write(c);
            fWriterc.close();
 
 
         }
 
        catch (IOException e) {
 
            System.out.print(e.getMessage());
        }
    


	processBuilder.command("node");
	processBuilder.redirectInput(new File("src/main/java/com/exec/check.js"));


	try {

		Process process = processBuilder.start();
		process.waitFor();

		StringBuilder output = new StringBuilder();

		BufferedReader reader = new BufferedReader(
				new InputStreamReader(process.getInputStream()));

		// StringBuilder err = new StringBuilder();

		// BufferedReader error = new BufferedReader(
		// 		new InputStreamReader(process.getErrorStream()));

		String line;
		while ((line = reader.readLine()) != null) {
			output.append(line + "\n");
		}
        var ab =output.toString();
		// System.out.println(ab);

		// if(error.ready()){
		// 	while ((line = error.readLine()) != null) {
		// 		err.append(line + "\n");
		// 	}
		// }

		// var _a =err.toString();
		// System.out.println(_a);

		int exitVal = process.waitFor();
		if (exitVal == 0 && ab.equals("true\n")) {
            return true;
			// System.exit(0);
		} else {
            return false;
			//abnormal...
		}

	} catch (IOException e) {
        
		e.printStackTrace();
        return false;
	} catch (InterruptedException e) {
		e.printStackTrace();
        return false;
	}

    }}
