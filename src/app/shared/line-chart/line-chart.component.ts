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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
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
          axis: {
            y: {
              inner: true,
            },
            x: {
              height: 50,
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
          data: {
            type: 'spline',
            colors: this.assignColorsToColumns(this.chartData.data.columns),
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
