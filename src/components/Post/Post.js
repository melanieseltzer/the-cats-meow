import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const { post } = data;
          return (
            <div key={post.id}>
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.fileName}
              />
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          );
        }}
      </Query>
    );
  }
}

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
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
