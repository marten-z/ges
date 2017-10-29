import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Products extends React.Component {

	constructor(props) {
		super(props);
		
		this.handleSave = this.handleSave.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.loadCategories = this.loadCategories.bind(this);
		
		this.state = {
			open: props.open, 
			product: props.product,
			name: props.product.name,
			categoryId: props.product.categoryId,
			categories: []
		}
	}
	
	loadCategories() {
		// TODO: Move to service
		const that = this;
		const url = 'http://localhost:8080/categories'
			
		fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				that.setState({categories: data.categories});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			open: nextProps.open, 
			product: nextProps.product,
			name: nextProps.product.name,
			categoryId: nextProps.product.categoryId,
			categories: []
		});
		this.loadCategories();
	}
	
	handleCategoryChange(event, index, value) { 
		const categoryId = value;
		this.setState({categoryId});
	}
	
	handleNameChange(event) { 
		const name = event.target.value;		
		this.setState({name});
	}
	
	handleSave() {
		const product = this.state.product;
		
		product.name = this.state.name;
		product.categoryId = this.state.categoryId;
		
		// Save
		this.props.saveProduct(product);
		this.handleClose();
	}
	
	handleClose() {
		this.props.handleCloseDialog();
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
    	const categoryItems = this.state.categories.map((category) => {
			  return (
					  <MenuItem key={category.id} value={category.id} primaryText={category.name} />
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
			                defaultValue={product.name}
	                		onChange={this.handleNameChange}
			              />
			            <br />
		                <SelectField
			                floatingLabelText="Categorie"
			                value={product.categoryId}
			                onChange={this.handleCategoryChange}
			            >
			                {categoryItems}
			            </SelectField>
	                </Dialog>
                </div>
        )
    }
}