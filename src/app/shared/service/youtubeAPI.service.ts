import { IYoutubeResponse } from './../types/search-response-model';
import { Observable, from, retry } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { IYoutubeItem } from '../types/search-item.model';

@Injectable({
  providedIn: "root"
})
export default class YoutubeAPIService {

  private readonly LIMIT: number = 10;

  constructor(private http: HttpClient) { }

  getSearchTerm(searchTerm: string) {
    return searchTerm;
  }
  getYoutubeResponse(term: string, page: number): Observable<IYoutubeResponse> {

    const youtubeApiURL: string = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCOtq5qZGHsBQm0BJtYCmswtuq8p71W-qo&q=${term}&type=video&limit=${this.LIMIT}&part=snippet`;

    return this.http.get<IYoutubeResponse>(youtubeApiURL);
  }
}