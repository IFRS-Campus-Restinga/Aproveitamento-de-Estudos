package br.com.resourceserver.controller;


import br.com.resourceserver.dto.MessageDTO;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@Slf4j
@RestController
@RequestMapping("/resource")
public class ResourceController {

    @RequestMapping("/user")
    @PreAuthorize("hasAnyAuthority('ALUNO', 'OIDC_USER')")
    public ResponseEntity<MessageDTO> user(Authentication authentication){


//        log.info("AQUI ->> " + authentication.getPrincipal().getClass());
//        log.info("AQUI ->>> " + SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString() + " | " + SecurityContextHolder.getContext().getAuthentication().getName());
//        return ResponseEntity.ok(new MessageDTO("Ola " //+ authentication.getCredentials().toString() + " | "
//                                                    //+ authentication.getPrincipal().toString()     + " | "
//                                                    //+ authentication.getCredentials() + " | "
//                                                    //+ authentication.getPrincipal()     + " | "
//                                                    + authentication.getDetails()       + " | "
//                                                    + authentication.getName()          + " | "
//                                                    + authentication.getAuthorities()   + " | " ));

        return ResponseEntity.ok(new MessageDTO("Ola " + authentication.getName() ));

    }

    @RequestMapping("/admin")
    @PreAuthorize("hasAuthority('COORDENADOR')")
    public ResponseEntity<MessageDTO> admin(Authentication authentication, OAuth2User googleUser){
        return ResponseEntity.ok(new MessageDTO("Ola Sr. | Sra." + authentication.getName() ));
    }
}
