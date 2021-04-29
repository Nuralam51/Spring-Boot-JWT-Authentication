package com.example.security.controller;

import com.example.security.entity.Role;
import com.example.security.entity.User;
import com.example.security.jwt.JwtTokenProvider;
import com.example.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class UserRestController {

    @Autowired
    public UserService userService;
    @Autowired
    public JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registration(@RequestBody User theUser) {
        if(userService.findByUsername(theUser.getUsername()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        theUser.setRole(Role.USER);
        userService.save(theUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(Principal principal){
        if(principal == null) {
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
        User theUser = userService.findByUsername(authenticationToken.getName());
        theUser.setToken(tokenProvider.generateToken(authenticationToken));
        System.out.println(theUser);
        return new ResponseEntity<>(theUser, HttpStatus.OK);
    }
}
