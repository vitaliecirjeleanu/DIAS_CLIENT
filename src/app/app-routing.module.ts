import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview/overview.component';
import { TopicDetailsComponent } from './components/topic-details/topic-details/topic-details.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'topic/:name',
    component: TopicDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
