import { Component, inject, OnInit, signal } from '@angular/core';
import { Citation, CitationsService, Metadata } from '../../../services/citations-service';
import { catchError } from 'rxjs';
import { LoaderService } from '../../../services/loader-service';

enum DisplayMode {
  ALL = 'all',
  YEAR_2025 = '2025',
  RECENT_10 = 'recent10',
  MOST_CITED_10 = 'mostCited10',
}

enum SortOrder {
  RECENT = 'recent',
  OLDEST = 'oldest',
  MOST_CITED = 'mostCited',
  LEAST_CITED = 'leastCited',
}

@Component({
  selector: 'app-publications',
  imports: [],
  templateUrl: './publications.html',
  styleUrl: './publications.css',
})
export class Publications implements OnInit {
  readonly citationsService = inject(CitationsService);
  readonly loaderService = inject(LoaderService);
  readonly DisplayMode = DisplayMode;
  readonly SortOrder = SortOrder;
  displayMode = signal(DisplayMode.MOST_CITED_10);
  sortOrder = signal(SortOrder.MOST_CITED);
  citations = signal<Array<Citation>>([]);
  metadata = signal<Metadata>({ lastUpdated: '' });

  ngOnInit(): void {
    this.loaderService.activateLoader();
    this.citationsService
      .getCitations()
      .pipe(
        catchError((error) => {
          console.error('Error fetching citations:', error);
          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.loaderService.deactivateLoader();
      });
  }

  setDisplayMode(mode: DisplayMode) {
    this.displayMode.set(mode);
  }

  setSortOrder(order: SortOrder) {
    this.sortOrder.set(order);
  }

  updateView(mode: DisplayMode, order: SortOrder) {}
}
