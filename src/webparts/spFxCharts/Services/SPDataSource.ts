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
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export default class SPDataSource implements ISPDataSource {
 

    
    public getData(): ChartJSData {
     
        if (Environment.type === EnvironmentType.Local) 
        {  
            debugger;

           return this.getMockData();
            } 
           
           else 
           {  
            debugger;
         
         
           //this._getListData();
           //this.getContacts();
          
            return this.getMockData();
         }  
        
    }
    

    public getData1(): void {
        if (Environment.type === EnvironmentType.Local) 
        {  
            

          
            } 
           
           else 
           {  
            
             this.getMockData();
         }  
        
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


