import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Hero, Heading } from 'react-bulma-components/full';

import './Header.css';
import Cat from './cat.svg';

export default class Header extends Component {
  render() {
    return (
      <Hero color="primary" size="large">
        <Hero.Body>
          <Container>
            <div className="hero-image">
              <Link to="/">
                <img src={Cat} alt="Cat" />
              </Link>
            </div>
            <Heading size={1}>
              <Link to="/">The Cat's Meow</Link>
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
}
