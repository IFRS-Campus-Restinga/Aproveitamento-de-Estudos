import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit{

  code = '';

  constructor(
    private activateRoute : ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService){
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(data => {
      this.code = data.code;
      this.getToken();
    });

  }

  getToken(): void {
    this.authService.getToken(this.code).subscribe(
      data => {
        //debug para informações de retorno do token de acesso
        //console.log(data);
        this.tokenService.setTokens(data.access_token, data.refresh_token);

      },
      err => {
        console.log(err);
      }
    );
  }

}
