export const userSchema = `
  CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    emailCertified BOOLEAN DEFAULT FALSE,
    emailCode VARCHAR(6) DEFAULT '0000',
    hashedPassword VARCHAR(255) NOT NULL,
    birthdate DATE,
    age INT DEFAULT 0,
    gender VARCHAR(200),
    orientation VARCHAR(200),
    region VARCHAR(200),
    departement VARCHAR(200),
    ville VARCHAR(200),
    tall INT DEFAULT 0,
    biography TEXT,
    fameRating INT DEFAULT 0,
    photo1 LONGBLOB,
    photo2 LONGBLOB,
    photo3 LONGBLOB,
    photo4 LONGBLOB,
    photo5 LONGBLOB,
    ageMinLookFor INT DEFAULT 18,
    ageMaxLookFor INT DEFAULT 120,
    genderLookFor VARCHAR(200),
    orientationLookFor VARCHAR(200),
    locationLookFor VARCHAR(200),
    tallMinLookFor INT DEFAULT 50,
    tallMaxLookFor INT DEFAULT 300,
    withPhoto BOOLEAN DEFAULT FALSE,
    withBiography BOOLEAN DEFAULT FALSE,
    withConnectionOn BOOLEAN DEFAULT FALSE,
    lastConnection TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_lastConnection (lastConnection),
    INDEX idx_age (age)
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

export const tagHistorySchema = `
  CREATE TABLE IF NOT EXISTS TagHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    tagName VARCHAR(200) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    UNIQUE (userId, tagName)
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
