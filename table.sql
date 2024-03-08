CREATE TABLE registration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  email VARCHAR(255),
  mobile INT,
  password VARCHAR(255),
  user_type_id INT
);

CREATE TABLE stalls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stallName VARCHAR(255),
  stallDescription VARCHAR(255),
  photoUrl VARCHAR(255),
  videoUrl VARCHAR(255),
  brochureUrl VARCHAR(255),
);

