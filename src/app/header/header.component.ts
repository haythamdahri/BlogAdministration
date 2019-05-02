import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentcation/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
