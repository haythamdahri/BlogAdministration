import {Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Observable, Subscription} from 'rxjs';
import {AppSettings} from '../services/app.settings';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Posts} from '../models/posts.interface';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsData: Observable<Posts>;
  MEDIA_URL = AppSettings.SERVER_MEDIA_URL;
  SERVER_URL = AppSettings.SERVER_URL;
  user: User = null;
  isUserError = false;
  postsPages = new Array();
  noPosts = false;
  isPostsError = false;

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.noPosts = false;
        this.isPostsError = false;
        if (queryParams.page != null) {
          this.postsData = this.postService.getPosts(Number(queryParams.page));
        } else {
          this.postsData = this.postService.getPosts();
        }
        this.postsData.subscribe(
          (data: Posts) => {
            this.postsPages = new Array();
            for (let i = 0; i < data.page.totalPages; i++) {
              this.postsPages.push(i);
            }
            if (data.posts.length === 0) {
              this.noPosts = true;
            }
          },
          () => {
            this.isPostsError = true;
          }
        );
      }
    );

  }


  /*
  * @On creator details button click for more details about the post's creator
  */
  onCreatorDetails(creatorUrl: URL) {
    this.userService.getUserByLink(creatorUrl).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error: HttpErrorResponse) => {
        this.isUserError = true;
        console.log('Error=========================: ' + error);
      }
    );
  }

  /*
  * @On close of creator details modal
  */
  onUserModalClose() {
    this.user = null;
    this.isUserError = false;
  }

  /*
  * @Accept or reject a post
  */
  onPostDecide(postId: number, action: boolean) {
    this.postService.decidePost(postId, action).subscribe(
      (data: string) => {
        Swal.fire(
          'Post has been!' + action ? 'approved' : 'rejected',
          data,
          'success'
        );
        console.log(data);
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        Swal.fire(
          'Error',
          'An error occured, please try again',
          'error'
        );
        console.log(error);
      }
    );
  }
}
