import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class Products extends React.Component {

	constructor(props) {
		super(props);
		this.state = {products: []};
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

    render() {
    	const products = this.state.products;
    	const productItems = products.map((product) => {
			  return (
					  <ListItem
					  	key={product.id}
//			              leftAvatar={<Avatar icon={<FileFolder />} />}
//			              rightIcon={<ActionInfo />}
			              primaryText={product.name}
			              secondaryText={product.name}
		            />
			  )
		});
    	
        return (
            <div>
	            <List>
		            <Subheader inset={false}>Producten</Subheader>
		            {productItems}
	          </List>
           </div>
        )
    }
}