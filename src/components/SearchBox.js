import React, { Component } from 'react';
import './SearchBox.css';
import Cards from './Cards';

export default class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input_value: '',
      result_files: []
    }
  }

  searchQuery (keyword) {
    var q = `name contains '${keyword}' and mimeType != 'application/vnd.google-apps.folder' and mimeType contains 'video/'`;

    if (this.props.onlyMe) {
      q = q + ` and '${window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail()}' in owners`
    }

    return q
  }
  
  search (keyword) {
      window.gapi.client.drive.files.list({
        q: this.searchQuery(keyword),
        fields: "files(*)",
        orderBy: "name_natural"
      }).then((res)=>{
        this.setState({result_files: res.result.files});
      }).catch((e)=>{
        console.log(e);
      });
  }

  update (e) {
    this.setState({input_value: e.target.value})
  }

  submit (e) {
    e.preventDefault();
    const iv = this.state.input_value;
    this.search(iv);
  }

  componentWillReceiveProps() {
    if (this.state.input_value !== "") {
      this.search(this.state.input_value);
    }
  }

  render () {
    return (
      <div className="container">
        <form onSubmit={e => this.submit(e)}>
          <div className="group">
            <input type='text' placeholder="Query" value={this.state.input_value} onChange={e => this.update(e)} />
            <span className='highlight'></span>
            <span className="bar"></span>
          </div>
        </form>

        <Cards result={this.state.result_files} />
      </div>
    )
  }
}