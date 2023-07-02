package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;

@Controller
public class AdminController {

	@Autowired
	private UserService userService;

	@GetMapping
	public String index(Model model) {
		model.addAttribute("users", userService.index());
		return "index";
	}

	@GetMapping("/admin")
	public String testAdmin(Model model) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		User blankUser = new User();
		User user = userService.findByUsername(auth.getName());


/*		model.addAttribute("roleUser", roleUser);
		model.addAttribute("roleAdmin", roleAdmin);
		Role[] roles = (Role[])user.getRoles().toArray();
		Role roleUser = roles[0];
		Role roleAdmin = roles[1];*/
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
		return "redirect:/admin";
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
		return "redirect:/admin";
	}

	@DeleteMapping("/{id}")
	public String delete(@PathVariable("id") int id) {
		userService.deleteById(id);
		return "redirect:/admin";
	}
}