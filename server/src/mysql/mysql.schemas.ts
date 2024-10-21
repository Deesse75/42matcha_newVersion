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
    photo1 LONGBLOB,
    photo2 LONGBLOB,
    photo3 LONGBLOB,
    photo4 LONGBLOB,
    photo5 LONGBLOB,
    ageMin INT DEFAULT 0,
    ageMax INT DEFAULT 0,
    genderLookFor VARCHAR(200),
    lastConnection Date,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_lastConnection (lastConnection),
    INDEX idx_age (age)
  );
`;

export const userTagsSchema = `
  CREATE TABLE IF NOT EXISTS UserTags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    tagName VARCHAR(200) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (userId, tagName)
  );
`;

export const likeHistorySchema = `
  CREATE TABLE IF NOT EXISTS LikeHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const viewHistorySchema = `
  CREATE TABLE IF NOT EXISTS ViewHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const banHistorySchema = `
  CREATE TABLE IF NOT EXISTS BanHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (senderId, receiverId),
    UNIQUE (receiverId, senderId)
  );
`;

export const chatHistorySchema = `
  CREATE TABLE IF NOT EXISTS ChatHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES User(id) ON DELETE CASCADE
  );
`;
