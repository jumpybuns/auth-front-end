import React, { Component } from 'react'
import pic from "./appletree.jpg"
export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div>Home Sweet Home, <br></br>Feels good doesnt it...<br></br>
                Now Let's get to works
                </div>
           
            <img classname="pic" src={pic} alt="homepic" width="200" /> 
            </div>
        )
    }
}
