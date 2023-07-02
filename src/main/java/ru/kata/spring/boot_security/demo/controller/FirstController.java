package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

@Controller
@RequestMapping("/test")
public class FirstController {

    private final UserService userService;

    @Autowired
    public FirstController(UserService userService) {
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
