import { Component } from '@angular/core';
import { PostService, UserService } from './providers';
import { Observable, combineLatest } from 'rxjs';
import { ListItem } from './components/list-item/list-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public questions: ListItem[];
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.getUserPosts();
    this.questions = [
      {
        title: 'Why seperating state is useful',
        text: 'Seperating state is akin to the seperation of concerns. The seperation of concerns is a design principle for seperating code into distint sections, so that each section can address a seperate concern. This ensures maintainability, flexibility, extensibility and reusability. Redux is a great example of this.',
        image: '',
        imageAlt: ''
      },
      {
        title: 'Benefits to using ES6 classes',
        text: 'People keep saying it\'s just syntactical sugar, but it\'s super important sugar:',
        list: [
          'Simpler, less error prone syntax',
          'More scalable, maintainable, readable code base',
          'Much easier to work with inheritance'
        ],
        image: '',
        imageAlt: ''
      },
      {
        title: 'Immutibility',
        text: 'Immutibility refers to code that cannot be changed. Mutating data can produce code that’s hard to read and error prone. This is often a problem in objects, as they\'re passed by reference, meaning it could be easy to accidentily overwrite an object when you think you\'re making a copy. Object.assign or the spread operator from ES6 prevents passing by reference, but using immutable.js or redux helps prevent it happening altogether.',
        image: '',
        imageAlt: ''
      },
      {
        title: 'Spread operator',
        text: 'The spread operator allows an expression to be expanded in places where multiple elements/variables/arguments are expected. Some good use cases of this are: ',
        list: [
          'Copying arrays',
          'Combining arrays',
          'Destructuring objects, for example, into variables',
          'Calling functions without using .apply()'
        ],
        image: '../assets/spread.png',
        imageAlt: ''
      }
    ]
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
