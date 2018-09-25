import React, { Component } from 'react';
import { Footer as TheFooter } from 'react-bulma-components/full';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <TheFooter>
        Made with{' '}
        <span role="img" aria-label="Heart">
          ❤️
        </span>{' '}
        by{' '}
        <a
          href="https://github.com/melanieseltzer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Melanie Seltzer
        </a>
      </TheFooter>
    );
  }
}
