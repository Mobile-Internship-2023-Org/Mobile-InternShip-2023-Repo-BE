import connection from "../config/connecttion";
import bcrypt from "bcrypt";

// Lấy thông tin người dùng theo id
const getUserById = (req, res) => {
    console.log("get user by id");
    const query = "SELECT * FROM nguoidung WHERE idNguoiDung = ?";
    const params = req.params.id;
    connection.query(query, params, (err, result) => {
        if (err) {
            console.error("Error querying user by id:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        
        console.log("getUserById", result);
        return res.send(result[0]);
    });
};

// Cập nhật mật khẩu của người dùng theo id
const updatePasswordById = (req, res) => {
    console.log("update password by id");
    const { id, currentPassword, newPassword } = req.body;

    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const query = "SELECT * FROM nguoidung WHERE idNguoiDung = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error querying user by id:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        // So sánh mật khẩu hiện tại
        bcrypt.compare(currentPassword, user.matKhau, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: "Invalid current password" });
            }

            // Hash mật khẩu mới
            bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing new password:', err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }

                // Cập nhật mật khẩu mới vào cơ sở dữ liệu
                const updateQuery = 'UPDATE nguoidung SET matKhau = ? WHERE idNguoiDung = ?';
                connection.query(updateQuery, [hashedPassword, id], (error, updateResult) => {
                    if (error) {
                        console.error('Error updating password:', error);
                        return res.status(500).json({ message: "Internal Server Error" });
                    }
                    console.log('Password updated successfully');
                    return res.status(200).json({ message: "Password updated successfully" });
                });
            });
        });
    });
};

module.exports = {
    getUserById,
    updatePasswordById
};
