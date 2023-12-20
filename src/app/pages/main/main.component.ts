import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  showFilter: boolean = false;
  enteredSearchValue: string = "";

  getSearchTerm() {
    return this.enteredSearchValue;
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  showContent() {
    this.showFilter = !this.showFilter;
  }
}
