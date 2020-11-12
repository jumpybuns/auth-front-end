import React, { Component } from 'react'
import request from 'superagent'


export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        error: null
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);
        try {
        this.setState({ loading:true, error: null })
        const user = await request
            .post(`https://aqueous-everglades-52783.herokuapp.com/auth/signup`)
            .send(this.state);

        this.setState({ loading:false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token);
        this.props.history.push('/todos');
        } catch(e) {
            this.setState({
                error: `${e.message} : refresh and try again`
            })
        }

    
    }
    render() {
        return (
        <div className="signup">
                <h2>Secure Sign Up</h2>
                <form className="password" onSubmit={this.handleSubmit}>
                    <label>
                        {this.state.error && <div style={{color:'red'}}>{this.state.error}</div>}   
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
                        : <button className="myButton">Sign Up</button>
                    }
                    
                </form>            
            </div>
        )
    }
}
