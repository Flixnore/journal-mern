-- Create users
CREATE USER 'yeet2'@'localhost' IDENTIFIED WITH mysql_native_password BY 'purplemouse37';
GRANT EXECUTE, SELECT,  DELETE, INSERT, UPDATE ON journal.* TO 'yeet2'@'localhost';
FLUSH PRIVILEGES;
