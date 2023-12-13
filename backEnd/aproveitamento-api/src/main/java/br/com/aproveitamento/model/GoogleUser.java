package br.com.aproveitamento.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Slf4j
public class GoogleUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;


    private String name;


    private String givenName;


    private String familyName;


    private String pictureUrl;


    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;


    public static GoogleUser fromOauth2User(OAuth2User oAuth2User){
        GoogleUser googleUser = GoogleUser.builder()
                .email(oAuth2User.getAttribute("email"))
                .name(oAuth2User.getAttributes().get("name").toString())
                .givenName(oAuth2User.getAttributes().get("given_name").toString())
                .familyName(oAuth2User.getAttributes().get("family_name").toString())
                .pictureUrl(oAuth2User.getAttributes().get("picture").toString())
                .build();

        log.info(oAuth2User.getAttributes().toString());

        return googleUser;
    }

    @Override
    public String toString(){
        return "GoogleUser{ " +
                "id="               + id            +
                ", email='"         + email         + '\'' +
                ", name='"          + name          + '\'' +
                ", givenName='"     + givenName     + '\'' +
                ", familyName='"    + familyName    + '\'' +
                ", pictureUrl='"    + pictureUrl    + '\'' +
                '}';
    }


}
