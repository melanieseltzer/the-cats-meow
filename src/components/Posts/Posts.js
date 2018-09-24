import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button,
  Container,
  Content,
  Heading
} from 'react-bulma-components/full';
import format from 'date-fns/format';
import Loader from 'react-loader-spinner';

import './Posts.css';

export default class Posts extends Component {
  render() {
    return (
      <Container className="posts-container">
        <Query query={POSTS_QUERY}>
          {({ data, loading }) => {
            const { posts } = data;

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

            return posts.map(post => {
              return (
                <Link to={`/post/${post.id}`} key={post.id}>
                  <Content>
                    <img
                      className="post-image"
                      src={post.featuredImage.url}
                      alt={post.featuredImage.fileName}
                    />

                    <Heading renderAs="h2" size={3}>
                      {post.title}
                    </Heading>
                    <Heading subtitle size={6} renderAs="h3" className="posted">
                      Posted on {format(post.createdAt, ['dd MMMM yyyy'])}
                    </Heading>
                    <p className="content-body-clip">{post.body}</p>

                    <Button color="danger" rounded={true}>
                      Read Post
                    </Button>
                  </Content>
                </Link>
              );
            });
          }}
        </Query>
      </Container>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts {
    posts {
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
