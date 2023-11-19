package br.com.aproveitamento.config;


import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.saml2.provider.service.authentication.OpenSaml4AuthenticationProvider;
//import org.springframework.security.saml2.provider.service.authentication.OpenSaml4AuthenticationProvider.ResponseToken;
//import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
//import org.springframework.security.saml2.provider.service.authentication.Saml2Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain configure(HttpSecurity http) throws Exception {


        return http
                .authorizeHttpRequests( auth -> {
                    auth.requestMatchers("/").permitAll();
                    auth.anyRequest().authenticated();
                })
                .oauth2Login(withDefaults())
                //.formLogin(withDefaults())
                .build();
    }


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