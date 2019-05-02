import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../services/authentcation/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  login() {
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    console.log(this.loginForm);
  }
}
