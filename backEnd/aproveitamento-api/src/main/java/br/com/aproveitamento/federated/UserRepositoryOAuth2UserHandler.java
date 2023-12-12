package br.com.aproveitamento.federated;


import br.com.aproveitamento.model.GoogleUser;
import br.com.aproveitamento.repository.GoogleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;


@RequiredArgsConstructor
@Slf4j
public final class UserRepositoryOAuth2UserHandler implements Consumer<OAuth2User> {

    //private final UserRepository userRepository = new UserRepository();
    private final GoogleUserRepository googleUserRepository;



    @Override
    public void accept(OAuth2User oAuth2User) {
        // Capture user in a local data store on first authentication
        // captura o usuario de um fonte de dados locais na primeira autenticação
        if (!this.googleUserRepository.findByEmail(oAuth2User.getName()).isPresent()) {
            GoogleUser googleUser = GoogleUser.fromOauth2User(oAuth2User);

            log.info(googleUser.toString());

            // tratamento para definição de roles e conexão de usuario do google com o usuario do back

            this.googleUserRepository.save(googleUser);
        } else {
            log.info("Bem vindo {}", oAuth2User.getAttributes().get("given_name"));
        }
    }


//    @Override
//    public void accept(OAuth2User user) {
//        // Capture user in a local data store on first authentication
//        if (this.userRepository.findByName(user.getName()) == null) {
//            System.out.println("Saving first-time user: name=" + user.getName() + ", claims=" + user.getAttributes() + ", authorities=" + user.getAuthorities());
//            this.userRepository.save(user);
//        }
//    }

//    static class UserRepository {
//
//        private final Map<String, OAuth2User> userCache = new ConcurrentHashMap<>();
//
//        public OAuth2User findByName(String name) {
//            return this.userCache.get(name);
//        }
//
//        public void save(OAuth2User oauth2User) {
//            this.userCache.put(oauth2User.getName(), oauth2User);
//        }
//
//    }

}
