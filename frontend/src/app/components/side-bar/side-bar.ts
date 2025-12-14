import { Component, effect, inject } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import { form, Field } from '@angular/forms/signals';
import { CvViewerService } from '../../services/cv-viewer-service';

@Component({
  selector: 'app-side-bar',
  imports: [Checkbox, Field],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  readonly cvViewerService = inject(CvViewerService);
  viewOptionsForm = form(this.cvViewerService.viewOptionsModel);
}
