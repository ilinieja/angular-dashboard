import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import * as leaflet from 'leaflet/dist/leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  public map: any;
  public mapInitPromise: Promise<any>;
  public loading: boolean = true;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // inherited components need to know when map init is done
    this.mapInitPromise = new Promise((resolve, reject) => {
      // without timeout layout can be unfinished and map will init in wrong size
      setTimeout(() => {
        const mapElem = this.elementRef.nativeElement.querySelector('.map');
        this.map = leaflet.map(mapElem, {
          center: [48.20, 16.37],
          zoom: 3,
          scrollWheelZoom: false,
          zoomControl: false,
        });

        leaflet.control.zoom({
          position: 'topright',
        }).addTo(this.map);

        leaflet.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
          {
            // tslint:disable-next-line
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
          },
        ).addTo(this.map);

        resolve();
      });
    });

    this.mapInitPromise.then(() => {
      this.loading = false;
    });
  }

  ngOnDestroy() {
  }
}
