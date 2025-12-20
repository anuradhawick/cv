import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface CitationsResponse {
  metadata: Metadata;
  entries: Citation[];
}

export interface Metadata {
  lastUpdated: string;
}

export interface Citation {
  title: string;
  titleUrl: string;
  authors: string;
  journal: string;
  citations: number;
  citationsUrl?: string; // optional, not required in schema
  year: number;
}

@Injectable({
  providedIn: 'root',
})
export class CitationsService {
  private http = inject(HttpClient);

  getCitations(): Observable<CitationsResponse> {
    return this.http.get<CitationsResponse>(environment.api + '/citations');
  }
}
