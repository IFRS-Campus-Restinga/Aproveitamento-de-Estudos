package br.com.aproveitamento.controller;


import br.com.aproveitamento.dto.MessageDTO;
import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.repository.GoogleUserRepository;
import br.com.aproveitamento.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.endpoint.SecurityContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserCache;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipal;


@RestController
@RequestMapping("/resource")
public class ResourceController {

    @RequestMapping("/user")
    @PreAuthorize("hasAnyAuthority('ALUNO', 'OIDC_USER')")
    public ResponseEntity<MessageDTO> user(Authentication authentication){

        return ResponseEntity.ok(new MessageDTO("Ola " + authentication.getCredentials().toString() + " | "
                                                    + authentication.getPrincipal().toString()     + " | "
                                                    + authentication.getDetails()       + " | "
                                                    + authentication.getName()          + " | "
                                                    + authentication.getAuthorities()   + " | " ));
    }

    @RequestMapping("/admin")
    @PreAuthorize("hasAuthority('COORDENADOR')")
    public ResponseEntity<MessageDTO> admin(Authentication authentication, OAuth2User googleUser){
        return ResponseEntity.ok(new MessageDTO("Ola Sr. | Sra." + authentication.getName() ));
    }
}
