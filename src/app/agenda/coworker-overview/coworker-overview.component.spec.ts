import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkerOverviewComponent } from './coworker-overview.component';

describe('CoworkerOverviewComponent', () => {
  let component: CoworkerOverviewComponent;
  let fixture: ComponentFixture<CoworkerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoworkerOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoworkerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
