import React, { useState } from "react";
import { CREATE_POST, FETCH_POST_QUERY } from "./../utils/graphql";
import { useMutation } from "@apollo/react-hooks";

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const [bodyText, setBodyText] = useState("");

  const [createdPost, { loading, error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const { data } = result;
      console.log(data.createPost);
      const readQueriesData = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });

      console.log(readQueriesData);
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          ...readQueriesData,
          getPosts: [data.createPost, ...readQueriesData.getPosts],
        },
      });
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions);
      setErrors(err.graphQLErrors[0].extensions.exceptions?.errors);
    },
    variables: { body: bodyText },
    onCompleted(d) {
      setBodyText("");
    },
  });
  function onSubmitPost(e) {
    e.preventDefault();
    createdPost();
  }

  return (
    <div className="post-form">
      <h3>Create Post</h3>
      <form onSubmit={onSubmitPost}>
        <input
          name="body"
          type="text"
          onChange={({ currentTarget: { value } }) => setBodyText(value)}
          placeholder="Please type body"
          value={bodyText}
        />
        <button type="submit">Create</button>
      </form>
      {error && (
        <div
          style={{
            backgroundColor: "rgba(226, 92, 74, 0.281)",
            padding: "6px 1rem",
          }}
        >
          <h6 style={{ color: "red", textTransform: "uppercase" }}>
            {error.graphQLErrors[0].message}
          </h6>
        </div>
      )}
    </div>
  );
};

export default PostForm;
