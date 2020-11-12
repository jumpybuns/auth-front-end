import React, { Component } from 'react'
import chores from "./chores.png"


export default class Header extends Component {
    render() {
        return (
            <div>
                <img className="chorepic" src={chores} alt="homepic" width="300" /> 
            </div>
        )
    }
}
