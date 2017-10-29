import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Products extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: props.open, 
			product: props.product, 
			categories: []
		}
	}

	handleClose = () => {
		this.setState({open: false});
	}
	
	handleChange = (event, index, value) => this.setState({category: value});
	
	handleSave = () => {
		// Save
		this.handleClose();
	}

    render() {
    	const actions = [
    	      <FlatButton
    	        label="Annuleren"
    	        primary={true}
    	        onClick={this.handleClose}
    	      />,
    	      <FlatButton
    	        label="Opslaan"
    	        primary={true}
    	        keyboardFocused={true}
    	        onClick={this.handleSave}
    	      />,
    	    ];
    	
    	const product = this.state.product;
    	
    	const categories = this.state.categories;
    	const categoryItems = categories.map((category) => {
			  return (
					  <MenuItem value={category.id} primaryText={category.name} />
			  )
		});
    	
        return (
        		<div>
	                <Dialog
	                  title="Product opslaan"
	                  actions={actions}
	                  modal={false}
	                  open={this.state.open}
	                  onRequestClose={this.handleClose}
	                  autoScrollBodyContent={true}
	                >
	                	<TextField
			                hintText="Product naam"
			                floatingLabelText="Product naam"
			              />
			            <br />
		                <SelectField
			                floatingLabelText="Categorie"
			                value={this.state.category}
			                onChange={this.handleChange}
			            >
			                {categoryItems}
			            </SelectField>
	                </Dialog>
                </div>
        )
    }
}