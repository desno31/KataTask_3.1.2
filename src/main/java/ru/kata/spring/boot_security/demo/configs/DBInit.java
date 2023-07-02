package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class DBInit {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    private void postConstruct() {

        Role roleUser = new Role("ROLE_USER");
        Role roleAdmin = new Role("ROLE_ADMIN");
        roleRepository.save(roleUser);
        roleRepository.save(roleAdmin);

        User admin = new User("admin", "admin", 10, "admin", "admin@mail.ru"
                , List.of(roleUser, roleAdmin));
        User user = new User("user", "user", 10, "user", "user@mail.ru"
                , List.of(roleUser));
        userService.save(admin);
        userService.save(user);
    }
}
