import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexoFormComponent } from './anexo-form.component';

describe('AnexoFormComponent', () => {
  let component: AnexoFormComponent;
  let fixture: ComponentFixture<AnexoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnexoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnexoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
