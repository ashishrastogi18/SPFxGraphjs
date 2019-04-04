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
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
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
 
  
 
  public constructor(props: ISpFxChartsProps, state: IReactSpfxState){  
    super(props); 
      this.state ={
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [40, 677, 34,57, 49]
        }
      ]
    };
  }  

  /*private renderChart():void {

    //read data from the data source
    
    var spDataSource = new SPDataSource();
    var chartJSData = spDataSource.getData();
    this.setState({
      
      datasets: [
        {
          
          //data: chartJSData.dataValues
        }
      ]
    });
    
  }*/

  public componentDidMount(){
    
   var spDataSource = new SPDataSource();
    var chartJSData = spDataSource.getData(this.props.spHttpClient, this.props.siteurl);
   
    

   
    this.setState({
      
      datasets: [
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: chartJSData.dataValues
        }
      ]
    });
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
        maintainAspectRatio: true
      }}
    />;
    default:
    return  < Bar 
   
    data = {this.state}
    width={100}

    height={50}
    options={{
      maintainAspectRatio: true
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



