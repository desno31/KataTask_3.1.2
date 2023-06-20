package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(value = "/admin/users")
public class HelloController {

	@Autowired
	private UserService userService;

	@GetMapping
	public String index(Model model) {
		model.addAttribute("users", userService.index());
		return "index";
	}

	@GetMapping("/testUser")
	public String testUser(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		User user = userService.findByUsername(auth.getName());
		model.addAttribute("user", user);
		model.addAttribute("users", userService.index());
		return "userThymeleaf";
	}

	@GetMapping("/testAdmin")
	public String testAdmin(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		User blankUser = new User();
		User user = userService.findByUsername(auth.getName());
		model.addAttribute("user", user);

		model.addAttribute("blankUser", blankUser);
		model.addAttribute("users", userService.index());
		return "adminThymeleaf";
	}

	@GetMapping(value = "/new")
	public String newUser(@ModelAttribute("user") User user) {
		return "new";
	}

	@PostMapping
	public String create(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
//		if (bindingResult.hasErrors()) {
//			return "new";
//		}
		userService.save(user);
		return "redirect:/admin/users/testAdmin";
	}

	@GetMapping("/{id}/edit")
	public String edit(Model model, @PathVariable("id") int id) {
		model.addAttribute("user", userService.getById(id));
		return "edit";
	}

	@PatchMapping("/{id}")
	public String update(@ModelAttribute("user") @Valid User user,
						 BindingResult bindingResult, @PathVariable("id") int id) {
		if (bindingResult.hasErrors()) {
			return "edit";
		}
		userService.edit(user);
		return "redirect:/admin/users/testAdmin";
	}

	@DeleteMapping("/{id}")
	public String delete(@PathVariable("id") int id) {
		userService.deleteById(id);
		return "redirect:/admin/users/testAdmin";
	}
}