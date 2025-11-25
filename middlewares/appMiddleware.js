const appMiddleware = (req, res, next) => {
    console.log("inside application level middleware");
    next();
}

module.exports = appMiddleware;