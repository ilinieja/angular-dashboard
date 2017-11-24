import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import * as c3 from 'c3';
import * as merge from 'merge';

import { CHART_COLORS } from '../constants';
import { Utils } from '../../core/utils';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  public chartElementId: string;

  private chart: any;

  @Input() private chartColors = CHART_COLORS;

  @Input() private chartData: any;

  @Input() private minEntryWidth: number = 60;

  @Input() private minEntriesNumber: number = 5;

  constructor(private elementRef: ElementRef) {
    this.chartElementId = Utils.generateRandomString(8);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && changes.chartData.currentValue) {
      this.chart.flush();
    }
  }

  ngAfterViewInit() {
    const elementWidth =
      this.elementRef.nativeElement.querySelector(`#${this.chartElementId}`).offsetWidth;

    let iterations = 0;
    while (elementWidth / this.chartData.data.columns[0].length - 1 < this.minEntryWidth
    && this.chartData.data.columns[0].length - 1 > this.minEntriesNumber
    && iterations <= 1000) {
      // first element is legend item, we shouldn't remove it
      this.chartData.data.columns.forEach(column => column.splice(1, 1));
      iterations += 1;
    }

    // with flex layout, chart container can be not grown on afterViewInit
    // timeout needed to run init only after flex layout finished
    setTimeout(() => {
      this.chart = c3.generate(merge.recursive(
        {
          bindto: `#${this.chartElementId}`,
          data: {
            type: 'bar',
            colors: this.assignColorsToColumns(this.chartData.data.columns),
          },
          axis: {
            y: {
              padding: {
                top: 10,
              },
            },
            x: {
              height: 20,
            },
          },
          grid: {
            y: {
              show: true,
            },
          },
          legend: {
            padding: 18,
          },
          padding: {
            bottom: 24,
          },
        },
        this.chartData,
      ));
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private assignColorsToColumns(columns) {
    if (!columns) {
      return {};
    }

    const colors = {};

    columns.forEach((column, index) => {
      colors[column[0]] = this.chartColors[index];
    });

    return colors;
  }
}
