import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Update 23/3/2024 LeQuocDung: Them scroll to top khi reload/open page
export class AppComponent {
  //title = 'sinhnhat';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0); // Cuộn lại đầu trang khi điều hướng bắt đầu
      }
    });
  }
}
