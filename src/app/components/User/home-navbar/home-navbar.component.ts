import { Component , ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent {
  constructor(private router: Router) {}
  dropdownOpen = false;

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(target)) {
      this.dropdownOpen = false;
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('BASKET_ID');
    localStorage.removeItem('userRole');

    this.router.navigate(['/loginuser']); 
  }


}
