package com.exec.model;

import org.springframework.data.annotation.Id;
// import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Key")
public class Key {
    @Id
    public String roll;
    public String publicKey;
    // public String salt;
    public String encryptedPriv;
    public Key (String roll, String publicKey, String encryptedPriv){
        this.roll= roll;
        this.publicKey = publicKey;
        this.encryptedPriv = encryptedPriv;
    }
    public String getPublicKey() {
        return publicKey;
    }

    // public
    
}
