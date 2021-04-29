package com.example.security.service;

import com.example.security.entity.User;
import com.example.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    public UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User save(User theUser) {
        theUser.setPassword(passwordEncoder.encode(theUser.getPassword()));
        return userRepository.save(theUser);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
