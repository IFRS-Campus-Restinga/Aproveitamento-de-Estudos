package br.com.aproveitamento.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String clientId;
//    private Instant clientIdIssuedAt;
    private String clientSecret;
//    private Instant clientSecretExpiresAt;
    private String clientName;

    //    @Column(length = 1000)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<ClientAuthenticationMethod> clientAuthenticationMethodsSet;

//    @Column(length = 1000)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<AuthorizationGrantType> authorizationGrantTypes;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> redirectUris;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> scopes;

    private boolean requireProofKey;

    public Client (String clientId,
                   String clientSecret,
                   String clientName,
                   Set<String> clientAuthenticationMethodsSet,
                   Set<String> authorizationGrantTypes,
                   Set<String> redirectUris,
                   Set<String> scopes,
                   boolean requireProofKey){

        this.clientName = clientName;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        Set<ClientAuthenticationMethod> tempAuthMethod = new HashSet<>();

        clientAuthenticationMethodsSet.forEach( r -> {
            tempAuthMethod.add(new ClientAuthenticationMethod(r));
        });

        this.clientAuthenticationMethodsSet = tempAuthMethod;



        Set<AuthorizationGrantType> tempAauthorizationGrantTypes = new HashSet<>();

        authorizationGrantTypes.forEach( r -> {
            tempAauthorizationGrantTypes.add(new AuthorizationGrantType(r));
        });



        this.authorizationGrantTypes = tempAauthorizationGrantTypes;

        this.redirectUris = redirectUris;

        this.scopes = scopes;

        this.requireProofKey = requireProofKey;

    }

    public static RegisteredClient toRegisteredClient(Client client){
        RegisteredClient.Builder builder = RegisteredClient.withId(client.getClientId())
                .clientId(client.getClientId())
                .clientSecret(client.getClientSecret())
                .clientIdIssuedAt(new Date().toInstant())
                .clientAuthenticationMethods(am -> am.addAll(client.getClientAuthenticationMethodsSet()))
                .authorizationGrantTypes(agt -> agt.addAll(client.getAuthorizationGrantTypes()))
                .redirectUris(ru -> ru.addAll(client.getRedirectUris()))
                .scopes(sc -> sc.addAll(client.getScopes()))
                .clientSettings(ClientSettings
                        .builder().requireProofKey(client.requireProofKey).build());

        return builder.build();

    }

//    @Column(length = 1000)
//    private String postLogoutRedirectUris;
//    @Column(length = 2000)
//    private String clientSettings;
//    @Column(length = 2000)
//    private String tokenSettings;


}
