import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from './components/layout/Layout';
import Navigation from './components/layout/Navigation';

import Home from './pages/Home'
import Orders from './pages/Orders'

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
