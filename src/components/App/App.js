import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import Posts from '../Posts';
import Post from '../Post';
import ScrollToTop from '../ScrollToTop';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlp8i8240jy601gpcvnn1tn2/master'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <ScrollToTop>
            <div className="App">
              <Header />
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route path="/post/:id" component={Post} />
              </Switch>
              <Footer />
            </div>
          </ScrollToTop>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
