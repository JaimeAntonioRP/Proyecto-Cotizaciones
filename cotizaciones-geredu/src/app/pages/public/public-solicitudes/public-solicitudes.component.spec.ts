import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSolicitudesComponent } from './public-solicitudes.component';

describe('PublicSolicitudesComponent', () => {
  let component: PublicSolicitudesComponent;
  let fixture: ComponentFixture<PublicSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicSolicitudesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
