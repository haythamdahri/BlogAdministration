import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../services/authentcation/authentication.service';
import Swal from 'sweetalert2';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;
  @ViewChild('loginButton') loginButton: ElementRef;
  loginError = false;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogin() {
    if (!this.loginForm.valid) {
      Swal.fire(
        'Invalid input',
        'Please provide a valid email and password!',
        'error'
      );
      return;
    }
    const html = (<HTMLButtonElement>this.loginButton.nativeElement).innerHTML;
    (<HTMLButtonElement>this.loginButton.nativeElement).setAttribute('disabled', 'true');
    (<HTMLButtonElement>this.loginButton.nativeElement).innerHTML = '<i class="fas fa-spinner fa-spin"></i> Login';
    this.authService.login(this.loginForm.value).subscribe(
      (response: HttpResponse<any>) => {
        const jwt = response.headers.get('Authorization');
        this.authService.saveToken(jwt);
        console.log(jwt);
        this.router.navigate(['']);
      },
      (error: HttpErrorResponse) => {
        (<HTMLButtonElement>this.loginButton.nativeElement).innerHTML = html;
        this.loginError = !this.loginError;
        this.loginForm.controls['email'].setErrors({'incorrect': true});
        this.loginForm.controls['password'].setErrors({'incorrect': true});
      }
    );
  }


}
