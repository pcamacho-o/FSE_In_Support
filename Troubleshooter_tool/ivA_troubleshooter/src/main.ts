import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TroubleshooterComponent } from './app/components/troubleshooter/troubleshooter.component';
import { appConfig } from './app/app.config';

bootstrapApplication(TroubleshooterComponent, {
  ...appConfig,               // spread your existing appConfig if needed
  providers: [
  ...(appConfig.providers || []),
  provideHttpClient()] // provide HttpClient here
}).catch((err) => console.error(err));
