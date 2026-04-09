// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// ===== Starting server log =====
console.log("Starting Express server...");

// ===== Global Middleware =====
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[Global Middleware] ${req.method} request to ${req.url} at ${timestamp}`);
    next();
});

// ===== Preprocessing Middleware =====
app.use((req, res, next) => {
    req.customData = { message: "Hello from middleware!" };
    console.log('[Preprocessing Middleware] Added customData to request');
    next();
});

// ===== Query Logging Middleware =====
app.use((req, res, next) => {
    console.log('[Query Middleware] Query params:', req.query);
    next();
});

// ===== Route-level Middleware =====
const routeMiddleware = (req, res, next) => {
    console.log(`[Route Middleware] Processing ${req.method} request at ${req.url}`);
    next();
};

// ===== Additional Middleware for Contact =====
const middleware1 = (req, res, next) => {
    console.log('[Middleware 1] Running before Contact Page');
    next();
};

const middleware2 = (req, res, next) => {
    console.log('[Middleware 2] Still before Contact Page');
    next();
};

// ===== Routes =====

// Home Page
app.get('/', routeMiddleware, (req, res) => {
    console.log('[Route Handler] Sending Home Page');
    res.send('Home Page');
});

// About Page
app.get('/about', routeMiddleware, (req, res) => {
    console.log('[Route Handler] Sending About Page');
    res.send(`About Page: ${req.customData.message}`);
});

// Contact Page with multiple middleware
app.get('/contact', routeMiddleware, middleware1, middleware2, (req, res) => {
    console.log('[Route Handler] Sending Contact Page');
    res.send('Contact Page: Reach us at contact@example.com');
});

// Contact JSON Page
app.get('/contact-json', routeMiddleware, (req, res) => {
    console.log('[Route Handler] Sending Contact JSON');
    res.json({
        page: 'contact',
        email: 'contact@example.com',
        message: req.customData.message
    });
});

// Error Route
app.get('/error', (req, res, next) => {
    console.log('[Route Handler] About to throw an error');
    next(new Error('This is a forced error'));
});

// ===== 404 Middleware =====
app.use((req, res, next) => {
    console.log(`[404 Middleware] ${req.url} not found`);
    res.status(404).send('Page not found');
});

// ===== Error-handling Middleware =====
app.use((err, req, res, next) => {
    console.error(`[Error Middleware] ${err.message}`);
    res.status(500).send('Something went wrong!');
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});