import { Component, inject, Input, signal } from '@angular/core';
import { LoaderService } from '../../services/loader-service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  readonly loaderService = inject(LoaderService);
}
