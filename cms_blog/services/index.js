import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPost = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featureImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPost = async () => {
  const query = gql`
  query GetPostDetail(){
    posts(
      orderBy: createdAt_ASC
      last:3
    ){
      title
      featureImage {
        url
      }
      createdAt
      slug
    }
  }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPost = async () => {
  const query = gql`
    query getPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND {categories_some: {slug_in: $categories}}}
        last: 3
      ){
        title
        featureImage {
          url
        }
        createdAt
        slug
        }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.categories;
};
