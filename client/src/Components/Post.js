import React from "react";
import { useAuthContext } from "./../Context/auth";
import LikeButton from "./LikeButton";

const Post = ({ id, body, commentCount, likeCount, username, isLiked }) => {
  const { user } = useAuthContext();

  return (
    <div className="post-item">
      <div className="post__body">
        <h4>{body}</h4>
        <p>By {username}</p>
      </div>
      <div className="post__actions">
        <LikeButton post={{ id, username, isLiked, likeCount }} />
        <div>
          <button>Comment</button>
          <strong>{commentCount}</strong>
        </div>

        {user && user.username === username && (
          <div>
            <button style={{ backgroundColor: "red" }}>delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
