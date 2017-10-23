import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from './DrawerUndocked.js';

export default class Top extends React.Component {

    constructor() {
    	super();
        this.state = {
            open: false
        }
    }  
   
    toggleDrawer(open) { 
    	this.setState({ open: open || !this.state.open }) 
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Boodschappen"
                    onLeftIconButtonTouchTap={this.toggleDrawer.bind(this)} 
                />
                <Drawer open={this.state.open} onToggleDrawer={this.toggleDrawer.bind(this)} />
           </div>
        )
    }
}