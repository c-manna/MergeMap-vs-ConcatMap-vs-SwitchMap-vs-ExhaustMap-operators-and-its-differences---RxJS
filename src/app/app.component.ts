import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { filter, interval, mergeMap, take } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit{
  constructor(private _http: HttpClient){}

  ngOnInit(){
    let postIds = interval(1000).pipe(filter(val=>val>0),take(5));
    postIds.pipe(mergeMap((id)=>{
      return this._http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    })).subscribe({next:(postDetails)=>{
      console.log(postDetails)
    }})
  }
}
