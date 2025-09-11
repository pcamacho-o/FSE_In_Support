import { bootstrapApplication } from '@angular/platform-browser';
import { TroubleshooterComponent } from './app/components/troubleshooter/troubleshooter.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(TroubleshooterComponent, config);

export default bootstrap;
