import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  public fromDate: string = '';
  public toDate: string = '';
  public tableData: any[];
  constructor(private _dataService: DataService) {
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  // lineChart
  public barChartData: Array<any> = [
    { data: [], label: 'Doanh thu' },
    { data: [], label: 'Lợi nhuận' },
  ];
  public barChartLabels: Array<any> = [];
  
  public barChartOptions: any = {
    responsive: true
  };
 
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
    this.loadRevenues();
  }
  refreshChart() {
    setTimeout(() => {

      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chart.chart.config.data.labels = this.barChartLabels;
        this.chart.chart.config.data.datasets = this.barChartData;
        this.chart.chart.update();
      }
    });
  }
  loadRevenues() {
    $('.preloader').show();
    this._dataService.get('/api/statistic/getrevenue?fromDate=' + this.fromDate + '&toDate=' + this.toDate)
      .subscribe((response: any[]) => {
        this.barChartLabels = [];
        this.barChartData = [];
        var revenue = { data: [], label: 'Doanh thu',backgroundColor:'rgba(238, 83, 79, 1)' };
        var benefit = { data: [], label: 'Lợi nhuận',backgroundColor:'rgba(112, 190, 78, 1)' };
        this.tableData = [];
        for (let item of response) {
          revenue.data.push(item.Revenues);
          benefit.data.push(item.Benefit);
          this.barChartLabels.push(moment(item.Date).format('DD/MM/YYYY'));
          //push to table
          this.tableData = response;
         
        }
        this.barChartData.push(revenue);
        this.barChartData.push(benefit);
        $('.preloader').hide();
        this.refreshChart();
      });

  }

}