import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

import UserModel from "./userModel.js";
import PostModel from "./postModel.js";

const CommentModel = sequelize.define("Comment", {
  description: {
    type: DataTypes.STRING,
  },
});

CommentModel.belongsTo(PostModel, {
  foreignKey: "postId",
});

PostModel.hasMany(CommentModel, {
  foreignKey: "postId",
});

CommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

export default CommentModel;
