import { Component } from '@angular/core';
import { PostService, UserService } from './providers';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.getUserPosts();
  }

  // merge and filter of two endpoints here
  // goal is to map posts to users
  getUserPosts() {
    return combineLatest(
      this.postService.getPosts(),
      this.userService.getUsers()
    ).subscribe(([posts, users]) => {
      let usersPosts = users.map(user => {
        return Object.assign({}, user, {
          posts: posts.filter(post => post.userId === user.id)
        });
      });
      console.info("Result of merge and filter:");
      console.log(usersPosts);
  })}
}
