export const userSchema = `
  CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    emailCertified BOOLEAN DEFAULT FALSE,
    emailCode VARCHAR(6),
    hashedPassword VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    age INT DEFAULT 0,
    gender VARCHAR(200),
    orientation VARCHAR(200),
    region VARCHAR(200),
    county VARCHAR(200),
    town VARCHAR(200),
    tall INT DEFAULT 0,
    biography TEXT,
    fameRating INT DEFAULT 0,
    photo LONGBLOB,
    lastConnection Date,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_lastConnection (lastConnection),
    INDEX idx_age (age)
  );
`;

export const photosPlusSchema = `
  CREATE TABLE IF NOT EXISTS PhotosPlus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL UNIQUE,
    photo2 LONGBLOB,
    photo3 LONGBLOB,
    photo4 LONGBLOB,
    photo5 LONGBLOB,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  );
`;

export const tagsSchema = `
  CREATE TABLE IF NOT EXISTS Tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    tagName VARCHAR(200) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (userId, tagName)
  );
`;

export const lastSearchSchema = `
  CREATE TABLE IF NOT EXISTS LastSearch (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL UNIQUE,
    ageMin INT DEFAULT 18,
    ageMax INT DEFAULT 120,
    tallMin INT DEFAULT 50,
    tallMax INT DEFAULT 250,
    gender VARCHAR(200),
    orientation VARCHAR(200),
    withPhoto BOOLEAN DEFAULT FALSE,
    withBio BOOLEAN DEFAULT FALSE,
    fameRatingMin INT DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  );
`;

export const likeTableSchema = `
  CREATE TABLE IF NOT EXISTS LikeTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const viewTableSchema = `
  CREATE TABLE IF NOT EXISTS ViewTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const banTableSchema = `
  CREATE TABLE IF NOT EXISTS BanTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const muteTableSchema = `
  CREATE TABLE IF NOT EXISTS MuteTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const chatTableSchema = `
  CREATE TABLE IF NOT EXISTS ChatTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    message TEXT NOT NULL,
    readed BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE
  );
`;

export const notifTableSchema = `
  CREATE TABLE IF NOT EXISTS NotifTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  );
`;
