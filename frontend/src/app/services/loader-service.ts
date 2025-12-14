import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  active = signal(false);

  activateLoader() {
    this.active.set(true);
  }

  deactivateLoader() {
    this.active.set(false);
  }
}
