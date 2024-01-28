// Write a middleware function that will handle the route that is not valid with complete details.

export function handleRoute(req, res, next) {
    const details = {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
    }
    
    res.status(404).json({
        message: "Route not found",
        details: details,
    });
}