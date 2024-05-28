import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bypassLayerError } from '../../../utils/jsdom-layer-error-bypass';

import { CardComponent } from './card.component';
import {
  KeyboardCode,
  KeyboardEventType,
  MouseEventType,
  TopicVM,
} from '../../../shared/types';
import { Router } from '@angular/router';
import { MockModule } from 'ng-mocks';
import { TranslateModule } from '@ngx-translate/core';

class MockRouter {
  navigate = jest.fn();
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, MockModule(TranslateModule)],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.topic = { name: '', nameL18nKey: '' } as TopicVM;
    fixture.detectChanges();
  });

  describe('a11y', () => {
    test('should be focusable', () => {
      expect(fixture.nativeElement.getAttribute('tabindex')).toEqual('0');
    });

    test('should have button role', () => {
      expect(fixture.nativeElement.getAttribute('role')).toEqual('button');
    });
  });

  describe('onKeyDown', () => {
    let navigateSpy: jest.SpyInstance;

    beforeEach(() => {
      navigateSpy = jest.spyOn<any, any>(component, 'navigateToRoute');
    });

    afterEach(() => {
      navigateSpy.mockRestore();
    });

    test('should navigate to its route when enter key is pressed', () => {
      fixture.nativeElement.dispatchEvent(
        new KeyboardEvent(KeyboardEventType.Keydown, {
          key: KeyboardCode.Enter,
          code: KeyboardCode.Enter,
        })
      );
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });

    test('should navigate to its route when space key is pressed', () => {
      fixture.nativeElement.dispatchEvent(
        new KeyboardEvent(KeyboardEventType.Keydown, {
          key: KeyboardCode.Space,
          code: KeyboardCode.Space,
        })
      );
      expect(navigateSpy).toHaveBeenCalledTimes(1);
    });

    test('should not navigate to its route when other key is pressed', () => {
      fixture.nativeElement.dispatchEvent(
        new KeyboardEvent(KeyboardEventType.Keydown, {
          key: KeyboardCode.ArrowDown,
          code: KeyboardCode.ArrowDown,
        })
      );
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });

  test('should navigate to its route when is clicked', () => {
    jest.spyOn<any, any>(component, 'navigateToRoute');
    fixture.nativeElement.dispatchEvent(new MouseEvent(MouseEventType.Click));
    expect(component['navigateToRoute']).toHaveBeenCalledTimes(1);
  });

  test('should display p-card', () => {
    const pCard = fixture.nativeElement.querySelector(
      '[data-test-name="pCard"]'
    );
    expect(pCard).toBeTruthy();
  });
});
