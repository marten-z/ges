import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ProductDialog from './ProductDialog.js';


export default class Products extends React.Component {

	constructor(props) {
		super(props);
		
	    this.saveProduct = this.saveProduct.bind(this);
	    this.handleOpenDialog = this.handleOpenDialog.bind(this);
	    this.handleCloseDialog = this.handleCloseDialog.bind(this);
	    this.loadProducts = this.loadProducts.bind(this);
	    
		this.state = {
				dialogOpen: false,
				selectedProduct: {},
				products: [],
		};
	}
	
	componentDidMount() {
		this.loadProducts();
	}
	
	loadProducts() {
		const that = this;
		const url = 'http://localhost:8080/products'
		
		fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				that.setState({products: data.products});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	handleOpenDialog(product) {	
		if (product === null) {
			product = {name: ''}
		}
		
		this.setState({
			dialogOpen: true,
			selectedProduct: product
		});
	}
	
	handleCloseDialog() {
		this.setState({
			dialogOpen: false,
			selectedProduct: {}
		});
	}
	
	saveProduct(product) {
		const that = this;
		const url = 'http://localhost:8080/products/';
		const headers = {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  };
		const body = JSON.stringify({
		    "name": product.name,
		    "categoryId": product.categoryId
		   });
		
		let fetchObj;
		if (!product.id) {
			fetchObj = fetch(url + 'new', {
				   method: 'post',
				   headers: headers,
				   body: body
				  });
		} else {			
			fetchObj = fetch(url + product.id, {
			   method: 'put',
			   headers: headers,
			   body: body
			  });
		}
		
		fetchObj.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			that.loadProducts();
		})
		.catch((error) => {
			console.error(error);
		})
	}

    render() {
    	const dialogOpen = this.state.dialogOpen;
    	const selectedProduct = this.state.selectedProduct;
    	const products = this.state.products;
    	
    	const productItems = products.map((product) => {
			  return (
					  <ListItem
					  	key={product.id}
//			              leftAvatar={<Avatar icon={<FileFolder />} />}
//			              rightIcon={<ActionInfo />}
			              primaryText={product.name}
			              secondaryText={product.name}
					  	product={product}
					  	onClick={() => this.handleOpenDialog(product)}
		            />
			  )
		});
    	
        return (
            <div>
	            <List>
		            <Subheader inset={false}>Producten</Subheader>
		            {productItems}
	        	</List>
	        	<FloatingActionButton style={{marginRight:20}} onClick={() => this.handleOpenDialog(null)}>
	        		<ContentAdd />
	        	</FloatingActionButton>
	        	<ProductDialog open={dialogOpen} product={selectedProduct} handleCloseDialog={this.handleCloseDialog} saveProduct={this.saveProduct} />
        	</div>
        )
    }
}