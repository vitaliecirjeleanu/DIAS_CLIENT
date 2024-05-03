import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bypassLayerError } from '../../../utils/jsdom-layer-error-bypass';

import { ToolbarComponent } from './toolbar.component';
import { ThemeService } from '../../../shared/services/theme-service/theme.service';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MouseEventType, Theme } from '../../../shared/types';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockThemeService {
  public toggleTheme(): void {}
  public theme = signal(Theme.LIGHT);
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, NoopAnimationsModule],
      providers: [{ provide: ThemeService, useClass: MockThemeService }],
    })
      .overrideComponent(ToolbarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('template', () => {
    test('should display actions', () => {
      const displayedActions: HTMLButtonElement[] =
        fixture.nativeElement.querySelectorAll(
          '[data-test-name="toolbarAction"]'
        );
      expect(displayedActions.length).toBeGreaterThan(0);
    });

    test('should call action callback when clicked', () => {
      const homeCallback = jest.fn();
      const action: HTMLButtonElement = fixture.nativeElement.querySelector(
        '[data-test-name="toolbarAction"]'
      );

      component.toolbarActions[0].callback = homeCallback;
      fixture.detectChanges();
      action.dispatchEvent(new MouseEvent(MouseEventType.Click));

      expect(homeCallback).toHaveBeenCalledTimes(1);
    });

    describe('themeAction', () => {
      let themeAction: HTMLButtonElement;

      beforeEach(() => {
        themeAction = fixture.nativeElement.querySelector(
          '[data-test-name="toggleThemeAction"]'
        );
      });

      test('should be displayed', () => {
        expect(themeAction).toBeTruthy();
      });

      test('should contain moon icon on light theme', () => {
        expect(themeAction.firstElementChild?.className).toContain('pi-moon');
      });

      test('should have the proper label on light theme', () => {
        expect(themeAction.lastElementChild?.textContent).toEqual('Dark');
      });

      test('should contain sun icon on dark theme', () => {
        component.theme = signal(Theme.DARK);

        fixture.detectChanges();

        expect(themeAction.firstElementChild?.className).toContain('pi-sun');
      });

      test('should have the proper label on dark theme', () => {
        component.theme = signal(Theme.DARK);

        fixture.detectChanges();

        expect(themeAction.lastElementChild?.textContent).toEqual('Light');
      });

      test('should toggle the theme when clicked', () => {
        jest.spyOn(component, 'toggleTheme');

        themeAction.dispatchEvent(new MouseEvent(MouseEventType.Click));

        expect(component.toggleTheme).toHaveBeenCalledTimes(1);
      });
    });

    describe('avatar', () => {
      test('should be displayed', () => {
        const avatar = fixture.nativeElement.querySelector(
          '[data-test-name="toolbarAvatar"]'
        );

        expect(avatar).toBeTruthy();
      });

      test('should display a menu when the image is clicked', () => {
        const avatarImage: HTMLElement = fixture.nativeElement.querySelector(
          '[data-test-name="toolbarAvatarImage"]'
        );
        avatarImage.dispatchEvent(new MouseEvent(MouseEventType.Click));
        fixture.detectChanges();
        const menu = fixture.nativeElement.querySelector('.p-menu');

        expect(menu).toBeTruthy();
      });

      describe('image', () => {
        let avatarImage: HTMLImageElement | HTMLElement;

        beforeEach(() => {
          avatarImage = fixture.nativeElement.querySelector(
            '[data-test-name="toolbarAvatarImage"]'
          );
        });

        test('should display an image if a path is provided', () => {
          expect(avatarImage.firstElementChild instanceof HTMLElement).toBe(
            true
          );
        });

        test('should display an image if a path is provided', () => {
          component.avatar.imagePath = 'test';

          fixture.detectChanges();

          expect(
            avatarImage.firstElementChild instanceof HTMLImageElement
          ).toBe(true);
        });
      });

      describe('name', () => {
        test('should be displayed if provided', () => {
          const avatarName = fixture.nativeElement.querySelector(
            '[data-test-name="toolbarAvatarName"]'
          );

          expect(avatarName).toBeTruthy();
        });

        test('should not be displayed if not provided', () => {
          component.avatar.name = '';

          fixture.detectChanges();
          const avatarName = fixture.nativeElement.querySelector(
            '[data-test-name="toolbarAvatarName"]'
          );

          expect(avatarName).toBeNull();
        });
      });
    });
  });
});
