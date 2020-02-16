import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Shop.module.css";
import Button from "@material-ui/core/Button";
import axios from 'axios'

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      syringe_count:"",
      facemask_count:"",
      medicine_count:"",
      comment:"",
      latitude:"",
      longitude:"",
    };

    this.handleTChange = this.handleTChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleMChange = this.handleMChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.getLocation();
  }

  setPosition = position => {
    this.setState({
      ...this.state,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    }
  };

  handleSubmit(event) {
    axios.post(`https://wuhanmap-83035.firebaseio.com/donation_requests.json`, {
      title: this.state.title,
      coord: {"lat":this.state.latitude, "lng": this.state.longitude},
      description: this.state.comment,
      date: "2020-02-14"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  handleTChange(event) {
    this.setState({title: event.target.value});
  }
  handleSChange(event) {
    this.setState({syringe_count: event.target.value});
  }
  handleFChange(event) {
    this.setState({facemask_count: event.target.value});
  }
  handleMChange(event) {
    this.setState({medicine_count: event.target.value});
  }
  handleCChange(event) {
    this.setState({comment: event.target.value});
  }

  render() {
    return (
      <div>
        <h3>Please select aid material to request</h3>
        <p>Complete the form to indicate quantity of medical materials you require.</p>
        <form onSubmit={this.handleSubmit}> 
        <label>
          Title:
          <textarea value={this.state.title} onChange={this.handleTChange}/>
        </label>
        <label>
          Syringe Count:
          <textarea value={this.state.syringe_count} onChange={this.handleSChange}/>
        </label>
        <label>
          Facemask Count:
          <textarea value={this.state.facemask_count} onChange={this.handleFChange} />
        </label>
        <label>
          Medicine Count:
          <textarea value={this.state.medicine_count}  onChange={this.handleMChange} />
        </label>
        <label>
          Comment:
          <textarea value={this.state.comment}  onChange={this.handleCChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      </div>
    );
  }
}

export default Shop;
