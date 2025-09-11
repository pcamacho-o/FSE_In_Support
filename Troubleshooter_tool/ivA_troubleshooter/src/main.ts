import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TroubleshooterComponent } from './app/components/troubleshooter/troubleshooter.component';

bootstrapApplication(TroubleshooterComponent, appConfig)
  .catch((err) => console.error(err));
