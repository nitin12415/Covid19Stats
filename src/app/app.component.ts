import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiTalkService } from './services/api-talk.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19stats';
  status: boolean = false;
  states: any;
  selectedState: any;
  selectedDistrict: any;
  stateCode:any={
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CT": "Chhattisgarh",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TG": "Telangana",
    "TR": "Tripura",
    "UT": "Uttarakhand",
    "UP": "Uttar Pradesh",
    "WB": "West Bengal",
    "AN": "Andaman and Nicobar Islands",
    "CH": "Chandigarh",
    "DH": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DN": "Dadra and Nagar Haveli and Daman and Diu",
    "DL": "Delhi",
    "LD": "Lakshadweep",
    "PY": "Puducherry",
    "LA": "Ladakh"
  }
  // @ViewChild('chart') chart:any;
  public ctx: any
  public chartData:any[]=[]
  type: any= 'scatter'
  
  constructor(private apiTalk: ApiTalkService){}
  
  async ngOnInit(){
    await this.getStates()
  }

  clickEvent(){
      this.status = !this.status;       
  }
  
  getStates() {    
    return this.apiTalk
    .getData("https://data.covid19india.org/v4/min/data.min.json")
    .then(async (res) => {
      this.states = res['json'];
      this.selectedState= this.states['AN']
      const arrayOfObj = Object.entries(this.selectedState?.districts).map((e) => ( { [e[0]]: e[1] } ));
      for(let i=0 ; i< arrayOfObj.length; i++){
        
        let points: any= (Object.values(arrayOfObj[i]));
        
        let obj= {
          x: points[0].total.vaccinated1,
          y: points[0].total.vaccinated2,
          district: Object.keys(arrayOfObj[i])[0]
        }        
        this.chartData.push(obj)
      }
      console.log(this.chartData);
      this.buildChart(this.chartData);
    });
  }

  buildChart(chartData:any) { 
    let ctx = document.getElementById('myChart') as HTMLCanvasElement;

    this.ctx = new Chart(ctx, {
      type: this.type,
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: chartData,
          backgroundColor: 'rgb(255, 99, 132)'
        }],
      },
      options: {
        tooltips: {
          callbacks: {
             label: function(tooltipItem: any, data: any) {
                var label = data.district[tooltipItem.index];
                console.log(label);
                
                return 'District: '+ label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
             }
          }
       },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      },
   });
  }

  async selectState(stateCode:any){    
    this.selectedState= this.states[stateCode]    
    this.chartData=[];
    const arrayOfObj = Object.entries(this.selectedState?.districts).map((e) => ( { [e[0]]: e[1] } ));
      for(let i=0 ; i< arrayOfObj.length; i++){
        
        let points: any= (Object.values(arrayOfObj[i]));
        
        let obj= {
          x: points[0].total.vaccinated1,
          y: points[0].total.vaccinated2,
          district: Object.keys(arrayOfObj[i])[0]
        }        
        this.chartData.push(obj)
      }
      await this.ctx.destroy();
      await this.buildChart(this.chartData);
  }

  showData(data: any){
    this.selectedDistrict= data;
  }
}
