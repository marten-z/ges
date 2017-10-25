import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class Categories extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {categories: []};
	}
	
	componentDidMount() {
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

    render() {
    	const categories = this.state.categories;
    	const categoryItems = categories.map((category) => {
			  return (
					  <ListItem
					  	key={category.id}
//			              leftAvatar={<Avatar icon={<FileFolder />} />}
//			              rightIcon={<ActionInfo />}
			              primaryText={category.name}
			              secondaryText={category.name}
		            />
			  )
		});
    	
        return (
            <div>
	            <List>
		            <Subheader inset={false}>Categorieën</Subheader>
		            {categoryItems}
	          </List>
           </div>
        )
    }
}