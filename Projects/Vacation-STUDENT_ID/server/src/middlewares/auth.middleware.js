import jwt from "jsonwebtoken";


export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, is_admin }
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

export function adminOnly(req, res, next) {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
