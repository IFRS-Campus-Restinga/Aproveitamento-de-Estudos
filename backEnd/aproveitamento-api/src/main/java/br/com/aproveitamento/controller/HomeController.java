package br.com.aproveitamento.controller;

//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
import br.com.aproveitamento.model.Curso;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

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

    @RequestMapping("api")
    public Map<String,Object> home() {
        Map<String,Object> model = new HashMap<String,Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }

    @PostMapping
    @RequestMapping("login/oauth2/code/google")
    public ResponseEntity<OAuth2AccessTokenResponse> create(@RequestBody @NotNull @Valid OAuth2AccessTokenResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }



}