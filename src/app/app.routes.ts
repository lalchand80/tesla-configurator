import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';
import { SummaryComponent } from './components/summary/summary.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'config', component: ConfigComponent},
    {path: 'summary', component: SummaryComponent}
];
