import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map, retry} from 'rxjs/operators';
import {AppSettings} from './app.settings';
import {Posts} from '../models/posts.interface';

@Injectable()
export class PostService {

  private POSTS_URL = AppSettings.SERVER_ENDPOINT + '/posts';

  constructor(private http: HttpClient) {
  }

  getPosts(page: number = 0, size: number = 5): Observable<Posts> {
    const headerOptions: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(this.POSTS_URL,
      {
        headers: headerOptions,
        reportProgress: true,
        observe: 'body',
        params: new HttpParams().append('page', String(page)).append('size', String(size))
      }
    ).pipe(
      map((response) => {
          console.log(response);
          let postsResponse: any = response._embedded.posts;
          postsResponse.map((postData) => {
            postData.link = postData._links.self.href;
            postData.creatorUrl = postData._links.creator.href;
          });
          response.page.currentPage = response.page.number;
          return {posts: postsResponse, page: response.page};
        },
      ),
      // Retry to retrieve data for 5 times
      retry<any>(5),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(new Error('An error occured, please try again'));
  }

}
