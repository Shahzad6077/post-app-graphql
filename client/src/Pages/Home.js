import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "../Components/Post";
import List from "../Components/List";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POST_QUERY);

  if (loading) {
    return <p>Loading Home Page</p>;
  }
  return (
    <div>
      <List>
        {data?.getPosts.map((obj) => {
          return <Post key={obj.id} {...obj} />;
        })}
      </List>
    </div>
  );
};

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
