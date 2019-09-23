import React, { Component } from 'react';
import {FileUpload} from 'primereact/fileupload';

import {DataTable} from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AddData from './AddData';
import axios from 'axios';

export default class Table extends Component {

    constructor () {
        super();
        this.state={
            coordinates: [{
                stn: "",
                northing: "",
                easting: "",
            }],
        };
        this.adddata = new AddData();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onCoordinateSelect=this.onCoordinateSelect.bind();
        this.addNew = this.addNew.bind(this);
        
    }

     adddata = () => {

    }
    componentDidMount() {
        axios.get('showcase/resources/data/cars-medium.json').then(res => this.setState({coordinates: res.data}));
    }
    
    save() {
        let coordinates = [...this.state.coordinates];
        if (this.newCoordinate)
            coordinates.push(this.state.coordinate);
        else
        coordinates[this.findSelectedCoordinateIndex()] = this.state.coordinate;

        this.setState({coordinates:coordinates, findSelectedCoordinate:null, data:null, displayDialog:false}); 
    }
   
    delete() {
        let index = this.findSelectedCoordinateIndex();
        this.setState({
            coordinates: this.state.coordinates.filter((val,i) => i !== index),
            selectedCoordinate:  null ,
            coordinate: null, 
            displayDialog: false});
    }
    
    findSelectedCoordinateIndex(){
        return this.state.coordinates.indexOf(this.state.selectedCoordinate);
    }

    updateProperty (property, value) {
        let coordinate = this.state.coordinate;
        coordinate[property] = value;
        this.setState({coordinate: coordinate});
    }

    onCoordinateSelect(e){
        this.newCoordinate = false;
        this.setState({
            displayDialog: true,
            coordinate: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newCoordinate = true;
        this.setState({
            coordinate: {stn:'', easting: '', northing: '', color: ''},
            displayDialog: true
        });
    }

   
    render() {

        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}> Coordinates </div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add Data Manually" icon="pi pi-plus" onClick={this.addNew}/> 
            <Button style={{float:'right'}} label="Delete Data" icon="pi pi-times" onClick={this.delete}/>
            
            <FileUpload name="demo" url="./upload" mode="basic" label="Add File"></FileUpload>
        </div>;
        

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                
                <Button label="Save" icon="pi pi-check" onClick={this.save}/>
            </div>;

        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h1>Add Data</h1>
                        <p>Add the Station ID, Easting and Northing in meter</p>
                   </div>
                </div>
                <div className="content-section implementation">
                    <DataTable value={this.state.coordinates}  header={header} footer={footer}
                    selectionMode="single" selection={this.state.selectedCoordinate} onSelectionChange={e => this.setState({selectedCoordinate: e.value})}
                    onRowSelect={this.onCoordinateSelect}>
                        <Column field="stn" header="STN"  />
                        <Column field="easting" header="Easting(m)" />
                        <Column field="northing" header="Northing(m)" />
                        
                    </DataTable>
 
                    <Dialog visible={this.state.displayDialog} width="300px" header="Coord Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                        {
                            this.state.coordinate && 
                            
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="stn">STN</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="easting" onChange={(e) => {this.updateProperty('stn', e.target.value)}} value={this.state.coordinate.stn}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="easting">Easting</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="easting" onChange={(e) => {this.updateProperty('easting', e.target.value)}} value={this.state.coordinate.easting}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="northing">Northing</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="northing" onChange={(e) => {this.updateProperty('northing', e.target.value)}} value={this.state.coordinate.northing}/>
                                </div>
                              
                            </div>
                        }
                    </Dialog>
                </div>               
            </div>
        )
    }
}
