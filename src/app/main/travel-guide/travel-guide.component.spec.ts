import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelGuideComponent } from './travel-guide.component';

describe('TravelGuideComponent', () => {
  let component: TravelGuideComponent;
  let fixture: ComponentFixture<TravelGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
