import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) { }

 
saveData(){
    const listofPosts: Post[] = this.postService.getPost();
    this.http.put('https://cc105-affec-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', listofPosts)
    .subscribe((res) => {
      console.log(res);
      // Call setPosts after saving the new post
      this.postService.setPosts(listofPosts);
    })
  }

  fetchData(): Observable<Post[]> {
    return this.http.get<Post[]>('https://cc105-affec-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
      .pipe(tap((listofPosts: Post[])=> {
        console.log(listofPosts)
  
        listofPosts.forEach(post => {
          if (!Array.isArray(post.comments)) {
            post.comments = [];
          }
        });
        
        this.postService.setPosts(listofPosts);
        this.postService.listChangedEvent.emit(listofPosts);
      }));
  }
}