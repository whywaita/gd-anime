import React, { Component } from 'react';

export default class Cards extends Component {

    render () {
        console.log(this.props.result);
        return (
            <div id="cards">
                <ul>
                {this.props.result.map((item, i) =>
                    <li key={i}>{item.name}</li>
                )}
                </ul>
            </div> 
      )
    }
}