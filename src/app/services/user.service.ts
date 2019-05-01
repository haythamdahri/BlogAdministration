import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, retry} from 'rxjs/operators';
import {AppSettings} from './app.settings';

@Injectable()
export class UserService {

  private USERS_URL = AppSettings.SERVER_ENDPOINT + '/users';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    const headerOptions: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(this.USERS_URL,
      {headers: headerOptions, reportProgress: true, observe: 'body'}
    ).pipe(
      map((response) => {
          let usersResponse: any = response._embedded.posts;
          usersResponse.map((userData) => {
            console.log(userData);
            userData.link = userData._links.self.href;
            userData.postsUrl = userData._links.self.href.posts;
            userData.commentsUrl = userData._links.self.href.comments;
          });
          return usersResponse;
        }
      ),
      // Retry to retrieve data for 5 times
      retry<any>(5)
    );
  }

  getUser(id: number): Observable<any> {
    const USER_URL = this.USERS_URL + '/' + id;
    const headerOptions: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(USER_URL,
      {headers: headerOptions, reportProgress: true, observe: 'body'}
    ).pipe(
      map((response) => {
          response.link = response._links.self.href;
          response.postsUrl = response._links.self.href.posts;
          response.commentsUrl = response._links.self.href.comments;
          return response;
        }
      ),
      // Retry to retrieve data for 5 times
      retry<any>(5)
    );
  }

  getUserByLink(creatorUrl: URL): Observable<any> {
    const headerOptions: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(String(creatorUrl),
      {headers: headerOptions, reportProgress: true, observe: 'body'}
    ).pipe(
      map((response) => {
          response.link = response._links.self.href;
          response.postsUrl = response._links.self.href.posts;
          response.commentsUrl = response._links.self.href.comments;
          return response;
        }
      ),
      // Retry to retrieve data for 5 times
      retry<any>(5)
    );
  }

}
