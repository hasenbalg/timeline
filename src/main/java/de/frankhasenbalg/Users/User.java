//package de.frankhasenbalg.Users;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//
///**
// * Created by frank on 2016-12-07.
// */
//@Entity
//public class User {
//    @Id
//    @GeneratedValue
//    private long id;
//    @Column(nullable = false)
//    private String name;
//    @Column(nullable = false)
//    private String password;
//
//    public User(String name, String password) {
//        this.name = name;
//        this.password = password;
//    }
//
//    public long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//}
