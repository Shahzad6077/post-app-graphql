const { UserInputError, AuthenticationError } = require("apollo-server");
const Post = require("./../../models/Post");

const checkAuthMiddleware = require("./../../Utils/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, args, context) => {
      try {
        const { body, postId } = args;
        const { username } = checkAuthMiddleware(context);

        if (body.trim() === "") {
          throw new UserInputError("Empty Comment.", {
            errors: {
              body: "Body must not be empty."
            }
          });
        }

        const post = await Post.findById(postId);

        if (!post) {
          throw new UserInputError("Post Not Founct.");
        }
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteComment: async (_, args, context) => {
      try {
        const { postId, commentId } = args;
        const { username } = checkAuthMiddleware(context);

        const post = await Post.findById(postId);

        if (post) {
          const commentIndex = post.comments.findIndex(o => o.id === commentId);

          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action is Not allowed");
          }
        } else {
          throw new UserInputError("Post is not found.");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
