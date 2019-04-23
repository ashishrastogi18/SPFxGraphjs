import * as React from 'react';
import styles from './SpFxCharts.module.scss';
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import { ISpFxChartsProps } from './ISpFxChartsProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
//gulp cleanimport { css } from 'office-ui-fabric-react';
import SPDataSource from '../Services/SPDataSource';
import ISPDataSource from '../Services/SPDataSource';
//const jsChart = require("jsChart");
import { sp } from "@pnp/sp";
import ChartJSData from '../Models/ChartModel';
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import { PropertyPaneSlider } from '@microsoft/sp-property-pane';
export interface IReactSpfxState{  
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [40, 677, 34,57, 49];
    }
  ];
}  
export default class SpFxCharts extends React.Component<ISpFxChartsProps, {}> {
 
  
  

private spHttpClient:SPHttpClient;
  public constructor(props: ISpFxChartsProps, state: IReactSpfxState){  
    super(props); 
     
     
  }  

  public  retrieveData() : void {
    
    var siteurl = this.props.siteurl;
    var spHttpClient = this.props.spHttpClient;
    let items=[];
    let chartJSData = new ChartJSData();
     spHttpClient.get(`${siteurl}/_api/web/lists/getbytitle('Incidents')/items`,
    SPHttpClient.configurations.v1).then((response)=>{
      if(response.ok)
      {
         response.json().then((data)=>{
          items = data.value;
          let indlength = items.filter(d=>d.Country == "India").length;
          let chinalength = items.filter(d=>d.Country == "China").length;
          let uslength = items.filter(d=>d.Country == "United States").length;
          let uklength = items.filter(d=>d.Country == "United Kingdom").length;
         
          chartJSData.dataSetLabel = "Real data set";
          chartJSData.dataLabels = ["Group 1", "Group 2", "Group3", "Group 4"];
          chartJSData.dataValues = [indlength, chinalength,uslength,uklength];
          chartJSData.dataColors = [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA"];
          this.setState({
            labels: chartJSData.dataLabels,
            datasets: [
              {
                label:  chartJSData.dataSetLabel,
                backgroundColor: [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA"],  
              //setting border color of bars  
              borderColor: [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA"] ,  
              //setting border width  
              borderWidth: 1 ,
               
             
                data: chartJSData.dataValues
              }
            ]
          });
        });
        
      }
      
    });
  
  }

  public componentDidMount(){
    
    this.retrieveData();
  }
  
  
  
  //render chart after the chart type is changed on the web part property panel
  /*public componentDidUpdate(): void {
    this.renderChart();
  }*/

    private renderSwitch(param) {
   
  switch(param) {
    case 'Pie':
      return  < Pie 
      
      data = {this.state}
      width={100}

      height={50}
      options={{
        maintainAspectRatio: true,
        scales: {  
          yAxes: [{  
          stacked: true,  
              ticks: {  
                  beginAtZero:true  
              }  
          }]  
      }
      }}

      
    />;
    default:
    return  < Bar 
   
    data = {this.state}
    width={100}

    height={50}
    options={{
      maintainAspectRatio: true,
      scales: {  
        yAxes: [{  
        stacked: true,  
            ticks: {  
                beginAtZero:true  
            }  
        }]  
    }
    }}
  />;
  }
}



  public render(): React.ReactElement<ISpFxChartsProps> {
    return (
  
      <div className={ styles.spFxCharts }>
      <div>{this.props.siteurl}</div>
      
      <div className={ styles.container }>
              <p >dropdowm: {escape(this.props.dropdown)}</p>
              <span className={ styles.title }>Welcome to SPFx webpart with Graphjs integration</span>
          {this.renderSwitch(this.props.dropdown)}
         
        </div>
        </div>
      );
      
      
  }
}



