import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesHeatmapComponent } from './countries-heatmap.component';

describe('CountriesHeatmapComponent', () => {
  let component: CountriesHeatmapComponent;
  let fixture: ComponentFixture<CountriesHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
