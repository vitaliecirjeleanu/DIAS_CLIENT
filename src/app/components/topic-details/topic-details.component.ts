import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-details',
  standalone: true,
  templateUrl: './topic-details.component.html',
  styleUrl: './topic-details.component.scss',
})
export class TopicDetailsComponent {
  private readonly route = inject(ActivatedRoute);

  public topicName = this.route.snapshot.paramMap.get('name');
}
