package br.com.aproveitamento.controller;


import br.com.aproveitamento.dto.CreateUsuarioDTO;
import br.com.aproveitamento.dto.MessageDTO;
import br.com.aproveitamento.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;

    @PostMapping("/create")
    public ResponseEntity<MessageDTO> createUser(@RequestBody CreateUsuarioDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.createUser(dto));
    }
}
