const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside JWT middleware");

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log("Token:", token);

    try {
        // NOTE: Ensure this environment variable is correctly set
        const decoded = jwt.verify(token, process.env.jwtKey); 
        console.log("Decoded:", decoded);

        // FIX: Extract the userMail from the decoded payload (e.g., 'admin@gmail.com')
        // and attach it to req.payload as expected by the controller.
        req.payload = decoded.userMail; 
        
        req.user = decoded; // Keep this for general user data if needed later
        next();
    } catch (error) {
        console.log("JWT error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = jwtMiddleware;