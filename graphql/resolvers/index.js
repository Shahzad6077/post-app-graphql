const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const authCheck = require("./../../Utils/check-auth");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
    isLiked: (parent, args, context, info) => {
      // console.log(info, "parent");
      var start = new Date();
      const authUser = authCheck(context, true) || {};
      var end = new Date() - start;
      console.info("Execution time: %dms", end);
      const result = parent.likes.find((o) => o.username === authUser.username);
      return !!result;
      // return false;
    },
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
