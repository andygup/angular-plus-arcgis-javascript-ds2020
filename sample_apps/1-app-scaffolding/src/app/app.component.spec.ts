import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { EsriMapComponent } from "./esri-map/esri-map.component";

describe("AppComponent", () => {
  let fixture;
  let app;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, EsriMapComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it("should create the app", async(() => {
    expect(app).toBeTruthy();
  }));

  it("should set zoom level", async(() => {
    expect(app.mapZoomLevel).toEqual(jasmine.any(Number));
  }));

  it("should set basemap type", async(() => {
    expect(app.basemapType).toEqual(jasmine.any(String));
    expect(app.basemapType).toEqual("satellite");
  }));

  it("should set map center location", async(() => {
    expect(app.mapCenter).toEqual(jasmine.any(Array));
    expect(app.mapCenter.length).toEqual(2);
  }));

  it("zoom has a default value", async(() => {
    expect(app.mapZoomLevel).toBeGreaterThanOrEqual(0);
    expect(app.mapZoomLevel).toBeLessThanOrEqual(24);
  }));
});
