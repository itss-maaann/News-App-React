import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/NewsNavBar';
import News from '../components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  categories = [
    { key: '', country: 'us' },
    { key: 'general', country: 'us' },
    { key: 'business', country: 'us' },
    { key: 'entertainment', country: 'us' },
    { key: 'health', country: 'us' },
    { key: 'science', country: 'us' },
    { key: 'sports', country: 'us' },
    { key: 'technology', country: 'us' },
  ];

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            {this.categories.map((category) => (
              <Route
                key={category.key}
                path={`/${category.key}`}
                element={
                  <News
                    key={category.key}
                    pageSize={this.pageSize}
                    country={category.country}
                    category={category.key}
                    apiKey={this.apiKey}
                    setProgress={this.setProgress}
                  />
                }
              />
            ))}
          </Routes>
        </Router>
      </>
    );
  }
}
