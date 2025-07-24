import bcrypt from "bcrypt";

const saltRounds = 10;

export const HashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

export const ComparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    if (!result) {
      throw new Error("Password does not match");
    }
    return result;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
};


export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const ResponseHandler = (message = null, content = null) => {
  return {
    message,
    content,
  };
};