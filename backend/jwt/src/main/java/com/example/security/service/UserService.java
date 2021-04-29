package com.example.security.service;

import com.example.security.entity.User;

public interface UserService {
    public User save(User theUser);
    public User findByUsername(String username);
}
