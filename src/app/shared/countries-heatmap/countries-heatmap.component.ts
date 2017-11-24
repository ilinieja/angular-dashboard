import {
  Component,
  Input,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as leaflet from 'leaflet/dist/leaflet';

import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-countries-heatmap',
  templateUrl: '../map/map.component.html',
  styleUrls: ['./countries-heatmap.component.scss', '../map/map.component.scss'],
})
// tslint:disable-next-line
export class CountriesHeatmapComponent extends MapComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  private countriesGeoJson: any;
  private geoJsonLayer: any;
  private mapInfoControl: any;

  @Input() private colorValuesMapping = {
    '#D8ECFD': 100,
    '#C5E3FC': 200,
    '#8BC7F9': 500,
    '#64B5F7': 700,
    '#51ABF6': 800,
    '#2196F3': 1000,
  };

  @Input() private dataByCountry: any;

  constructor(elementRef: ElementRef, private http: HttpClient) {
    super(elementRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataByCountry.currentValue) {
      this.updateGeoJsonLayer();
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.mapInitPromise.then(() => {
      this.loading = true;

      // tslint:disable-next-line
      const geoJsonUrl = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
      this.http.get(geoJsonUrl)
        .subscribe((data) => {
          this.countriesGeoJson = data;

          this.mapInfoControl = leaflet.control({ position: 'topleft' });

          // need to use component this along with function's one
          // tslint:disable-next-line
          const componentThis = this;

          this.mapInfoControl.onAdd = function (map) {
            this._div = leaflet.DomUtil.create('div', 'map-info-control');
            this.update();
            return this._div;
          };

          this.mapInfoControl.update = function (props) {
            let infoContent = '<h2 class="map-info-control-title">Purchases by country</h2>';

            if (props) {
              infoContent =
                `${infoContent}
                <br/>
                <span class="map-info-control-content">
                  ${props.ADMIN}: ${componentThis.dataByCountry[props.ISO_A3] || 0}
                </span>`;
            } else {
              infoContent = `${infoContent}
              <br/>
              <span class="map-info-control-content">
                Hover over a country
              </span>`;
            }


            this._div.innerHTML = infoContent;
          };

          this.mapInfoControl.addTo(this.map);

          // looks like helps to prevent ui blocking in case geoJson processing is heavy
          // todo: run deeper performance test of this approach
          setTimeout(() => {
            this.geoJsonLayer = leaflet.geoJson(this.countriesGeoJson, {
              style: this.getGeoJsonFeatureStyle.bind(this),
              onEachFeature: this.getFeatureBehavior.bind(this),
            }).addTo(this.map);

            this.map.setMaxBounds(this.geoJsonLayer.getBounds());
            this.map.setMinZoom(2);
            this.loading = false;
          });
        });
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private updateGeoJsonLayer() {
    if (!this.geoJsonLayer) {
      return;
    }

    // reload same geoJson because its styling function
    // will update heatmap colors with updated countries data
    this.geoJsonLayer.clearLayers();
    this.geoJsonLayer.addData(this.countriesGeoJson);
  }

  private getGeoJsonFeatureStyle(feature) {
    return {
      fillColor: this.getGeoJsonFeatureColor(feature),
      weight: 0.3,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8,
    };
  }

  private getGeoJsonFeatureColor(feature) {
    let color = 'rgba(0,0,0,0)';

    if (!this.dataByCountry) {
      return color;
    }

    const countryValue = this.dataByCountry[feature.properties.ISO_A3];

    Object.keys(this.colorValuesMapping).forEach((colorFromMap) => {
      if (countryValue >= this.colorValuesMapping[colorFromMap]) {
        color = colorFromMap;
      }
    });

    return color;
  }

  getFeatureBehavior(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetFeatureHighlight.bind(this),
      click: this.zoomToFeature.bind(this),
    });
  }

  private highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      fillColor: '#0B7AD5',
    });

    if (!leaflet.Browser.ie && !leaflet.Browser.opera && !leaflet.Browser.edge) {
      layer.bringToFront();
    }

    this.mapInfoControl.update(layer.feature.properties);
  }

  private resetFeatureHighlight(e) {
    this.geoJsonLayer.resetStyle(e.target);
    this.mapInfoControl.update();
  }

  private zoomToFeature(e) {
    this.map.fitBounds(e.target.getBounds());
  }
}
