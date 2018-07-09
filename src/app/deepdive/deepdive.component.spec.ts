import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeepdiveComponent } from "./deepdive.component";

describe("DeepdiveComponent", () => 
{
  let component: DeepdiveComponent;
  let fixture: ComponentFixture<DeepdiveComponent>;

  beforeEach(async(() => 
  {
    TestBed.configureTestingModule({
      declarations: [DeepdiveComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(DeepdiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => 
  {
    expect(component).toBeTruthy();
  });
});
