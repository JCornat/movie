import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieImportComponent } from './import.component';

describe('ImportComponent', () => {
  let component: MovieImportComponent;
  let fixture: ComponentFixture<MovieImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
