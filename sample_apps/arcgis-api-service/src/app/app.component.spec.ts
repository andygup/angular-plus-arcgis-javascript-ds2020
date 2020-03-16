import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EsriMapService } from './esri-map/esri-map.service';

describe('AppComponent', () => {
  let fixture, app;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EsriMapComponent
      ],
      providers: [EsriMapService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should set zoom level', async(() => {
    expect(app.mapZoomLevel).toEqual(jasmine.any(Number));
  }));

  it('should set basemap type', async(() => {
    expect(app.basemapType).toEqual(jasmine.any(String));
    expect(app.basemapType).toEqual('satellite');
  }));

  it('should set map center location', async(() => {
    expect(app.mapCenter).toEqual(jasmine.any(Array));
    expect(app.mapCenter.length).toEqual(2);
  }));
});
