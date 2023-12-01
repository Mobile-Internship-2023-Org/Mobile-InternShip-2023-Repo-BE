import connection from "../config/connecttion";

// Hàm để thay đổi mật khẩu
const changePassword = (userId, newPassword) => {
    bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing new password:', err);
        return;
      }
  
      const updateQuery = 'UPDATE nguoidung SET password = ? WHERE id = ?';
  
      connection.query(updateQuery, [hashedPassword, userId], (error, results) => {
        if (error) {
          console.error('Error updating password:', error);
          return;
        }
  
        console.log('Password updated successfully');
      });
    });
  };
  
  // Sử dụng hàm để thay đổi mật khẩu
  const userIdToUpdate = 1; // Thay thế bằng ID của người dùng cần thay đổi mật khẩu
  const newPassword = 'new_secure_password';
  
  changePassword(userIdToUpdate, newPassword);
  
  // Đóng kết nối sau khi hoàn tất công việc
  connection.end();