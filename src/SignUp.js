import React, { Component } from 'react'
import request from 'superagent'


export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading:true })
        const user = await request
            .post(`https://aqueous-everglades-52783.herokuapp.com/auth/signup`)
            .send(this.state);

        this.setState({ loading:false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token);
        this.props.history.push('/todos');

    
    }
    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <form className="password" onSubmit={this.handleSubmit}>
                    <label>
                        Email: 
                        <input onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />    
                    </label>
                    <label >
                        Password:
                        <input onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>    
                    {
                        this.state.loading
                        ? "Spin City"
                        : <button>Sign Up</button>
                    }
                    
                </form>            
            </div>
        )
    }
}
