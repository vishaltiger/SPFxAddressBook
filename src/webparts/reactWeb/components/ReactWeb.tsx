import * as React from 'react';
import { IReactWebProps } from './IReactWebProps';
import "./../../../../lib/Styles/Custom.css";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import AddForm from './Form';
import ListView from './ListView';
import { Service } from './service/service';
import { listDisplay } from './Modal/modal';


export interface IReactWebState {
    ListItems: listDisplay[],
    index: string,
    currentScreen: string
}
export default class ReactWeb extends React.Component<IReactWebProps, IReactWebState> {
    private Ser = new Service();
    constructor(props: IReactWebProps) {
        super(props);
        this.state = {
            ListItems: [],
            index: "",
            currentScreen: "ListView"
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.setData = this.setData.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.route = this.route.bind(this);
        this.getSelectedIndexedData = this.getSelectedIndexedData.bind(this);
    }
    setData() {
        this.fetchData();
    }
    getSelectedIndexedData(){
    var arr = this.state.ListItems.filter(d=>d.id==this.state.index);
    return arr;
    }
    async fetchData() {
        var item: listDisplay;
        var arr = [];
        var data = await this.Ser.loadItems(this.props.spHttpClient);
        console.log(data);
        data.forEach(ob => {
            console.log(ob);
            item = { id: ob.ID, name: ob.Name, email: ob.Email, mobile: ob.Mobile, address: ob.Address, ctype: ob.ContactType, status: ob.status, statusChecked: ob.StatusChecked };
            arr.push(item);
            console.log(item);
        });
        this.setState({ ListItems: arr });
    }
    async componentDidMount() {
        this.fetchData();
    }
    setIndex(index) {
        this.setState({ index });
    }
    deleteItem() {
        var arr = this.state.ListItems;
        arr = arr.filter((item) => {
            return item.id != this.state.index;
        })
        this.setState({ ListItems: arr });
    }
    route(screen) {
        console.log(screen);
        this.setState({ currentScreen: screen });
    }
    public render(): React.ReactElement {
        return (
            <div>
                {
                    this.state.currentScreen == "Form" ? <AddForm selectedIndex={this.state.index} setData={this.setData} currentScreen={this.state.currentScreen} route={this.route} url={this.props.url} spcontext={this.props.spHttpClient} httpclient={this.props.httpclient} getdata={this.getSelectedIndexedData} />
                        :
                        (
                            this.state.currentScreen == "ListView" ? <ListView ListItems={this.state.ListItems} setIndex={this.setIndex} selectedIndex={this.state.index} route={this.route} deleteItem={this.deleteItem} /> :
                                (
                                    this.state.currentScreen == "Edit" ? <AddForm selectedIndex={this.state.index} setData={this.setData} currentScreen={this.state.currentScreen} route={this.route} url={this.props.url} spcontext={this.props.spHttpClient} httpclient={this.props.httpclient} getdata={this.getSelectedIndexedData}/> :
                                        <p>error</p>
                                )

                        )
                }
            </div>
        );
    }
}

