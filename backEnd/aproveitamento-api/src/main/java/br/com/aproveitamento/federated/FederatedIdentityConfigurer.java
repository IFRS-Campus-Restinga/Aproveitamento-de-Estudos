package br.com.aproveitamento.federated;


import org.springframework.context.ApplicationContext;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.Assert;

import java.util.function.Consumer;

public class FederatedIdentityConfigurer extends AbstractHttpConfigurer<FederatedIdentityConfigurer, HttpSecurity> {
    private String loginPageUrl = "/login";

    private String authorizationRequestUri;

    private Consumer<OAuth2User> oAuth2UserHandler;

    private Consumer<OidcUser> oidcUserHandler;


    public FederatedIdentityConfigurer loginPageUrl(String loginPageUrl){
        Assert.hasText(loginPageUrl, "loginPageUrl nao pode ser vazio");
        this.loginPageUrl = loginPageUrl;
        return this;
    }

    public FederatedIdentityConfigurer authorizationRequestUri(String authorizationRequestUri){
        Assert.hasText(authorizationRequestUri, "autorizationRequestUri nao pode ser vazio");
        this.authorizationRequestUri = authorizationRequestUri;
        return this;
    }


    public FederatedIdentityConfigurer oauth2UserHandler(Consumer<OAuth2User> oAuth2UserHandler){
        Assert.notNull(oAuth2UserHandler, "oauth2UserHandler nao pode ser vazio");
        this.oAuth2UserHandler = oAuth2UserHandler;
        return this;
    }

    public FederatedIdentityConfigurer oidcUserHandler(Consumer<OidcUser> oidcUserHandler){
        Assert.notNull(oidcUserHandler, "oidcUserHandler nao pode ser vazio");
        this.oidcUserHandler = oidcUserHandler;
        return this;
    }


    @Override
    public void init(HttpSecurity http) throws Exception{
        ApplicationContext applicationContext = http.getSharedObject(ApplicationContext.class);

        ClientRegistrationRepository clientRegistrationRepository = applicationContext.getBean(ClientRegistrationRepository.class);
        FederatedIdentityAuthenticationEntryPoint authenticationEntryPoint = new FederatedIdentityAuthenticationEntryPoint(this.loginPageUrl, clientRegistrationRepository);

        if(this.authorizationRequestUri != null){
            authenticationEntryPoint.setAuthorizationRequestUri(this.authorizationRequestUri);
        }

        FederatedIdentityAuthenticationSuccessHandler authenticationSuccessHandler = new FederatedIdentityAuthenticationSuccessHandler();

        if(this.oAuth2UserHandler != null){
            authenticationSuccessHandler.setOAuth2UserHandler(this.oAuth2UserHandler);
        }
        if (this.oidcUserHandler != null){
            authenticationSuccessHandler.setOidcUserHandler(this.oidcUserHandler);
        }

        http
            .exceptionHandling(expetionHandling ->
                expetionHandling.authenticationEntryPoint(authenticationEntryPoint)
            )
            .oauth2Login(oauth2Login ->{
                oauth2Login.successHandler(authenticationSuccessHandler);
                if(this.authorizationRequestUri != null){
                    String baseUri = this.authorizationRequestUri.replace("/{registrationId}", "");
                    oauth2Login.authorizationEndpoint(authorizationEndPoint ->
                            authorizationEndPoint.baseUri(baseUri)
                    );
                }
            });

    }
}
