import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showDropdown = false;
  currentPage: string = 'dfsdfdssdfsdf';

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentPage = event.urlAfterRedirects.split('/')[1];
        }
      }
    );
  }
}
