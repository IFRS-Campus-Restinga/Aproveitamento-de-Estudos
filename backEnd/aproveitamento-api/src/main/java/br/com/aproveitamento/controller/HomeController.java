package br.com.aproveitamento.controller;

//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

//    @RequestMapping("/")
//    public String home(@AuthenticationPrincipal Saml2AuthenticatedPrincipal principal, Model model) {
//        model.addAttribute("name", principal.getName());
//        model.addAttribute("emailAddress", principal.getFirstAttribute("email"));
//        model.addAttribute("userAttributes", principal.getAttributes());
//
//        //System.out.println("name: " + principal.getName() + "\nemailAddress: " + principal.getAttributes());
//
//        return "home";
//    }

    @RequestMapping("/")
    public String home() {

        return "Diga Olá, home";
    }

    @RequestMapping("/secured")
    public String secured() {

        return "Diga Olá, Página segura";
    }



}