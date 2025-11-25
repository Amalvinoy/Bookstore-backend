const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside JWT middleware");

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];  // Extract token correctly
    console.log("Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.jwtkey);
        console.log("Decoded:", decoded);

        req.user = decoded; // store user data for next middleware
        next();
    } catch (error) {
        console.log("JWT error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = jwtMiddleware;
