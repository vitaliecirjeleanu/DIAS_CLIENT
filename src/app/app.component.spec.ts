import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponents, MockModule } from 'ng-mocks';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

const mockPrimeNGConfig: Partial<PrimeNGConfig> = {
  ripple: false,
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(RouterModule)],
      declarations: [
        AppComponent,
        MockComponents(ToolbarComponent, FooterComponent),
      ],
      providers: [{ provide: PrimeNGConfig, useValue: mockPrimeNGConfig }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should activate ripple effect', () => {
    expect(mockPrimeNGConfig.ripple).toEqual(true);
  });

  describe('template', () => {
    test('should display the header', () => {
      const header = fixture.nativeElement.querySelector(
        '[data-test-name="global-header"]'
      );
      expect(header).toBeTruthy();
    });

    test('should display the main content', () => {
      const mainContent = fixture.nativeElement.querySelector(
        '[data-test-name="main-content"]'
      );
      expect(mainContent).toBeTruthy();
    });

    test('should display the footer', () => {
      const footer = fixture.nativeElement.querySelector(
        '[data-test-name="global-footer"]'
      );
      expect(footer).toBeTruthy();
    });
  });
});
