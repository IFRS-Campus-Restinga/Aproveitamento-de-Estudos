package br.com.aproveitamento.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.saml2.provider.service.authentication.OpenSaml4AuthenticationProvider;
//import org.springframework.security.saml2.provider.service.authentication.OpenSaml4AuthenticationProvider.ResponseToken;
//import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
//import org.springframework.security.saml2.provider.service.authentication.Saml2Authentication;
//import org.springframework.security.oauth2.client.JwtBearerOAuth2AuthorizedClientProvider;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
//import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
//import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
//import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity
public class ResourceServerConfiguration {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

//    @Bean
//    SecurityFilterChain configure(HttpSecurity http) throws Exception {
//
//
//
//        return http
//                .authorizeHttpRequests( auth -> {
//                    auth.anyRequest().authenticated();
//                })  // configurando os metodos de login, utilizando o resource server
//                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt ->
//                        jwt.decoder(JwtDecoders.fromIssuerLocation(issuerUri))))
//                //.formLogin(withDefaults())
//                .build();
//    }
//
//
//    @Bean
//    public JwtAuthenticationConverter jwtAuthenticationConverter(){
//        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
//        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
//        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
//        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
//        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
//
//        return jwtAuthenticationConverter;
//    }

//    @Bean
//    public OAuth2AuthorizedClientManager authorizedClientManager(
//        ClientRegistrationRepository clientRegistrationRepository,
//        OAuth2AuthorizedClientRepository authorizedClientRepository) {
//
//            OAuth2AuthorizedClientProvider authorizedClientProvider =
//                    OAuth2AuthorizedClientProviderBuilder.builder()
//                            .authorizationCode()
//                            .refreshToken()
//                            .clientCredentials()
//                            .password()
//                            .provider(new JwtBearerOAuth2AuthorizedClientProvider())
//                            .build();
//
//            DefaultOAuth2AuthorizedClientManager authorizedClientManager =
//                    new DefaultOAuth2AuthorizedClientManager(
//                            clientRegistrationRepository, authorizedClientRepository);
//            authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);
//
//
//            return authorizedClientManager;
//        }





//    @Bean
//    SecurityFilterChain configure(HttpSecurity http) throws Exception {
//
//        OpenSaml4AuthenticationProvider authenticationProvider = new OpenSaml4AuthenticationProvider();
//        authenticationProvider.setResponseAuthenticationConverter(groupsConverter());
//
//        http.authorizeHttpRequests(authorize -> authorize
//                        .anyRequest().authenticated())
//                .saml2Login(saml2 -> saml2
//                        .authenticationManager(new ProviderManager(authenticationProvider)))
//                .saml2Logout(withDefaults());
//
//        return http.build();
//    }
//
//    private Converter<OpenSaml4AuthenticationProvider.ResponseToken, Saml2Authentication> groupsConverter() {
//
//        Converter<ResponseToken, Saml2Authentication> delegate =
//                OpenSaml4AuthenticationProvider.createDefaultResponseAuthenticationConverter();
//
//        return (responseToken) -> {
//            Saml2Authentication authentication = delegate.convert(responseToken);
//            Saml2AuthenticatedPrincipal principal = (Saml2AuthenticatedPrincipal) authentication.getPrincipal();
//            List<String> groups = principal.getAttribute("groups");
//            Set<GrantedAuthority> authorities = new HashSet<>();
//            if (groups != null) {
//                groups.stream().map(SimpleGrantedAuthority::new).forEach(authorities::add);
//                System.out.println(groups.listIterator());
//            } else {
//                authorities.addAll(authentication.getAuthorities());
//                System.out.println(Arrays.toString(authentication.getAuthorities().toArray()));
//            }
//            return new Saml2Authentication(principal, authentication.getSaml2Response(), authorities);
//        };
//    }




}