import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit{

  code = '';

  constructor(
    private activateRoute : ActivatedRoute,
    private authService: AuthService){
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
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
