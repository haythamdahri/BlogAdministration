import {Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Observable} from 'rxjs';
import {AppSettings} from '../services/app.settings';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Posts} from '../models/posts.interface';


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

  constructor(private postService: PostService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.noPosts = false;
        if (queryParams.page != null) {
          this.postsData = this.postService.getPosts(Number(queryParams.page));
        } else {
          this.postsData = this.postService.getPosts(null, 2);
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
          }
        );
      }
    );

  }


  onCreatorDetails(creatorUrl: URL) {
    this.userService.getUserByLink(creatorUrl).subscribe(
      (user: User) => {
        this.user = user;
      },
      () => {
        this.isUserError = true;
      }
    );
  }

  onUserModalClose() {
    this.user = null;
    this.isUserError = false;
  }

  goToPostsPage(pageNumber: number) {
    this.router.navigate([''], {queryParams: [{page: pageNumber}], relativeTo: this.route});
  }
}
