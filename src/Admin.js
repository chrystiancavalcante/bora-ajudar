import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from './base'


import AdminCampanhas from './AdminCampanhas'
const AdminHome = props => <p>Seja bem-vindo!</p>

class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthing: true,
            isLoggedIn: false,
            user: null
        }
    }
    ComponentDidMount(){
        auth.onAuthStateChanged(user =>{
            this.setState({
                isAuthing: false,
                isLoggedIn: !!user,
                user: user
            })
          })
    }

    render(){
        if (this.state.isAuthing) {
         return <p>Aguarde...</p>
        }
        if (!this.state.isLoggedIn) {
            return <Redirect to='/login' />
        }
   return (
       <div className='Card'>
   <h1>Painel Administrativo</h1>
   <Route path='/' component={AdminHome} />
   <Route 
    path={`${this.props.match.url}/campanhas`}
    component={AdminCampanhas} />
   </div>
   )
    }
} 

export default Admin