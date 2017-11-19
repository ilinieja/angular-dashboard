import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import c3 from 'c3';
import justRandomstring  from 'just.randomstring';
import merge from 'merge';

import { CHART_COLORS } from '../constants';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy  {
  public chartElementId: string;

  private chart: any;

  @Input() private chartColors = CHART_COLORS;

  @Input() private chartData: any;

  constructor() {
    this.chartElementId = justRandomstring(8, 'uppercases_lowercases');
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && changes.chartData.currentValue) {
      this.chart.flush();
    }
  }

  ngAfterViewInit() {
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
