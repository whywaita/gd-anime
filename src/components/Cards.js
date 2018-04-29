import React, { Component } from 'react';

import './Cards.css'

export default class Cards extends Component {

    render () {
        return (
            <div id="cards">
                {this.props.result.map((item, i) =>
                    <div key={i} className="card">
                        <p>{item.name}</p>
                    </div>
                )}
            </div> 
      )
    }
}