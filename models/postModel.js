import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

import UserModel from "./userModel.js";

const PostModel = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});

PostModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

UserModel.hasMany(PostModel, {
  foreignKey: "userId",
});

export default PostModel;
