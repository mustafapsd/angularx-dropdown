import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-dropdown-demo';

  classList: string[] = [];

  updateClassList(event: Event) {
    const TARGET = event.target as HTMLInputElement;

    if (TARGET.value) {
      this.classList = TARGET.value.split(' ') || [];
    } else {
      this.classList = [];
    }

  }
}
