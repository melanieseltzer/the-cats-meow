import React, { Component, Fragment } from 'react';
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
  constructor(props) {
    super(props);

    this.state = {
      isDisabled: false
    };
  }

  render() {
    return (
      <Query query={POSTS_QUERY}>
        {({ data, loading, fetchMore }) => {
          const { isDisabled } = this.state;
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

          return (
            <Fragment>
              <Container className="posts-container">
                {posts.map(post => {
                  const { id, title, body, createdAt, featuredImage } = post;

                  return (
                    <Link to={`/post/${id}`} key={id}>
                      <Content>
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
                        <Heading
                          subtitle
                          size={6}
                          renderAs="h3"
                          className="posted"
                        >
                          Posted on {format(createdAt, ['dd MMMM yyyy'])}
                        </Heading>
                        <p className="content-body-clip">{body}</p>

                        <Button color="danger" rounded={true}>
                          Read Post
                        </Button>
                      </Content>
                    </Link>
                  );
                })}
              </Container>

              <Container className="loadmore-container">
                <Button
                  disabled={isDisabled}
                  className="loadmore"
                  outlined
                  color="primary"
                  rounded={true}
                  onClick={() =>
                    fetchMore({
                      variables: {
                        skip: posts.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (
                          !fetchMoreResult ||
                          fetchMoreResult.posts.length === 0
                        ) {
                          this.setState({ isDisabled: true });
                          return prev;
                        }
                        return Object.assign({}, prev, {
                          posts: [...prev.posts, ...fetchMoreResult.posts]
                        });
                      }
                    })
                  }
                >
                  {isDisabled ? 'No more posts!' : 'Load More'}
                </Button>
              </Container>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(
      where: { status: PUBLISHED }
      orderBy: createdAt_DESC
      first: 3
      skip: $skip
    ) {
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
