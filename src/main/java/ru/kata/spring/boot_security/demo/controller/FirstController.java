package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@Controller
public class FirstController {

    private final UserService userService;

    @Autowired
    public FirstController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String test() {
        return "Jquery";
    }


    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public String getUserPage() {
        return "user";
    }

    @GetMapping("/hello")
    public String starterPage() {
        return "Jquery";
    }

}
