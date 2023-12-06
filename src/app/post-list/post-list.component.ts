import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  listOfPosts: Post[] = [];

  constructor(
    private postService: PostService,
    private backEndService: BackEndService
  ) { }

  ngOnInit(): void {
    this.listOfPosts = this.postService.getPost();
    this.backEndService.fetchData().subscribe((posts: Post[])=> {
      this.listOfPosts = posts;
    })

    // Subscribe to the listChangedEvent
    this.postService.listChangedEvent.subscribe((posts: Post[]) => {
      this.listOfPosts = posts;
    });
  }
}