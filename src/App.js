import React, { Component } from 'react';
import './App.css';
import Section from './Section.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        { name: 'Appetizers', id: 4, items: [] },
        { name: 'Lunch', id: 3, items: [] },
        { name: 'Dinner', id: 5, items: [] },
        { name: 'Sides', id: 6, items: [] },
        { name: 'Drinks', id: 8, items: [] }
      ]
    }
  }

  componentDidMount() {
    let data = window.localStorage.getItem('sections');
    if (data) {
      this.setState({ sections: JSON.parse(data) });
    } else {
      let i = 0;
      for (let section of this.state.sections) {
        this.axiosHelper(section, i);
        i++;
      }
    }
  }

  axiosHelper(section, index) {
    let url = 'http://awesomeincbootcampapi-ianrios529550.codeanyapp.com:3000/public';
    let this_ = this;
    axios.get(url + '/api/menu/type/' + section.id)
      .then(function (response) {
        // handle success
        let arr = [...this_.state.sections];
        arr[index].items = response.data;
        arr[index].items.map((item, i) => {
          item.price = ((Math.random() * (1000 - 500) + 500) / 100).toFixed(2);
        })
        this_.setState({ sections: arr });
        window.localStorage.setItem('sections', JSON.stringify(this_.state.sections));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  render() {
    return (
      <>
        <div className='container text-center'>
          <div className='row'>
            <div className='col'>
              <h1>Local Porridge</h1>
              <h6>Address: 348 E Main St, Lexington, KY</h6>
              <h6>Monday - Sunday: 12:00 pm - 9:00 pm</h6>
              {this.state.sections.map((section, index) => <Section section={section} number={index} key={index}></Section>)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
