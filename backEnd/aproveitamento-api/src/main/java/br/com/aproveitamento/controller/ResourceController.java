package br.com.aproveitamento.controller;


import br.com.aproveitamento.dto.MessageDTO;
import br.com.aproveitamento.model.GoogleUser;
import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.repository.GoogleUserRepository;
import br.com.aproveitamento.service.GoogleUserService;
import br.com.aproveitamento.service.UserDetailsServiceImpl;
import br.com.aproveitamento.service.UsuarioService;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserCache;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipal;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/resource")
public class ResourceController {
    // colocar um controler de googleUser e puxar pelo Sub do perfil




    @RequestMapping("/user")
    @PreAuthorize("hasAnyAuthority('ALUNO', 'OIDC_USER', 'SCOPE_openid')")
    public ResponseEntity<MessageDTO> user(Authentication authentication){


        log.info("JWT AQUI -> " + authentication.getName());
      //  log.info("EMAIL AQUI -> " + googleUser.get().getEmail());

//        log.info("AQUI ->> " + authentication.getPrincipal().getClass());
//        log.info("AQUI ->>> " + SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString() + " | " + SecurityContextHolder.getContext().getAuthentication().getName());
//        return ResponseEntity.ok(new MessageDTO("Ola " //+ authentication.getCredentials().toString() + " | "
//                                                    //+ authentication.getPrincipal().toString()     + " | "
//                                                    //+ authentication.getCredentials() + " | "
//                                                    //+ authentication.getPrincipal()     + " | "
//                                                    + authentication.getDetails()       + " | "
//                                                    + authentication.getName()          + " | "
//                                                    + authentication.getAuthorities()   + " | " ));

        return ResponseEntity.ok(new MessageDTO("Ola " + authentication.getName()));

    }
    @RequestMapping("/admin")
    @PreAuthorize("hasAuthority('COORDENADOR')")
    public ResponseEntity<MessageDTO> admin(Authentication authentication, OAuth2User googleUser){
        return ResponseEntity.ok(new MessageDTO("Ola Sr. | Sra." + authentication.getName() ));
    }
}