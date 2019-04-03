import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,   
  PropertyPaneLabel,      
  PropertyPaneLink,       
  PropertyPaneSlider,     
  PropertyPaneToggle,    
  PropertyPaneDropdown   
} from '@microsoft/sp-property-pane';
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import * as strings from 'SpFxChartsWebPartStrings';
import SpFxCharts from './components/SpFxCharts';
import { ISpFxChartsProps } from './components/ISpFxChartsProps';

import ChartModel from './Models/ChartModel';

export interface ISpFxChartsWebPartProps {
  description: string;
  Slider:string;
  Toggle:string;
  dropdowm:string;
  checkbox:string;
  URL:string;
  textbox:string;
  siteurl : string;
  listName: string;
  spHttpClient: SPHttpClient;
}

export default class SpFxChartsWebPart extends BaseClientSideWebPart<ISpFxChartsWebPartProps> {
  

  public render(): void {
    const element: React.ReactElement<ISpFxChartsProps > = React.createElement(
      SpFxCharts,
      {
        description: this.properties.description,
        Slider : this.properties.Slider,
        Toggle: this.properties.Toggle,
        dropdown : this.properties.dropdowm,
        checkbox : this. properties.checkbox,
        URL : this.properties.URL,
        textbox: this.properties.textbox,
        siteurl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
       
        
      },
      
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        },
        { //Page 2
                    header: {
                      description: "Page 2 – Slider and Dropdown"
                    },
                    groups: [
                      {
                        groupName: "Group one",
                        groupFields: [
                          PropertyPaneSlider('Slider', {
                            label:'Slider',min:1,max:10
                          }),
                          PropertyPaneToggle('Toggle', {
                          label: 'Slider'
                          })
                        ]
                      },
                      {
                        groupName: "Group Two",
                        groupFields: [
                          PropertyPaneDropdown('dropdowm', {
                            label:'Drop Down',
                            options: [
                              { key: 'Pie', text: 'Pie' },
                              { key: 'Bar', text: 'Bar' },
                             
                            ]
                          }),
                          PropertyPaneCheckbox('checkbox',
                            { text: 'Yes/No'})
                        ]
                      }
                    ]
                  }
      ]
    };
  }
}
