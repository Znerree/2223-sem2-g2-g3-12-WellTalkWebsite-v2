package com.website.welltalk.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RoutesController {
    @GetMapping("/")
    public String index() {
        return "index.html";
    }

    @GetMapping("/login")
    public String login() {
        return "index.html";
    }

    @GetMapping("/register")
    public String register() {
        return "index.html";
    }

    @GetMapping("/home")
    public String home() {
        return "index.html";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "index.html";
    }

   @GetMapping("/students_list")
   public String students_list() {
       return "index.html";
   }

    @GetMapping("/calendar")
    public String calendar() {
        return "index.html";
    }

   @GetMapping("/my_notes")
   public String my_notes() {
       return "index.html";
   }

}
