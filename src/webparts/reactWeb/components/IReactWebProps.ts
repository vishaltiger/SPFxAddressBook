import {SPHttpClient,HttpClient} from '@microsoft/sp-http';

export interface IReactWebProps{
  spHttpClient: SPHttpClient;
  url:string,
  httpclient:HttpClient
  }




