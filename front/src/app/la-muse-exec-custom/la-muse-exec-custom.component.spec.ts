import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaMuseExecCustomComponent } from './la-muse-exec-custom.component';

describe('LaMuseExecCustomComponent', () => {
  let component: LaMuseExecCustomComponent;
  let fixture: ComponentFixture<LaMuseExecCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaMuseExecCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaMuseExecCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
