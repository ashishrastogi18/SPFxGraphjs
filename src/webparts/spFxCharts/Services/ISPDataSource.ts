import ChartJSData from '../Models/ChartModel';
import { SPHttpClient } from '@microsoft/sp-http';

/*
 * IDataSource interface - need to be implemented by all the DataSource classes
 * used for the Chart web part, such as MockDataSource, SharePointDataSource, and
 * ExcelDataSource
 */
export interface ISPDataSource {
    getData(spHttpClient: SPHttpClient, siteurl : string):ChartJSData;
    
}