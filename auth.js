const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        
        if (!token) {
            req.flash('error', 'Please log in to access this page');
            return res.redirect('/admin/login');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.adminId = decoded.id;
            // Add user info to locals for views
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            // Token verification failed
            res.clearCookie('adminToken');
            req.flash('error', 'Session expired. Please log in again');
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = authMiddleware; 