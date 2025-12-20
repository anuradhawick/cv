import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  active = signal(false);
  activeCount = signal(0);

  activateLoader() {
    this.activeCount.update((count) => count + 1);
    this.active.set(true);
  }

  deactivateLoader() {
    this.activeCount.update((count) => count - 1);
    if (this.activeCount() <= 0) {
      this.active.set(false);
      this.activeCount.set(0);
    }
  }
}
