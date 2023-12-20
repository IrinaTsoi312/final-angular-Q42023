import { cardsReducer } from './../../store/new-card.reducer';
import { Component, OnInit } from '@angular/core';
import { IYoutubeResponse } from "src/app/shared/types/search-response-model";
import { Observable } from "rxjs";
import { IYoutubeItem } from "src/app/shared/types/search-item.model";
import YoutubeAPIService from 'src/app/shared/service/youtubeAPI.service';
import { INewCard } from 'src/app/shared/types/newCard';
import { Store, select } from '@ngrx/store';
import { map } from "rxjs/operators";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {

  responseData: IYoutubeItem[] = [];
  newCardsArray$: Observable<INewCard[]> | undefined;
  searchTerm: string | null = localStorage.getItem("searchTerm");

  constructor(private requestService: YoutubeAPIService, private store: Store<INewCard[]>) {
    this.newCardsArray$ = this.store.pipe(select((state) => state));
  }

  ngOnInit(): void {
    this.requestService.getYoutubeResponse(this.searchTerm!, 1)
      .subscribe({
        next: (response: IYoutubeResponse) => {
          this.responseData = response.items;
        },
        error: (error) => { throw new Error("Error: ", error) },
        complete: () => { console.log("Done retriving data.") }
      })
  }

  getAllDataArray() {
    return this.responseData;
  }
}
