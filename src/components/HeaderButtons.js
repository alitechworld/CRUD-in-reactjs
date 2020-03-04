import React, { Component } from 'react';
import './styles.css';

class HeaderButtons extends Component { 
	render() {
		const { handleRefresh, addUserbutton } = this.props;
		return (
			<div>
				<div>
					<button className="right btn btn1" onClick = { handleRefresh }>Refresh</button>
					<button className="right btn btn2" onClick = { addUserbutton }>Add</button>	
				</div>
				<br /><br /><hr />				
			</div>			
		)
	}
}

export default HeaderButtons
