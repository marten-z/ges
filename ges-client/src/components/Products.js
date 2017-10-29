import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ProductDialog from './ProductDialog.js';

export default class Products extends React.Component {

	constructor(props) {
		super(props);
		
	    this.saveProduct = this.saveProduct.bind(this);
	    this.handleOpenDialog = this.handleOpenDialog.bind(this);
	    this.handleCloseDialog = this.handleCloseDialog.bind(this);
	    
		this.state = {
				dialogOpen: false,
				selectedProduct: {},
				products: [],
		};
	}
	
	componentDidMount() {
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
		console.log('handleOpenDialog');
		console.log(product);
		
		this.setState({
			dialogOpen: true,
			selectedProduct: product
		});
	}
	
	handleCloseDialog() {
		console.log('handleCloseDialog');
	    
		this.setState({
			dialogOpen: false,
			selectedProduct: {}
		});
	}
	
	saveProduct(product) {
		console.log('saveProduct');
		console.log(product);
		const that = this;
		const url = 'http://localhost:8080/product'
		
//		fetch(url)
//			.then(function(response) {
//				return response.json();
//			})
//			.then(function(data) {
//				that.setState({products: data.products});
//			})
//			.catch((error) => {
//				console.error(error);
//			});
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
	        	<ProductDialog open={dialogOpen} product={selectedProduct} handleCloseDialog={this.handleCloseDialog} saveProduct={this.saveProduct} />
        	</div>
        )
    }
}