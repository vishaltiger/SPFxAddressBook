export interface ListItemModel {
    id: string
    name: string,
    email: string,
    mobile: string,
    address: string,
    ctype: string,
    url: string
}
export interface listDisplay {
    id: string
    name: string,
    email: string,
    mobile: string,
    address: string,
    ctype: string,
    status: string,
    statusChecked: string
}
export interface FormState{
    name:string,
    email:string,
    mobile:string,
    address:string,
    ctype:string,
    toggle:string
}