export const user = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

export const retail_user = `CREATE TABLE IF NOT EXISTS retail_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    firstName VARCHAR(255) NOT NULL,
    secondName VARCHAR(255),
    lastName VARCHAR(255) NOT NULL,
    Occupation VARCHAR(255),
    residentialAddress VARCHAR(255),
    phoneNo VARCHAR(255),
    companyName VARCHAR(255),
    designation VARCHAR(255),
    companyAddress VARCHAR(255),
    reference VARCHAR(255),
    preferredCurrency VARCHAR(255),
    website VARCHAR(255),
    documentType VARCHAR(255)
)`;

export const corporate_user = `CREATE TABLE IF NOT EXISTS corporate_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    industry VARCHAR(255) NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    phoneNo1 VARCHAR(255) NOT NULL,
    phoneNo2 VARCHAR(255),
    landlineNo VARCHAR(255),
    website VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    address3 VARCHAR(255)
)`;

export const vendor = `CREATE TABLE IF NOT EXISTS vendor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    areaOfWork VARCHAR(255) NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    phoneNo1 VARCHAR(255) NOT NULL,
    phoneNo2 VARCHAR(255),
    landlineNo VARCHAR(255),
    website VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255),
    address3 VARCHAR(255)
)`;

export const train = `CREATE TABLE IF NOT EXISTS train (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    name VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    \`from\` VARCHAR(255) NOT NULL,
    \`to\` VARCHAR(255) NOT NULL,
    classOfTravel VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    trainNo VARCHAR(255),
    timePreference VARCHAR(255)
)`;

export const air = `CREATE TABLE IF NOT EXISTS air (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    name VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    \`from\` VARCHAR(255) NOT NULL,
    \`to\` VARCHAR(255) NOT NULL,
    classOfTravel VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    flightNo VARCHAR(255),
    timePreference VARCHAR(255)
)`;

export const volvoBus = `CREATE TABLE IF NOT EXISTS bus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    name VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pickupLocation VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    seatType VARCHAR(255),
    remarks VARCHAR(255)
)`;

export const cab = `CREATE TABLE IF NOT EXISTS cab (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    tourPlan VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    pickupCountry VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cabRequiredFor VARCHAR(255) NOT NULL,
    pickupDate VARCHAR(255) NOT NULL,
    pickupTime VARCHAR(255) NOT NULL,
    pickupAddress VARCHAR(255) NOT NULL,
    dropDate VARCHAR(255) NOT NULL,
    dropTime VARCHAR(255) NOT NULL,
    dropAddress VARCHAR(255) NOT NULL,
    cabDuration VARCHAR(255) NOT NULL,
    NoOfCabs VARCHAR(255),
    typeOfCabs VARCHAR(255),
    noOfPassengers VARCHAR(255),
    travellingWith VARCHAR(255),
    remarks VARCHAR(255)
)`; 

export const hotel = `CREATE TABLE IF NOT EXISTS hotel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    name VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hotelName VARCHAR(255) NOT NULL,
    hotelAddress VARCHAR(255) NOT NULL,
    hotelContactNo VARCHAR(255) NOT NULL,
    mealPlan VARCHAR(255) NOT NULL,
    roomCategory VARCHAR(255) NOT NULL,
    checkInDate VARCHAR(255) NOT NULL,
    checkOutDate VARCHAR(255) NOT NULL,
    numberOfNights VARCHAR(255) NOT NULL,
    noOfRooms VARCHAR(255) NOT NULL,
    adults VARCHAR(255) NOT NULL,
    children VARCHAR(255) NOT NULL,
    infants VARCHAR(255) NOT NULL
)`