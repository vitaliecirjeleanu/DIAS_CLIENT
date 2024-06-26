import { ChangeDetectionStrategy, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { bypassLayerError } from '../../../utils/jsdom-layer-error-bypass';
import { ToolbarComponent } from './toolbar.component';
import { MouseEventType, Theme } from '../../../shared/types';
import { TranslateTestingModule, provideMockStore } from '../../../utils/tests';
import { AVATAR_DEFAULT_ACTIONS } from './toolbar.constants';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, NoopAnimationsModule, TranslateTestingModule],
      providers: [provideMockStore()],
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
        const mockThemeElement = document.createElement('div');
        mockThemeElement.id = 'app-theme';
        document.body.appendChild(mockThemeElement);

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
        expect(themeAction.lastElementChild?.textContent).toEqual(
          'toolbar.dark'
        );
      });

      test('should contain sun icon on dark theme', () => {
        component.theme = signal(Theme.DARK);

        fixture.detectChanges();

        expect(themeAction.firstElementChild?.className).toContain('pi-sun');
      });

      test('should have the proper label on dark theme', () => {
        component.theme = signal(Theme.DARK);

        fixture.detectChanges();

        expect(themeAction.lastElementChild?.textContent).toEqual(
          'toolbar.light'
        );
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

      describe('menu', () => {
        let menu: HTMLElement;

        beforeEach(() => {
          const avatarImage: HTMLElement = fixture.nativeElement.querySelector(
            '[data-test-name="toolbarAvatarImage"]'
          );
          avatarImage.dispatchEvent(new MouseEvent(MouseEventType.Click));
          fixture.detectChanges();
          menu = fixture.nativeElement.querySelector('.p-menu');
        });

        test('should be displayed when the image is clicked', () => {
          expect(menu).toBeTruthy();
        });

        test('should have the proper actions', () => {
          const menuActions = Array.from(
            menu.firstElementChild?.children as HTMLCollection
          );
          menuActions.forEach((action, idx) =>
            expect(action.textContent).toEqual(
              AVATAR_DEFAULT_ACTIONS[idx].label
            )
          );
        });
      });

      describe('image', () => {
        let avatarImage: HTMLImageElement | HTMLElement;

        beforeEach(() => {
          avatarImage = fixture.nativeElement.querySelector(
            '[data-test-name="toolbarAvatarImage"]'
          );
        });

        test('should display an icon if a path is not provided', () => {
          expect(avatarImage.firstElementChild instanceof HTMLElement).toBe(
            true
          );
          expect(
            avatarImage.firstElementChild instanceof HTMLImageElement
          ).toBe(false);
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
