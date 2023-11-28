const mysql = require("mysql2");

// Get the command line arguments
const args = process.argv.slice(2);

// Check if the command includes the argument "-- onlinedb"
const useOnlineDatabase = args.includes("onlinedb");

let connection;

let databaseType = "";

if (useOnlineDatabase) {
  // Online database configuration
  connection = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12664462',
    password: 'M4vQ9mDWYn',
    database: 'sql12664462',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  databaseType = "online";
} else {
  // Local database configuration
  connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "foody",
  });
  databaseType = "local";
}

const initializeConnection = async () => {
  try {
    // Measure time taken to initialzie the connection
    const startTime = performance.now();

    // Use the connection to ensure it's established
    await connection.promise().execute("SELECT 1");

    const endTime = performance.now();
    const timeTaken = (endTime - startTime) / 1000;

    console.log(`Kết nối thành công với MySQL: ${timeTaken.toFixed(2)} giây`);
    console.log(`Loại database: ${databaseType}`);
  } catch (error) {
    console.error("Lỗi khi kết nối đến cơ sở dữ liệu:", error);
    throw error;
  }
};

initializeConnection();


module.exports = connection;
