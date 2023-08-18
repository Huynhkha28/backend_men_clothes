import { modelUserSignup, checkEmailExists, getPasswordInDB } from '../models/userModel.js'
import pool from '../config/connectDB.js';
import bcrypt from 'bcrypt';

export const handleLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const isEmailExists = await checkEmailExists(connection, req.body.email); // sử dụng một hàm kiểm tra email để kiểm tra sự tồn tại
        if (isEmailExists) {
            const passwordInDB = await getPasswordInDB(connection, req.body.email);
            const isPasswordValid = bcrypt.compareSync(req.body.password, passwordInDB); // kiểm tra mật khẩu nhập với mật khẩu trong csdl
            console.log(isPasswordValid);
            if (isPasswordValid) {
                return res.status(200).json({
                    success: true,
                    errCode: 0,
                    message: 'Đã đăng nhập thành công!'
                })
            }
            else {
                return res.status(409).json({
                    success: false,
                    errCode: 2,
                    message: 'Sai email hoặc mật khẩu, lui lòng nhập lại!'
                })
            }
        }
        else {
            return res.status(409).json({
                success: false,
                errCode: 1,
                message: 'Sai email hoặc mật khẩu, lui lòng nhập lại!'
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const handleSignup = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const isEmailExists = await checkEmailExists(connection, req.body.email); // sử dụng một hàm kiểm tra email để kiểm tra sự tồn tại
        if (isEmailExists) {
            return res.status(409).json({
                errCode: 1,
                message: 'Email đã được đăng ký, vui lòng sử dụng một email khác!'
            })
        }
        else { //nếu email chưa tồn tại, tiếp tục kiểm tra mật khẩu nhập lại
            if (req.body.password !== req.body.repassword) { // kiểm tra mật khẩu nhập lại có trùng khớp hay không
                return res.status(400).json({
                    errCode: 2,
                    message: 'Mật khẩu lặp lại không trùng khớp, vui lòng nhập lại'
                })
            }
            else {// nếu trùng khớp thì tiến hành tạo người dùng mới
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);
                const passwordHashed = bcrypt.hashSync(req.body.password, salt); // hashed password,
                const userData = {userName: req.body.userName, email: req.body.email, password: passwordHashed }; //tạo object dữ liệu người dùng
                const userCreationStatus = await modelUserSignup(connection, userData); //tiến hành thêm người dùng
                if (userCreationStatus) {
                    return res.status(200).json({
                        errCode: 0,
                        message: "Bạn đã đăng ký thành công!"
                    });
                }
            }
        }
        connection.release();
    } catch (error) {
        console.log(error);
    }
}
