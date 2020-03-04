import React, { Component } from 'react';
import './styles.css';

class UserList extends Component { 
	render() {
		const { editUserHandler, deleteUser, index } = this.props;

		return (
			<div className="main">								
				<div className="column">
					<div className="row">
						<div className="user-name">{this.props.name}</div>
						<div className="user-desc">{this.props.description}</div>
					</div>
					<br /><hr /><br />								
					<div>											
						<button onClick={ editUserHandler } data-index = { index }>Edit</button>
						<button onClick={ deleteUser } data-index = { index }>Delete</button>	
					</div>										
				</div>  	
			</div>	
		)
	}
}

export default UserList




