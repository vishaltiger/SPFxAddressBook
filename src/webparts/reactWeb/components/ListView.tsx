import * as React from 'react';
import { IReactWebProps } from './IReactWebProps';
import "./../../../../lib/Styles/Custom.css";
import { IconButton, } from 'office-ui-fabric-react/lib';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Service } from './service/service';
import { listDisplay, ListItemModel } from './Modal/modal';


export interface Props {
    route: any,
    selectedIndex: string,
    setIndex: any
    ListItems: listDisplay[],
    deleteItem: Function
}

export interface IReactWebState {
    display: boolean
}
export default class ListView extends React.Component<Props, IReactWebState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            display: false
        }
        this._columns = [
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column3', name: 'Mobile', fieldName: 'mobile', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column4', name: 'ContactType', fieldName: 'ctype', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column5', name: 'Address', fieldName: 'address', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column6', name: 'status', fieldName: 'status', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column7', name: 'StatusChecked', fieldName: 'statusChecked', minWidth: 100, maxWidth: 200, isResizable: true },

        ];

        this.deleteContact = this.deleteContact.bind(this);
        this.onSelectionButtonShow = this.onSelectionButtonShow.bind(this);
        this._selection = new Selection({
            onSelectionChanged: () => {
                if (this._selection.getSelection()[0] as ListItemModel != undefined) {
                    var id = (this._selection.getSelection()[0] as ListItemModel).id;
                    this.props.setIndex(id.toString());
                    this.onSelectionButtonShow(true);
                } else {
                    this.onSelectionButtonShow(false);
                }
            }
        });
    }
    onSelectionButtonShow(bool) {
        this.setState({ display: bool });
    }

    public service = new Service();
    private _columns: IColumn[];
    private _selection: Selection;
    private EditIcon: IIconProps = { iconName: 'EditContact' };
    private DeleteIcon: IIconProps = { iconName: 'Delete' };
    private refresh: IIconProps = { iconName: 'Refresh' };
    private addIcon: IIconProps = { iconName: 'Add' };

    async deleteContact() {
        var ob = await this.service.Delete(this.props.selectedIndex);
        if (ob != undefined) {
            this.props.deleteItem();
        }
    } public render(): React.ReactElement<IReactWebProps> {
        const { route } = this.props;
        return (
            <div>
                <div id="ListView">
                    <div className="header">
                        <p>Contact List</p>
                    </div>
                    <div className="SecNav">
                        <IconButton
                            id="AddValue"
                            className="icon"
                            iconProps={this.addIcon}
                            onClick={() => route('Form')}
                        />
                        <IconButton onClick={() => route('Edit')} className="icon" id="EditValue" style={{ display: this.state.display ? 'inline' : 'none' }} iconProps={this.EditIcon} />
                        <IconButton onClick={this.deleteContact} className="icon" id="DeleteValue" style={{ display: this.state.display ? 'inline' : 'none' }} iconProps={this.DeleteIcon} />
                    </div>
                    <DetailsList
                        items={this.props.ListItems}
                        columns={this._columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </div>
            </div>
        );
    }
}

