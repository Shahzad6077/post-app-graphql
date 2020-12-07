const { ValidationError, UserInputError } = require("apollo-server");

const Post = require("./../../models/Post");
const authCheck = require("./../../Utils/check-auth");

module.exports = {
  Query: {
    getPosts: async (parent, args, context, info) => {
      try {
        const authUser = authCheck(context, true);
        info.authUser = authUser;
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, args, context, info) => {
      try {
        const authUser = authCheck(context, true);

        const { postId } = args;
        if (postId && postId === "") {
          return new ValidationError("Id is required.");
        }

        const post = await Post.findById(postId);

        if (!post) {
          return new ValidationError("Post Not found.");
        }

        return {
          ...post._doc,
          id: post._id,
          authUser,
          ali: "shahzad",
        };
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      try {
        // Middleware for auth check and get user
        const user = authCheck(context);
        const { body = "" } = args;
        if (body === "") {
          return new ValidationError("Post must have Body.");
        }
        const createdPost = new Post({
          body,
          createdAt: new Date().toISOString(),
          username: user.username,
          user: user.id,
          comments: [],
          likes: [],
        });
        const post = await createdPost.save();

        // THIS IS FOR NEW POST SUBSCRIPTION
        context.pubsub.publish("NEW_POST", {
          newPost: post,
        });

        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePost: async (_, args, context) => {
      try {
        const { postId } = args;
        // Middleware for auth check and get user
        const user = authCheck(context);
        if (!postId) {
          throw new ValidationError("Post id must not be empty.");
        }
        const post = await Post.findById(postId);

        if (!post) {
          throw new ValidationError("Post id is invalid.");
        }

        if (user.username !== post.username) {
          throw new ValidationError("Your'e not authorized of this post.");
        }
        await post.delete();
        return "Post delete Successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = authCheck(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // POST ALREADY LIKE, UNLIKE IT
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post Not Found");
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
