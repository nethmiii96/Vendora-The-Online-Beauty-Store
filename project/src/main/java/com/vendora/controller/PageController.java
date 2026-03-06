package com.vendora.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String home(){
        return "index";
    }

    @GetMapping("/shop")
    public String shop(){
        return "shop";
    }

    @GetMapping("/about")
    public String about(){
        return "about";
    }

    @GetMapping("/learn")
    public String learn(){
        return "learn";
    }

}