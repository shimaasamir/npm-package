import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFeatureComponent } from './footer-feature.component';

describe('FooterFeatureComponent', () => {
  let component: FooterFeatureComponent;
  let fixture: ComponentFixture<FooterFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
