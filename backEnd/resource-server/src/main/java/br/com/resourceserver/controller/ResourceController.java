package br.com.resourceserver.controller;


import br.com.resourceserver.dto.MessageDTO;

import lombok.extern.slf4j.Slf4j;

import org.ietf.jgss.Oid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@Slf4j
@RestController
@RequestMapping("/resource")
public class ResourceController {
    // colocar um controler de googleUser e puxar pelo Sub do perfil
    @RequestMapping("/user")
    @PreAuthorize("hasAnyAuthority('ALUNO', 'OIDC_USER', 'SCOPE_openid')")
    public ResponseEntity<MessageDTO> user(Authentication authentication){


        log.info("JWT AQUI -> " + authentication.getClass());
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
