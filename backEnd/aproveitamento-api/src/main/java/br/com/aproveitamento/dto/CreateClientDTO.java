package br.com.aproveitamento.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateClientDTO {
    private String clientId;
    //    private Instant clientIdIssuedAt;
    private String clientSecret;
    //    private Instant clientSecretExpiresAt;
    //private String clientName;



    private Set<AuthorizationGrantType> authorizationGrantTypes;

    private Set<ClientAuthenticationMethod> authenticationMethodsSet;

    private Set<String> redirectUris;


    private Set<String> scopes;

    private boolean requireProofKey;
}
