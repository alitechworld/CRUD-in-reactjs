import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import Header from '../components/Header';
import HeaderButtons from '../components/HeaderButtons';
import UserList from '../components/UserList';

class User extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userData: [],
			errorMsg: '',
			hideList: true,
			newUserId: 3,
			newUserName: '',
			newUserDesc: '',
			hideEdit: true,
			editUser: null,
			editName: '',
			editDesc: ''
		};	
		this.changeHandler = this.changeHandler.bind(this);
		this.editUserHandler = this.editUserHandler.bind(this);
		this.update = this.update.bind(this);
		this.deleteUser = this.deleteUser.bind(this);	
	}

	//axios/user array
	componentDidMount() {
		axios
		.get('services/users.json')
		.then(response => {
			this.setState({userData: response.data.users});
		})		
		.catch(error => {
			this.setState('Error in fetching data');
		})
	}	

	//Refresh function
	handleRefresh = () => {
		window.location.reload();
	};

	//Add cancel function
	handleAddCancel = () => {
		const { hideList } = this.state;
		this.setState({hideList: !hideList});
	};

	//Edit cancel function
	handleEditCancel = () => {
		this.setState({hideEdit: true });
	};

	// add buttton
	addUserbutton = () => {
		const { hideList } = this.state;
		this.setState({hideList: !hideList}); 		
	}	

	//change handler
	changeHandler = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	//add user function
	addUserHandler = (e) => {
		const { hideList } = this.state;	
		e.preventDefault();
		
		this.setState({newUserId: Math.floor(Math.random() * 100) + 3});

		let newUserList = this.state.userData;
		newUserList.push({id:this.state.newUserId, name:this.state.newUserName, description:this.state.newUserDesc});
		this.setState({ newUserList });

		this.setState({hideList: !hideList});			
		this.setState({ newUserName: '', newUserDesc: '' }); 
	}

	//edit user function
	editUserHandler = (e) => {
		this.setState({hideEdit: false });

		const index = e.currentTarget.dataset.index;
		const selectedUser = this.state.userData[index];
		this.setState({editUser: selectedUser });

		this.setState({editUserId: selectedUser.id });
		this.setState({editName: selectedUser.name });
		this.setState({editDesc: selectedUser.description });
	}

	//update user function
	update(e) {
		const { hideEdit } = this.state;
		e.preventDefault();	
		
		let updatedUser = this.state.userData;
		
		let updatingUser = updatedUser.find(ueser => ueser.id === this.state.editUserId)

		updatingUser.name = this.state.editName;
		updatingUser.description = this.state.editDesc;	

		this.setState({hideEdit: !hideEdit});	
	}

	//delete user function
	deleteUser(e){
		const index = e.currentTarget.dataset.index;
		let deleteSelectedUser = this.state.userData;
		deleteSelectedUser.splice(index, 1)
		this.setState ({userData: deleteSelectedUser})
	}
	  
	render() {
		//user list and hide list
		const { userData } = this.state;
		const { hideList } = this.state;
		//add user
		const { newUserName, newUserDesc } = this.state;
		const { hideEdit } = this.state;
		//edit user
		const { id, editUser } = this.state;
		const { editName, editDesc } = this.state;

		return (
			<div>
				<div>
					<div>
						{/* header component */}
						<Header />

						<HeaderButtons 
							//display header buttons
							handleRefresh = { this.handleRefresh } 
							addUserbutton = { this.addUserbutton }
						/>

						{	
							hideList && (			
								userData.map((user, index) =>
									<div key={ user.id }>
										<UserList 
											//user list
											name = { user.name } 
											description = { user.description } 

											//edit
											index = { index }
											editUserHandler = { this.editUserHandler }
											deleteUser = { this.deleteUser }											
										/>
									
										{
											!hideEdit && editUser.id === user.id && (							
												<div className="edit">
													<h2>Edit:</h2>
													<hr />
													<br />
													<form onSubmit = { this.update }>
														<input 
															type = "text" 
															placeholder = "Enter your name" 
															name = "editName" 
															value = { editName } 
															onChange = { this.changeHandler } 
															required															
														/>
														<input 
															type = "text" 
															placeholder = "Enter your description" 
															name = "editDesc" 
															value = { editDesc } 
															onChange = { this.changeHandler }
															required
														/>

														<button>Save</button>
														<button onClick={ this.handleEditCancel }>Cancel</button>
													</form>
												</div>											
											)										
										}	
															
									</div> 									
								)
							)	
						}	
						
						<div>
							{
								!hideList && (
										<div className="add" key = { id }>
											<h2>Add:</h2>
											<hr />
											<br />
											<form onSubmit = { this.addUserHandler }>
												<input 
													type = "text" 
													placeholder = "Enter your name" 
													name = "newUserName" 
													value = { newUserName } 
													onChange = { this.changeHandler } 
													required															
												/>
												<input 
													type = "text" 
													placeholder = "Enter your description" 
													name = "newUserDesc" 
													value = { newUserDesc } 
													onChange = { this.changeHandler }
													required
												/>
			
												<button>Add</button>
												<button onClick = { this.handleAddCancel }>Cancel</button>
											</form>
										</div>
									)
								}													
						</div>							
												
					</div>									
				</div>				
			</div>
		)
	}
}

export default User
