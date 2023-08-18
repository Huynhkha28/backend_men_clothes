import { modelGetCategories } from "../models/homePageModel.js";
import pool from '../config/connectDB.js';
export const handleGetCategories = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [categories_data] = await modelGetCategories(connection);
        connection.release();
        res.status(200).json(categories_data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
}