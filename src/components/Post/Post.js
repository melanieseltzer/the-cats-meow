import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Markdown from 'react-markdown';
import gql from 'graphql-tag';
import { Container, Content, Heading } from 'react-bulma-components/full';
import format from 'date-fns/format';
import Loader from 'react-loader-spinner';

import '../Posts/Posts.css';

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading }) => {
          const { post } = data;

          if (loading)
            return (
              <div className="loading">
                <Loader
                  type="Ball-Triangle"
                  color="#ff3860"
                  height="80"
                  width="80"
                />
              </div>
            );

          const { id, title, body, createdAt, featuredImage } = post;

          return (
            <Container className="posts-container">
              <Content className="post" key={id}>
                {featuredImage ? (
                  <img
                    className="post-image"
                    src={featuredImage.url}
                    alt={featuredImage.fileName}
                  />
                ) : (
                  ''
                )}
                <Heading renderAs="h2" size={3}>
                  {title}
                </Heading>
                <Heading subtitle size={6} renderAs="h3" className="posted">
                  Posted on {format(createdAt, ['dd MMMM yyyy'])}
                </Heading>
                <Markdown source={body} />
              </Content>
            </Container>
          );
        }}
      </Query>
    );
  }
}

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      createdAt
      id
      title
      body
      featuredImage {
        fileName
        url
      }
    }
  }
`;
