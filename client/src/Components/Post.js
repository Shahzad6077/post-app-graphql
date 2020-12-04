import React from "react";

const Post = ({ body, commentCount, likeCount, username, isLiked = true }) => {
  return (
    <div className="post-item">
      <div className="post__body">
        <h4>{body}</h4>
        <p>By {username}</p>
      </div>
      <div className="post__actions">
        <div>
          <button className={isLiked ? "post-liked" : ""}>
            {isLiked ? "Unlike" : "Like"}
          </button>
          <strong>{likeCount}</strong>
        </div>
        <div>
          <button>Comment</button>
          <strong>{commentCount}</strong>
        </div>
      </div>
    </div>
  );
};

export default Post;
