package br.com.aproveitamento.controller;


import br.com.aproveitamento.dto.MessageDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @RequestMapping("/user")
    public ResponseEntity<MessageDTO> user(Authentication authentication){
        return ResponseEntity.ok(new MessageDTO("Ola" + authentication.getName()));
    }

    @RequestMapping("/admin")
    @PreAuthorize("hasAuthority('COORDENADOR')")
    public ResponseEntity<MessageDTO> admin(Authentication authentication){
        return ResponseEntity.ok(new MessageDTO("Ola Sr. | Sra." + authentication.getName() ));
    }
}
