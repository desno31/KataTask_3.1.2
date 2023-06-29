package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService{

    User findByUsername(String username);
    List<User> index();
    void save(User user);
    void deleteById(long id);
    User getById(long id);
    void edit(User user);
}
