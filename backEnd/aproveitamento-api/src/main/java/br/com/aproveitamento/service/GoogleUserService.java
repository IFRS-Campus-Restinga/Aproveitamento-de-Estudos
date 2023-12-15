package br.com.aproveitamento.service;


import br.com.aproveitamento.model.GoogleUser;
import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.repository.GoogleUserRepository;
import br.com.aproveitamento.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@Validated
@RequiredArgsConstructor
@Slf4j
public class GoogleUserService {
    private final GoogleUserRepository googleUserRepository;


    public GoogleUser findById(@NotNull @Positive int id){
        Optional<GoogleUser> googleUser = googleUserRepository.findById(id);
        if(!googleUser.isPresent()) return null;
        return googleUser.get();
    }

    public GoogleUser create(@Valid @NotNull GoogleUser googleUser){
        return googleUserRepository.save(googleUser);
    }

    public GoogleUser update(@Valid GoogleUser googleUser){
        return googleUserRepository.save(googleUser);
    }

    public void delete(@NotNull @Positive int id){
        googleUserRepository.deleteById(id);
    }

    public GoogleUser findByEmail(@NotNull String email) {
        Optional<GoogleUser> googleUser = googleUserRepository.findByEmail(email);
        if (!googleUser.isPresent())
            return null;
        return googleUser.get();
    }

    public GoogleUser findBySub(@NotNull String sub) {
        Optional<GoogleUser> googleUser = googleUserRepository.findBySub(sub);
        if (!googleUser.isPresent())
            return null;
        return googleUser.get();
    }

}
