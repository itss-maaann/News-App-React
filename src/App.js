import React, { Component } from 'react';
import Navbar from './components/NewsNavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  pageSize = 9;
  apiKey = '0f176a171aef4983893d919d30976af1';
  categories = [
    {key : '', country : 'us'},
    {key :'general', country : 'us'},
    {key :'business', country : 'us'},
    {key :'entertainment', country : 'us'},
    {key :'health', country : 'us'},
    {key :'science', country : 'us'},
    {key :'sports', country : 'us'},
    {key :'technology', country : 'us'},
  ];

  render() {
    console.log("App component");
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            {this.categories.map((category) => (
              <Route
                path={`/${category.key}`}
                element={<News key={category.key} pageSize={this.pageSize} country={category.country} category={category.key} apiKey={this.apiKey} />}
              />
            ))}
          </Routes>
        </Router>
      </>
    );
  }
}
