import { Component, signal } from '@angular/core';
import { CvViewer } from '../../components/cv-viewer/cv-viewer';

@Component({
  selector: 'app-home-page',
  imports: [CvViewer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
