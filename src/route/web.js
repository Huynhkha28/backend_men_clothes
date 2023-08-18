import express from 'express';
import { handleLogin, handleSignup} from '../controllers/userController.js';
import { handleGetCategories} from '../controllers/homePageController.js';
const router = express.Router();

export default function initWebRoutes(app) {
    router.post('/api/login', handleLogin);
    router.post('/api/signup', handleSignup);
    router.get('/api/categories', handleGetCategories);
    
    return app.use('/', router);
}
