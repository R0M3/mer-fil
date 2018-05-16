import { Component } from '@angular/core';
import { PostService, UserService } from './providers';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private userPosts: any;
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.userPosts = this.getUserPosts();
  }
  getUserPosts() {
    let res = [];
    // this.postService.getPosts().subscribe(res => console.log(res));
    return combineLatest(
      this.postService.getPosts(),
      this.userService.getUsers()
    ).subscribe(([posts, users]) => {
      var findPosts = id => posts.find(post => post.userId === id);
      console.log(users.forEach(user => Object.assign(user, findPosts(user.id))));
    });
  }
}
