import { ISearchItem, IYoutubeItem } from 'src/app/shared/types/search-item.model';
import { GetDetailsService } from './../../shared/service/get-details.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import YoutubeAPIService from 'src/app/shared/service/youtubeAPI.service';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  constructor(private apiResponse: SearchResultComponent) { }

  selectedCardID: IYoutubeItem | undefined;
  cardID: string = "";
  getDetailsService: GetDetailsService = inject(GetDetailsService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  date: string = "";

  ngOnInit(): void {
    const response = this.apiResponse.getAllDataArray();
    const idParam = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(idParam)
    if (idParam !== null) {
      console.log(idParam)
      this.cardID = idParam;
      this.selectedCardID = response.find((el) => el.id.videoId === this.cardID);
      this.date = (() => {
        const inputDateString: string | undefined = this.selectedCardID?.snippet?.publishedAt;
        const dateObject = new Date(inputDateString!);

        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };

        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate;
      })();
    } else {
      console.error("ID is null");
    }
  }
}
