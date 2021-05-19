import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import {
  SPHttpClient, HttpClient,
} from '@microsoft/sp-http';
import { listDisplay, ListItemModel } from "../Modal/modal";
import { ValidateEmail, Validatephonenumber } from "../Utility/utility";
import { ListName, AutomateUrl, siteUrl } from "../Site Credential/Site";
export class Service {

  public async Add(obj) {
    if (ValidateEmail(obj.email) && Validatephonenumber(obj.mobile)) {
      var check: string = obj.toggle;
      var Ctype: string = obj.ctype;
      var res;
      var choice: boolean;
      if (obj.name.length != 0 && obj.email.length != 0) {
        if (check == "Yes") {
          choice = true;
        } else {
          choice = false;
        }
        const body: string = JSON.stringify({
          'Name': obj.name,
          'Email': obj.email,
          'Mobile': Number(obj.mobile),
          'Favorite': choice,
          'ContactType': Ctype,
          'Address': obj.address,
        });
        if (obj.currentScreen == "Edit") {
          console.log(obj.currentScreen);
          var editI = Number(obj.selectedIndex);
          var item: ListItemModel;
          var web = Web(siteUrl);

          //pnp fetching 
          res = await web.lists.getByTitle(ListName).items.getById(editI).update({
            'Name': obj.name,
            'Email': obj.email,
            'Mobile': Number(obj.mobile),
            'Favorite': choice,
            'ContactType': Ctype,
            'Address': obj.address,
          }).then((data) => {
            console.log(data);
            item = { id: obj.selectedIndex, name: obj.name, email: obj.email, mobile: obj.mobile, address: obj.address, ctype: obj.ctype, url: "" };
            return item;
          });
        } else {
          console.log(obj.currentScreen);
          var url = AutomateUrl;
          //sphttpclient 
          res = await obj.client.post(url, HttpClient.configurations.v1, {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=nometadata',
              'odata-version': ''
            }, body: body
          }).then((response) => {
            console.log(response);
            return body;
          })
        }
      }
      console.log(res);
      return res;
    }
  }

  public async Delete(selectedIndex) {
    console.log("hello");
    var editI = JSON.parse(selectedIndex);
    var web = Web(siteUrl);
    var res = await web.lists.getByTitle(ListName).items.getById(editI).delete();
    return res;
  }

  public loadItems(spclient) {
    var item: listDisplay;
    console.log(ListName);
    let clienturl: string = siteUrl + "/_api/web/lists/GetByTitle('" + ListName + "')/items";
    console.log(clienturl);
    var res = spclient.get(clienturl, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      }).then(data => data.value);
    return res;
  }

}
