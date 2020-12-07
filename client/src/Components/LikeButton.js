import React from "react";

import { LIKE_POST, FETCH_POST_QUERY } from "./../utils/graphql";
import { useMutation } from "@apollo/react-hooks";

const LikeButton = ({ post: { id, isLiked, likeCount } }) => {
  const [toggleLike, { loading, error }] = useMutation(LIKE_POST, {
    update(proxy, result) {
      const { data } = result;
      const readQueriesData = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });

      const clonePost = [...readQueriesData.getPosts];
      const postIndex = clonePost.findIndex((o) => data.likePost.id === o.id);
      clonePost[postIndex] = { ...data.likePost };

      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          ...readQueriesData,
          getPosts: [...clonePost],
        },
      });
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exceptions?.errors);
    },
    variables: { postId: id },
  });

  return (
    <div>
      <button className={isLiked ? "post-liked" : ""} onClick={toggleLike}>
        {isLiked ? "Unlike" : "Like"}
      </button>
      <strong>{likeCount}</strong>
    </div>
  );
};

export default LikeButton;
