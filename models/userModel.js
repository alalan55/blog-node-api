import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserModel = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  hashPassword: {
    type: DataTypes.STRING,
  },
});

export default UserModel;
