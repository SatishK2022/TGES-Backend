export const user = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

export const retail_user = `CREATE TABLE IF NOT EXISTS retail_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    firstName VARCHAR(255) NOT NULL,
    secondName VARCHAR(255),
    lastName VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    Occupation VARCHAR(255),
    phoneNumber1 VARCHAR(255) NOT NULL,
    phoneNumber2 VARCHAR(255),
    residentialAddress VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    countryCode VARCHAR(255),
    stateCode VARCHAR(255),
    companyName VARCHAR(255),
    designation VARCHAR(255),
    companyAddress VARCHAR(255),
    howDidYouKnow VARCHAR(255),
    preferredCurrency VARCHAR(255),
    website VARCHAR(255)
)`;

export const corporate_user = `CREATE TABLE IF NOT EXISTS corporate_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    industry VARCHAR(255) NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255) NOT NULL,
    address3 VARCHAR(255),
    address4 VARCHAR(255),
    phoneNumber VARCHAR(255) NOT NULL,
    countryCode VARCHAR(255),
    stateCode VARCHAR(255),
    landlineNumber VARCHAR(255),
    landlineCityCode VARCHAR(255),
    landlineCountryCode VARCHAR(255),
    contactDepartment VARCHAR(255),
    contactPersonFirstName VARCHAR(255) NOT NULL,
    contactPersonSecondName VARCHAR(255),
    contactPersonLastName VARCHAR(255) NOT NULL,
    contactPersonGender VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL
)`;

export const vendor = `CREATE TABLE IF NOT EXISTS vendor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    areaOfWork VARCHAR(255) NOT NULL,
    companyName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    countryCode VARCHAR(255),
    stateCode VARCHAR(255),
    contactPersonFirstName VARCHAR(255) NOT NULL,
    contactPersonSecondName VARCHAR(255),
    contactPersonLastName VARCHAR(255) NOT NULL,
    contactPersonGender VARCHAR(255) NOT NULL,
    landlineCityCode VARCHAR(255),
    landlineCountryCode VARCHAR(255),
    landlineNumber VARCHAR(255),
    website VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255) NOT NULL,
    address3 VARCHAR(255),
    address4 VARCHAR(255)
)`;

export const train = `CREATE TABLE IF NOT EXISTS train (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    fullName VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    travelFrom VARCHAR(255) NOT NULL,
    travelTo VARCHAR(255) NOT NULL,
    classOfTravel VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    trainNo VARCHAR(255),
    timePreference VARCHAR(255),
    remarks VARCHAR(255)
)`;

export const air = `CREATE TABLE IF NOT EXISTS air (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    fullName VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    travelFrom VARCHAR(255) NOT NULL,
    travelTo VARCHAR(255) NOT NULL,
    classOfTravel VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    flightNo VARCHAR(255),
    timePreference VARCHAR(255),
    remarks VARCHAR(255)
)`;

export const volvoBus = `CREATE TABLE IF NOT EXISTS bus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    fullName VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pickupLocation VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    seatType VARCHAR(255),
    busNo VARCHAR(255)
)`;

export const cab = `CREATE TABLE IF NOT EXISTS cab (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    tourPlan VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cabRequiredFor VARCHAR(255) NOT NULL,
    pickUpDate VARCHAR(255) NOT NULL,
    pickUpAddress VARCHAR(255) NOT NULL,
    dropDate VARCHAR(255) NOT NULL,
    dropAddress VARCHAR(255) NOT NULL,
    cabDuration VARCHAR(255) NOT NULL,
    noOfCab VARCHAR(255) NOT NULL,
    noOfPersons VARCHAR(255) NOT NULL,
    travellingWithInfant VARCHAR(255),
    otherRequirements VARCHAR(255)
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