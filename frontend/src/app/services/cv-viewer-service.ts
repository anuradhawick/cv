import { effect, Injectable, signal } from '@angular/core';

export interface ViewOptions {
  publications: boolean;
  certifications: boolean;
  education: boolean;
  skills: boolean;
  softwareTools: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CvViewerService {
  viewOptionsModel = signal<ViewOptions>({
    publications: true,
    certifications: true,
    education: true,
    skills: true,
    softwareTools: true,
  });

  constructor() {
    effect(() => {
      const value = this.viewOptionsModel();
      console.log('View Options Updated:', value);
    });
  }
}
