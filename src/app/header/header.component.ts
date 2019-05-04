import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentcation/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['singin']);
  }
}
