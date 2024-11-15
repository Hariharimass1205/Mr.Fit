import jwt from 'jsonwebtoken'

export const adminLOGIN = (email: string, password: string)=> {
    try {
      if (process.env.ADMIN_EMAIL !== email) {
        console.error(Error);
      }
      if (process.env.ADMIN_PASS !== password) {
        console.error(Error);
      }
      const adminToken = jwt.sign(
        {
          AdminEmail: email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      
      return { adminToken, admin: email };
    } catch (error) {
      throw new Error    }
  }