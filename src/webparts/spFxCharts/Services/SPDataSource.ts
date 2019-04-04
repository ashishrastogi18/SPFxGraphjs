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
            const chartJSData = new ChartJSData();
            chartJSData.dataSetLabel = "Real data set";
            chartJSData.dataLabels = ["Group 1", "Group 2", "Group3", "Group 4"];
            
            chartJSData.dataColors = [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA"];
         
          this.getToDosAsync(spHttpClient,siteurl).then((mydata)=>{
            chartJSData.dataValues = mydata.dataValues;

          });
          if(chartJSData.dataValues.length !=0)
          return chartJSData;
           //this.getContacts();
           
     
         
            //return this.getMockData();
         }  
        
    }
   
    private async getToDosAsync(spHttpClient,siteurl):Promise<ChartJSData> {
      let region = ['India','China','United States','United Kingdom'];
      let items=[];
      let records=[];
      await spHttpClient.get(`${siteurl}/_api/web/lists/getbytitle('Incidents')/items`,
      SPHttpClient.configurations.v1).then(async(response)=>{
        if(response.ok)
        {
          await response.json().then((data)=>{
            items = data.value;
          });
        }
      });
      let ind =0;
      let ch=0;
      let us = 0;
      let uk = 0;

      items.filter(function (record) {
        
       
        if(record.country = "India")
        {
            ind ++;
            
        }
        if(record.country = "China")
        {
             ch ++;
            
        }
        if(record.country = "United States")
        {
             us ++;
            
        }
        if(record.country = "United Kingdom")
        {
             uk ++;
            
        }
       
        records[1] = ind;
        records[2] = ch;
        records[3] = us;
        records[4] = uk;
      });
      const chartJSData = new ChartJSData();
      chartJSData.dataSetLabel = "Real data set";
      chartJSData.dataLabels = ["Group 1", "Group 2", "Group3", "Group 4"];
      chartJSData.dataValues = [parseInt(records[1]), parseInt(records[2]),parseInt(records[3],parseInt(records[4]))];
      chartJSData.dataColors = [ "#FF6384", "#4BC0C0", "#FFCE56", "#82E0AA"];
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


