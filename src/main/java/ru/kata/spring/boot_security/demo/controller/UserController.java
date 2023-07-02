package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String test() {
        return "admin";
    }


    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public String getUserPage() {
        return "user";
    }

    @GetMapping("/hello")
    public String starterPage() {
        return "admin";
    }

}
