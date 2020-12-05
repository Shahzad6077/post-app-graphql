import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_POST_QUERY } from "./../utils/graphql";

import Post from "../Components/Post";
import List from "../Components/List";
import { useAuthContext } from "./../Context/auth";
import PostForm from "../Components/PostForm";

const Home = () => {
  const { user } = useAuthContext();
  const { loading, data } = useQuery(FETCH_POST_QUERY);

  if (loading) {
    return <p>Loading Home Page</p>;
  }
  return (
    <div>
      <div>{user && <PostForm />}</div>
      <List>
        {data?.getPosts.map((obj) => {
          return <Post key={obj.id} {...obj} />;
        })}
      </List>
    </div>
  );
};

export default Home;
