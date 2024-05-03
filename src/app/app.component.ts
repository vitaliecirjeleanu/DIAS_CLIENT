import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
