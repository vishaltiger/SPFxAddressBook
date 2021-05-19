import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as strings from 'ReactWebWebPartStrings';
import ReactWeb from './components/ReactWeb';
import "@pnp/sp/attachments";
import { IReactWebProps } from './components/IReactWebProps';


export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
}

export default class ReactWebWebPart extends BaseClientSideWebPart<IReactWebProps> {
  constructor() {
    super();
  }
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    })
  }

  public render(): void {
    const element: any = React.createElement(
      ReactWeb, {
      spHttpClient: this.context.spHttpClient,
      url: this.context.pageContext.web.absoluteUrl,
      httpclient: this.context.httpClient
    }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
        }
      ]
    };
  }
}
