import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    spyOn(component.reload, 'emit');

    const nativeElement = fixture.nativeElement;
    const a = nativeElement.querySelector('a');
    a.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.reload.emit).toHaveBeenCalled();
  });
});
