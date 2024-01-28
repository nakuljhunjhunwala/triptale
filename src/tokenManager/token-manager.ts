import jwt from "jsonwebtoken";

export function createToken(result: any): Promise<string> {
  return new Promise((resolve) => {
    const token = jwt.sign(
      { _id: result._id, login: true },
      process.env.SECRET,
      {
        expiresIn: "15m",
      }
    );
    resolve(token);
  });
}

export function createRefreshToken(result: any): Promise<string> {
  return new Promise((resolve) => {
    const token = jwt.sign(
      { _id: result._id, login: true },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );
    resolve(token);
  });
}

export async function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const object = jwt.verify(token, process.env.SECRET);
      resolve(object);
    } catch {
      reject(new Error("Invalid Token"));
    }
  });
}

export async function verifyRefreshToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const object = jwt.verify(token, process.env.REFRESH_SECRET);
      resolve(object);
    } catch {
      reject(new Error("Invalid Token"));
    }
  });
}

export  function getTokenData(token: string): any {
  return jwt.decode(token);
}