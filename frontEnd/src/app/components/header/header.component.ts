import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showDropdown = false; // Controla a exibição do dropdown

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
