import * as React from 'react';
import { IReactWebProps } from './IReactWebProps';
import { FormState, listDisplay } from "./Modal/modal";
import "./../../../../lib/Styles/Custom.css";
import { TextField, PrimaryButton, Toggle, IDropdownOption, Dropdown, FontIcon, mergeStyles } from 'office-ui-fabric-react/lib';
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { Service } from './service/service';

const options: IDropdownOption[] = [
  { key: 'Friends', text: 'Friends' },
  { key: 'Family', text: 'Family' },
  { key: 'Work', text: 'Work' },
  { key: 'Home', text: 'Home' }
];

const iconClass = mergeStyles({
  fontSize: 8,
  height: 6,
  width: 6,
  color: 'red'
});
export interface IReactWebState {
  items: FormState;
}
export interface Props {
  route: any,
  url: string,
  spcontext: any,
  setData: Function,
  httpclient: any,
  currentScreen: string,
  selectedIndex: string,
  getdata: any
}

export default class AddForm extends React.Component<Props, IReactWebState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      items: { name: "", email: "", mobile: "", address: "", ctype: "", toggle: "" }
    }
    this.AddContact = this.AddContact.bind(this);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this._onChange = this._onChange.bind(this);
    this.setFormData = this.setFormData.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
  }
  private onSelectionChanged(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
    var items = { ...this.state.items };
    items.ctype = item.text;
    this.setState({ items });
  }

  public service = new Service();

  _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    var items = { ...this.state.items };
    if (checked) {

      items.toggle = "Yes";
      this.setState({ items });
    } else {
      items.toggle = "No";
      this.setState({ items });
    }
  }

  async AddContact() {
    var Itemob: listDisplay;
    var itemOb = {
      name: this.state.items.name,
      email: this.state.items.email,
      mobile: this.state.items.mobile,
      address: this.state.items.address,
      ctype: this.state.items.ctype,
      toggle: this.state.items.toggle,
      url: this.props.url,
      client: this.props.spcontext,
      currentScreen: this.props.currentScreen,
      selectedIndex: this.props.selectedIndex
    }
    console.log(itemOb);
    var ob = await this.service.Add(itemOb);
    if (ob != undefined) {
      if (typeof (ob) == "string") {
        ob = JSON.parse(ob);
      }
      Itemob = { id: ob.ID, name: ob.Name, email: ob.Email, mobile: ob.Mobile, address: ob.Address, ctype: ob.ContactType, status: "Under Review", statusChecked: "" };
      var status = await this.props.setData();
      this.props.route('ListView');
    }
  }
  handleEventChange(e) {
    var items = { ...this.state.items };
    items[e.target.name] = e.target.value;
    this.setState({ items });
  }
  setFormData() {
    var arr = this.props.getdata();
    console.log(arr);
    if (arr[0] != undefined) {
      var items = { ...this.state.items };
      items.name = arr[0].name;
      items.email = arr[0].email;
      items.mobile = arr[0].mobile;
      items.ctype = arr[0].ctype;
      if (arr[0].address == null) {
        items.address = "N/A";
      } else {
        items.address = arr[0].address;
      }
      this.setState({ items });
    }

  }
  componentDidMount() {
    if (this.props.selectedIndex != undefined || this.props.selectedIndex != null || this.props.selectedIndex.length != 0) {
      this.setFormData();
    }

  }

  public render(): React.ReactElement<IReactWebProps> {
    const { route } = this.props;
    return (
      <div>
        <div id="FormData">
          <div className="header">
            <p>Contact Form</p>
          </div>
          <label>
            Name<FontIcon iconName="Asterisk" className={iconClass}></FontIcon>
          </label>
          <TextField placeholder="Enter Name" className="input" id="Tname" name="name" value={this.state.items.name} onChange={this.handleEventChange}>
          </TextField>
          <label>
            Email<FontIcon iconName="Asterisk" className={iconClass}></FontIcon>
          </label>
          <TextField placeholder="Enter Email" className="input" id="Temail" value={this.state.items.email} name="email" onChange={this.handleEventChange}></TextField>
          <label>
            Mobile<FontIcon iconName="Asterisk" className={iconClass}></FontIcon>
          </label>
          <TextField placeholder="Enter Mobile" className="input" id="Tmobile" value={this.state.items.mobile} name="mobile" onChange={this.handleEventChange}></TextField>
          <Toggle label="Favorite" id="toggle" defaultChecked onText="Yes" offText="No" onChange={this._onChange} />
          <Dropdown
            className="input"
            placeholder="Contact Type"
            options={options}
            onChange={this.onSelectionChanged}
          />
          <input type="file" id="uploadFile" />
          <TextField placeholder="Enter Address" multiline autoAdjustHeight id="Tadd" value={this.state.items.address} name="address" onChange={this.handleEventChange}></TextField>
          <div id="buttonGrp">
            <PrimaryButton text="Submit" id="Add" allowDisabledFocus onClick={this.AddContact} className="submit" />
            <PrimaryButton text="Cancel" id="Cancel" allowDisabledFocus onClick={() => route('ListView')} style={{ display: "inline" }} className="submit" />
          </div>
        </div>
      </div>
    );
  }
}

