import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  combineLatest,
  combineLatestAll,
  concatMap,
  exhaustMap,
  filter,
  forkJoin,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
  take,
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    let postIds = interval(1000).pipe(
      filter((val) => val > 0),
      take(5)
    );
    postIds
      .pipe(
        mergeMap((id) => {
          return this._http.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
          );
        })
      )
      .subscribe({
        next: (postDetails) => {
          //console.log(postDetails)
        },
      });
    forkJoin(postIds).subscribe({
      next: (data) => {
        //console.log(data);
      },
    });
    combineLatest(postIds).subscribe({
      next: (data) => {
        //console.log(data);
      },
    });

    const clicks = fromEvent(document, 'click');
    const higherOrder = clicks.pipe(
      map(() => interval(Math.random() * 2000).pipe(take(3))),
      take(2)
    );
    const result = higherOrder.pipe(combineLatestAll());

    result.subscribe((x) => console.log(x));
  }
}
