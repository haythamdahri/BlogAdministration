import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../app.settings';
import {Observable} from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticationService {

  private LOGIN_URL = AppSettings.SERVER_URL + '/login';

  constructor(private http: HttpClient) {
  }


  // Check if the user is authenticated
  isAuthenticated() {
    return localStorage.getItem('token') != null ? true : false;
  }

  // Login the user into the backend server
  login(user: User): Observable<any> {
    console.log('Login url: ' + this.LOGIN_URL);
    return this.http.post(this.LOGIN_URL, user, {
      observe: 'response'
    });
  }

  // Logout user by removing token from local storage after user logout from backend server
  logout() {
    localStorage.removeItem('token');
  }

  // Save token on localStorage to keep user connected either with page refresh
  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  // Retrieve the stored token
  getToken() {
    return localStorage.getItem('token');
  }

}
