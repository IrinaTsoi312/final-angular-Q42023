import YoutubeAPIService from 'src/app/shared/service/youtubeAPI.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';
import { IGetSearchTerm } from 'src/app/shared/types/methods';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showFilter: boolean = false;
  term: string = "";
  private searchTermSubject = new Subject<string>();
  isLogged: boolean = Boolean(localStorage.getItem("token"));
  loginName: string = this.getLoginName();
  logIcon: string = this.getIcon();

  @ViewChild("input", { static: true })
  input: ElementRef | undefined;

  ngOnInit(): void {
    this.getLoginName();
    this.getIcon();
    this.showValue();
  }

  showValue() {
    if (this.input) {
      const inputVal$ = fromEvent<KeyboardEvent>(this.input.nativeElement, "input")
        .pipe(
          debounceTime(300),
          map((event: Event) => (event.target as HTMLInputElement).value)
        );

      inputVal$.subscribe((value: string) => {
        if (value.length > 2) {
          localStorage.setItem("searchTerm", value);
        }
      })
    }
  }

  showContent() {
    this.showFilter = !this.showFilter;
  }

  getLoginName(): string {
    return this.isLogged ? localStorage.getItem("userName")! : "Your Name";
  }

  getIcon(): string {
    return this.isLogged ? "Logout" : "LogIn";
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.term = target.value;
    this.searchTermSubject.next(this.term);
  }
}
