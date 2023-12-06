import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  memberName = "ditan";
  constructor(private postService: PostService, private router: Router) {
  }
  @Input() index: number = 0;
  @Input() post?: Post;
  comments: string[] = [];

  ngOnInit(): void {
    console.log(this.post);
    this.comments = this.postService.getComments(this.index);
  }
  delete() {
    this.postService.deleteButton(this.index);
  }
  onEdit() {
    this.router.navigate(['/post-edit', this.index])
  }
  onLike() {
    this.postService.likePost(this.index)
  }
  onAddComment(comment: string) {
    this.postService.addComment(this.index, comment);
    this.comments = this.postService.getComments(this.index); // Refresh the comments
  }
}