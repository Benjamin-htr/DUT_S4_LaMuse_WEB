import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaMuseExecComponent } from './la-muse-exec.component';

describe('LaMuseExecComponent', () => {
  let component: LaMuseExecComponent;
  let fixture: ComponentFixture<LaMuseExecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaMuseExecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaMuseExecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
