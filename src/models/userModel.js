export const modelUserSignup = (connection, userData) => {
    return new Promise(async (resolve, reject) => {
        try {   
            const query = 'INSERT INTO `user` (user_full_name, user_email, user_password) VALUES (?, ?, ?)';
            const [result] = await connection.query(query, [userData.userName, userData.email, userData.password])
                if (result.affectedRows ===1) {
                    resolve(true);
                }
                else{
                    resolve(false);
                }
        } catch (err) {
            console.error('Error in modelUserSignup:', err);
            reject(err);
        }
    });
}
export const checkEmailExists = (connection, email) => {
    return new Promise(async (resolve, reject) => {
        try {// tạo kết nối đến csdl và kiểm tra sự tồn tại của email
            const [rows] = await connection.query('SELECT * FROM `user` WHERE user_email = ?', [email]);
            if (rows.length > 0) {// nếu độ dài của mảng kết quả lớn hơn 0, tức là đã có email tồn tại
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
export const getPasswordInDB = async (connection, email) => {
    return new Promise( async (resolve, reject) => {
        try {
            const [userPassword] = await connection.query('SELECT user_password FROM `user` WHERE user_email = ?', [email]);
            resolve(userPassword[0].user_password);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}