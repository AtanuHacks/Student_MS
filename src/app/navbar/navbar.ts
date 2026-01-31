import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],   
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  menuOpen = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.menuOpen = false;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
