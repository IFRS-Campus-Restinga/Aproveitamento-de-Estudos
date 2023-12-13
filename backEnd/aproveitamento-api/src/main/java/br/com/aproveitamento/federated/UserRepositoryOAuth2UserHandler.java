package br.com.aproveitamento.federated;


import br.com.aproveitamento.enums.UsuarioTipo;
import br.com.aproveitamento.model.GoogleUser;
import br.com.aproveitamento.model.Role;
import br.com.aproveitamento.model.Usuario;
import br.com.aproveitamento.repository.GoogleUserRepository;
import br.com.aproveitamento.repository.RoleRepository;
import br.com.aproveitamento.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Consumer;


@RequiredArgsConstructor
@Slf4j
public final class UserRepositoryOAuth2UserHandler implements Consumer<OAuth2User> {

    private final GoogleUserRepository googleUserRepository;
    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;



    @Override
    public void accept(OAuth2User oAuth2User) {
        // Capture user in a local data store on first authentication
        // captura o usuario de um fonte de dados locais na primeira autenticação
        if (!this.googleUserRepository.findByEmail(oAuth2User.getName()).isPresent()) {
            GoogleUser googleUser = GoogleUser.fromOauth2User(oAuth2User);
            Usuario novoUsuario = new Usuario();

            novoUsuario.setNome(googleUser.getGivenName() + " "+ googleUser.getFamilyName());
            novoUsuario.setEmail(googleUser.getEmail());

            log.info(googleUser.toString());

            // tratamento para definição de roles e conexão de usuario do google com o usuario do back
            // verifica se há um email cadastrado, se não houver, cadastra
            if(this.usuarioRepository.findByEmail(googleUser.getEmail()) == null){
                UsuarioTipo tipo = null;
                Set<Role> role = new HashSet<>();
                boolean admin = false;

                // coloca uma role conforme a estrutura do email
                // precisa de aprimoramento
                if(googleUser.getEmail().contains("aluno")){
                    role.add(roleRepository.findByRole(UsuarioTipo.ALUNO).get());
                    tipo = UsuarioTipo.ALUNO;
                } else if(googleUser.getEmail().contains("coord.")){
                    role.add(roleRepository.findByRole(UsuarioTipo.COORDENADOR).get());
                    tipo = UsuarioTipo.COORDENADOR;
                    admin = true;

                } else if (googleUser.getEmail().contains("@restinga.ifrs.edu.br")){
                    role.add(roleRepository.findByRole(UsuarioTipo.SERVIDOR).get());
                    role.add(roleRepository.findByRole(UsuarioTipo.PROFESSOR).get());
                    tipo = UsuarioTipo.SERVIDOR;
                    admin = true;

                }

                // seta os atributos no novo usuario

                novoUsuario.setUsername(null);
                novoUsuario.setPassword(null);
                novoUsuario.setId(null);
                novoUsuario.setAdmin(admin);
                novoUsuario.setRoles((Set<Role>) role);
                novoUsuario.setTipo(tipo);

                novoUsuario.setGoogleUser(googleUser);



                // conecta o novoUsuario com a conta do google
                googleUser.setUsuario(novoUsuario);


                // salva o login do google
                this.googleUserRepository.save(googleUser);

                // salva o novo usuario
                this.usuarioRepository.save(novoUsuario);

            }


        } else {
            // já esta cadastrado e salvo
            log.info("Bem vindo {}", oAuth2User.getAttributes().get("given_name"));
            log.info(oAuth2User.getAttributes().toString());
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
