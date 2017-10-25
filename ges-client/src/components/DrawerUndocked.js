import React from 'react';
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class DrawerUndocked extends React.Component {

	constructor(props) {
		super(props);
		this.props = {open: false};
	}

  render() {
    return (
        <Drawer
          docked={false}
          width={200}
          open={this.props.open}
          onRequestChange={(open) => this.props.onToggleDrawer(open)}
        >
        	<MenuItem onClick={() => this.props.onToggleDrawer(false)} containerElement={<Link to="/" />} primaryText="Dashboard" />
        	<MenuItem onClick={() => this.props.onToggleDrawer(false)} containerElement={<Link to="/categories" />} primaryText="Categorieën" />
        	<MenuItem onClick={() => this.props.onToggleDrawer(false)} containerElement={<Link to="/products" />} primaryText="Producten" />
        </Drawer>
    );
  }
}

