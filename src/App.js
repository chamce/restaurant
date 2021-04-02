import React, { Component } from 'react';
import './App.css';
import Section from './Section.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // keep 5 sections in state
      // each section has a name, id, and food items array
      sections: [
        { name: 'Appetizers', id: 4, items: [] },
        { name: 'Lunch', id: 3, items: [] },
        { name: 'Dinner', id: 5, items: [] },
        { name: 'Sides', id: 6, items: [] },
        { name: 'Drinks', id: 8, items: [] }
      ]
    }
  }

  // after component loads
  async componentDidMount() {
    // get local storage sections data
    let data = window.localStorage.getItem('sections');
    // if data is defined
    if (data) {
      // set sections state to local storage data
      this.setState({ sections: JSON.parse(data) });
      // if data is not defined
    } else {
      // iterator and index of section in sections array
      let i = 0;
      // for each section object of sections array
      for (let section of this.state.sections) {
        // gather api data
        await this.axiosHelper(section, i);
        // add 2 more items to appetizers
        if (i === 0) {
          await this.axiosHelper2(section, i);
        }
        // iterate
        i++;
      }
    }
  }

  async axiosHelper(section, index) {
    // api url
    let url = 'http://awesomeincbootcampapi-ianrios529550.codeanyapp.com:3000/public';
    // keep this scope
    let this_ = this;
    // url that gets 10 random food items by section id
    await axios.get(url + '/api/menu/type/' + section.id)
      .then(function (response) {
        // temp array with current sections data
        let arr = [...this_.state.sections];
        // add retrieved items to temp array
        arr[index].items = response.data;
        // for every retrieved item, create a random price
        arr[index].items.map((item, i) => {
          item.price = ((Math.random() * (1000 - 500) + 500) / 100).toFixed(2);
        })
        // set sections state to temp array
        this_.setState({ sections: arr });
        // set local storage to sections state
        window.localStorage.setItem('sections', JSON.stringify(this_.state.sections));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  async axiosHelper2(section, index) {
    // api url
    let url = 'http://awesomeincbootcampapi-ianrios529550.codeanyapp.com:3000/public';
    // keep this scope
    let this_ = this;
    // while not 12 appetizers
    while (this.state.sections[0].items.length < 12) {
      // url that gets 1 random food item by section id
      await axios.get(url + '/api/menu/type_amount/' + section.id + '/1')
        .then(function (response) {
          // temp array with current sections data
          let arr = [...this_.state.sections];
          // array of new item
          let newItem = response.data;
          // if appetizers items array doesn't include new item object
          if (!arr[index].items.includes(...newItem)) {
            // add new item object to appetizers items array
            arr[index].items.push(...newItem);
            // for the retrieved item, create a random price
            arr[index].items[arr[index].items.length - 1].price = ((Math.random() * (1000 - 500) + 500) / 100).toFixed(2);
            // set sections state to temp array
            this_.setState({ sections: arr });
            // set local storage to sections state
            window.localStorage.setItem('sections', JSON.stringify(this_.state.sections));
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
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
              {/* map each section to a section component */}
              {this.state.sections.map((section, index) => <Section section={section} number={index} key={index}></Section>)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
