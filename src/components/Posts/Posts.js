import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class Posts extends Component {
  render() {
    return (
      <Query query={POSTS_QUERY}>
        {({ data, loading }) => {
          if (loading) return 'Loading...';
          const { posts } = data;
          return posts.map(post => {
            return (
              <div key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.fileName}
                  />
                </Link>
                <h2>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <p>{post.body}</p>
              </div>
            );
          });
        }}
      </Query>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts {
    posts {
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
