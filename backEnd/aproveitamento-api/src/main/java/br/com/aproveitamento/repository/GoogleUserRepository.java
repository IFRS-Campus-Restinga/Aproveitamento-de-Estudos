package br.com.aproveitamento.repository;

import br.com.aproveitamento.model.GoogleUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface GoogleUserRepository extends JpaRepository<GoogleUser, Integer> {
    Optional<GoogleUser> findByEmail(String email);

    Optional<GoogleUser> findBySub(String sub);

    Optional<GoogleUser> findGoogleUsersByEmailAfter(String parteDepoisEmail);

    Optional<GoogleUser> findGoogleUsersByEmailContains(String parteEmail);

}
