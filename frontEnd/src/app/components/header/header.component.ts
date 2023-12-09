import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  @Input() usuario: Usuario | undefined;
  public recarregado = localStorage.getItem('novoLogin');
  currentUser: any;
  admin: boolean = false;

  showDropdown = false;
  currentPage: string = 'register';
  adminManegent: string[] = ['discipline', 'course', 'student', 'announcement', 'servant']

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {    
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    localStorage.removeItem('currentUser'); 
    localStorage.removeItem('novoLogin'); 
    this.router.navigate(['/login']); 
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get isLoggedIn() {
    return this.currentUser !== null;
  }
}
