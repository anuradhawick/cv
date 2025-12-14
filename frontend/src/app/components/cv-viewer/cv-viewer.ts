import { Component, computed, inject } from '@angular/core';
import { Intro } from './intro/intro';
import { WorkExperience } from './work-experience/work-experience';
import { Education } from './education/education';
import { PostersPresentations } from './posters-presentations/posters-presentations';
import { Publications } from './publications/publications';
import { TrainingCertifications } from './training-certifications/training-certifications';
import { SoftwareTools } from './software-tools/software-tools';
import { AwardsAchievements } from './awards-achievements/awards-achievements';
import { Skills } from './skills/skills';
import { CvViewerService } from '../../services/cv-viewer-service';

@Component({
  selector: 'app-cv-viewer',
  imports: [
    Intro,
    WorkExperience,
    Education,
    PostersPresentations,
    Publications,
    TrainingCertifications,
    SoftwareTools,
    AwardsAchievements,
    Skills,
  ],
  templateUrl: './cv-viewer.html',
  styleUrl: './cv-viewer.css',
})
export class CvViewer {
  readonly cvViewerService = inject(CvViewerService);
  viewerStatus = computed(() => this.cvViewerService.viewOptionsModel());
}
