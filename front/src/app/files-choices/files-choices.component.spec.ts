import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesChoicesComponent } from './files-choices.component';

describe('FilesChoicesComponent', () => {
  let component: FilesChoicesComponent;
  let fixture: ComponentFixture<FilesChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesChoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
