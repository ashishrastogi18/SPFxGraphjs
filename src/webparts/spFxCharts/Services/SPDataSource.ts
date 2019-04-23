import {ISPDataSource} from './ISPDataSource';
import ChartJSData from '../Models/ChartModel';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';

import {  
    Environment,  
    EnvironmentType  
  } from '@microsoft/sp-core-library';   
import ChartModel from '../Models/ChartModel';

export default class SPDataSource implements ISPDataSource {
 

    
    public getData(spHttpClient: SPHttpClient, siteurl : String): ChartJSData {
     
        if (Environment.type === EnvironmentType.Local) 
        {  
            debugger;

           return this.getMockData();
            } 
           
           else 
           {  
            debugger;
           
         
         /*  this.getToDosAsync(spHttpClient,siteurl).then(async(mydata)=>{
                await mydata.dataValues;
                const chartJSData = new ChartJSData();
                chartJSData.dataSetLabel = "Real data set";
                chartJSData.dataLabels = ["Group 1", "Group 2", "Group3", "Group 4"];
                
                chartJSData.dataColors = [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA"];
                chartJSData.dataValues = mydata.dataValues;
                if (chartJSData != undefined)
            return chartJSData; 
          });*/
          
           //this.getContacts();
           
          return this.getToDosAsync(spHttpClient,siteurl);
         
            //return this.getMockData();
         }  
        
    }
   
    public  getToDosAsync(spHttpClient,siteurl):ChartJSData {
     
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
            return chartJSData;
          });
          
        }
        
      });
     if(chartJSData.dataValues != undefined)
      return chartJSData;
    }
 
    public getMockData():ChartJSData {

        const chartJSData = new ChartJSData();
        chartJSData.dataSetLabel = "Sample data set";
        chartJSData.dataLabels = ["Group 1", "Group 2", "Group3", "Group 4", "Group 5"];
        chartJSData.dataValues = [45, 677, 34,57, 49];
        chartJSData.dataColors = [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA", "#36A2EB"];

        return chartJSData;
    }

    private _renderList(items: ChartModel[]): void {  
        items.forEach((item: ChartModel) => {  
          
          });  
    }
  
  //end of class  
}


