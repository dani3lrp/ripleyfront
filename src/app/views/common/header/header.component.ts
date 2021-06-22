import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Ripley';
  routerEventSubscription: object;

  constructor(

    private router: Router

  ) {

    /** Captura de app-routing.module el título de vista */

    this.routerEventSubscription = this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .pipe(map((event: RoutesRecognized) => {
        return event.state.root.firstChild.data['title'];
      })).subscribe(title => {

        this.title = title;

      });

  }

  ngOnInit(): void {
  }

}
