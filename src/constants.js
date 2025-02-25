export const admin = `CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT "admin" NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

// Users
export const user = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyId VARCHAR(255) UNIQUE default "ABCD1234" NOT NULL,
    email VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    userType VARCHAR(255) NOT NULL,
    otp VARCHAR(6),
    otpExpires DATETIME
)`;

export const retail_user = `CREATE TABLE IF NOT EXISTS retail_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    firstName VARCHAR(255) NOT NULL,
    secondName VARCHAR(255),
    lastName VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    occupation VARCHAR(255),
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
    website VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    website VARCHAR(255) NOT NULL,
    gstNumber VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    address4 VARCHAR(255),
    services VARCHAR(255) NOT NULL,
    gstNumber VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;


// Travel
export const train = `CREATE TABLE IF NOT EXISTS train (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    fullName VARCHAR(255) NOT NULL,
    age VARCHAR(255),
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
    adult VARCHAR(2),
    children VARCHAR(2),
    remarks VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

export const air = `CREATE TABLE IF NOT EXISTS air (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    fullName VARCHAR(255) NOT NULL,
    age VARCHAR(255),
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
    adult VARCHAR(2),
    children VARCHAR(2),
    remarks VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

export const volvoBus = `CREATE TABLE IF NOT EXISTS bus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    fullName VARCHAR(255) NOT NULL,
    age VARCHAR(255),
    dob VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pickupLocation VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    travelDate VARCHAR(255) NOT NULL,
    seatType VARCHAR(255),
    busNo VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

export const cab = `CREATE TABLE IF NOT EXISTS cab (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    pickupCountry VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    tourPlan VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    alternateContactNo VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    cabRequiredAt VARCHAR(255) NOT NULL,
    cabRequiredFor VARCHAR(255) NOT NULL,
    localTravelKmsLimit VARCHAR(255),
    pickupDateTime VARCHAR(255) NOT NULL,
    pickupAddress VARCHAR(255) NOT NULL,
    pickupLandmark VARCHAR(255),
    dropDateTime VARCHAR(255) NOT NULL,
    dropAddress VARCHAR(255) NOT NULL,
    dropLandmark VARCHAR(255),
    cabDuration VARCHAR(255) NOT NULL,
    noOfCabsRequired VARCHAR(255) NOT NULL,
    typeOfCabRequired VARCHAR(255) NOT NULL,
    noOfPersonsTravelling VARCHAR(255) NOT NULL,
    noOfInfants VARCHAR(255),
    noOfChildren VARCHAR(255) NOT NULL,
    otherRequirements VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;


// Services
export const hotel = `CREATE TABLE IF NOT EXISTS hotel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    nationality VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    contactNo1 VARCHAR(255) NOT NULL,
    contactNo2 VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    roomCategory VARCHAR(255) NOT NULL,
    mealPlan VARCHAR(255) NOT NULL,
    hotelCategory VARCHAR(255) NOT NULL,
    priceRange VARCHAR(255) NOT NULL,
    checkInDate VARCHAR(255) NOT NULL,
    checkOutDate VARCHAR(255) NOT NULL,
    numberOfNights VARCHAR(255) NOT NULL,
    numberOfRooms VARCHAR(255) NOT NULL,
    adults VARCHAR(255) NOT NULL,
    children VARCHAR(255) NOT NULL,
    infants VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const passport = `CREATE TABLE IF NOT EXISTS passport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    totalNoOfTravellers VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    age VARCHAR(255),
    gender VARCHAR(255) NOT NULL,
    passportNo VARCHAR(255) NOT NULL,
    passportIssueDate VARCHAR(255) NOT NULL,
    passportExpiryDate VARCHAR(255) NOT NULL,
    passportValidityPeriod VARCHAR(255) NOT NULL,
    placeOfIssue VARCHAR(255) NOT NULL,
    nomineeName VARCHAR(255) NOT NULL,
    nomineeGender VARCHAR(255) NOT NULL,
    addressWithPinCode VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    holdPassportFrom VARCHAR(255) NOT NULL,
    applyFrom VARCHAR(255) NOT NULL,
    goTo VARCHAR(255) NOT NULL,
    travelEntryDate VARCHAR(255) NOT NULL,
    travelExitDate VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const travelInsurance = `CREATE TABLE IF NOT EXISTS travelInsurance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    age VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tripType VARCHAR(255) NOT NULL,
    startDate VARCHAR(255) NOT NULL,
    endDate VARCHAR(255) NOT NULL,
    preExistingDisease VARCHAR(255) NOT NULL,
    diseaseName VARCHAR(255) NOT NULL,
    smoker VARCHAR(255) NOT NULL,
    passportNo VARCHAR(255) NOT NULL,
    dateOfIssue VARCHAR(255) NOT NULL,
    dateOfExpiry VARCHAR(255) NOT NULL,
    nomineeName VARCHAR(255) NOT NULL,
    nomineeGender VARCHAR(255) NOT NULL,
    nomineeRelationship VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const healthInsurance = `CREATE TABLE IF NOT EXISTS healthInsurance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    age VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    preExistingDisease VARCHAR(255) NOT NULL,
    diseaseName VARCHAR(255) NOT NULL,
    smoker VARCHAR(255) NOT NULL,
    nomineeName VARCHAR(255) NOT NULL,
    nomineeGender VARCHAR(255) NOT NULL,
    nomineeRelationship VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const branch = `CREATE TABLE IF NOT EXISTS branch (
    branchId VARCHAR(255) PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    companyId VARCHAR(255) NOT NULL,
    FOREIGN KEY (companyId) REFERENCES user (companyId),
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    address1 VARCHAR(255) NOT NULL,
    address2 VARCHAR(255) NOT NULL,
    countryCode VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    landlineNumber VARCHAR(255) NOT NULL,
    landlineCityCode VARCHAR(255) NOT NULL,
    landlineCountryCode VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const employee = `CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    branchId VARCHAR(255),
    FOREIGN KEY (branchId) REFERENCES branch (branchId),
    employeeId VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    dob VARCHAR(255) NOT NULL,
    age VARCHAR(255),
    zipCode VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    countryCode VARCHAR(255) NOT NULL,
    contactNo VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const cab_rate_card = `CREATE TABLE IF NOT EXISTS cab_rate_card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    filePath VARCHAR(255),
    fileExists BOOLEAN DEFAULT FALSE,
    type VARCHAR(255),
    city VARCHAR(255),
    vehicleType VARCHAR(255),
    airportPickupRate VARCHAR(255),
    airportDropRate VARCHAR(255),
    fourHourRate VARCHAR(255),
    eightHourRate VARCHAR(255),
    twelveHourRate VARCHAR(255),
    extraKmRate VARCHAR(255),
    extraHourRate VARCHAR(255),
    nightRate VARCHAR(255),
    outstationRate VARCHAR(255),
    outstationExtraKmRate VARCHAR(255),
    outstationExtraHourRate VARCHAR(255),
    outstationNightRate VARCHAR(255),
    rateValidFrom VARCHAR(255),
    rateValidTill VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const hotel_rate_card = `CREATE TABLE IF NOT EXISTS hotel_rate_card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    roomId INT,
    FOREIGN KEY (roomId) REFERENCES room (id),
    filePath VARCHAR(255),
    fileExists BOOLEAN DEFAULT FALSE,
    type VARCHAR(255),
    submissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hotelName VARCHAR(255),
    hotelAddress VARCHAR(255),
    hotelState VARCHAR(255),
    hotelCity VARCHAR(255),
    hotelZipCode VARCHAR(255),
    phoneNo VARCHAR(10),
    email VARCHAR(255),
    gstNo VARCHAR(255),
    rateValidFrom DATETIME,
    rateValidTill DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const room = `CREATE TABLE IF NOT EXISTS room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    weekendType VARCHAR(255),
    roomType VARCHAR(255),
    occupancyType VARCHAR(255),
    roomOnlyRate VARCHAR(255),
    cpaiRate VARCHAR(255),
    mapiRate VARCHAR(255),
    epRate VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const event_rate_card = `CREATE TABLE IF NOT EXISTS event_rate_card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    confHall INT,
    FOREIGN KEY (confHall) REFERENCES conference_hall (id),
    filePath VARCHAR(255),
    fileExists BOOLEAN DEFAULT FALSE,
    type VARCHAR(255),
    noOfConfHall BOOLEAN DEFAULT FALSE,
    highTeaOneTimeCharges VARCHAR(255),
    highTeaTwoTimeCharges VARCHAR(255),
    highTeaWithCookiesOneTimeCharges VARCHAR(255),
    highTeaWithCookiesTwoTimeCharges VARCHAR(255),
    cocktailCharges VARCHAR(255),
    perDayChargesForProjectors VARCHAR(255),
    djCharges VARCHAR(255),
    otherActivities VARCHAR(255),
    complementaryServices VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const conference_hall = `CREATE TABLE IF NOT EXISTS conference_hall (
    id INT AUTO_INCREMENT PRIMARY KEY,
    noOfConferenceHall VARCHAR(255),
    typeOfConferenceHall VARCHAR(255),
    conferenceHallStrength VARCHAR(255),
    conferenceHallCharges VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const log_messages = `CREATE TABLE IF NOT EXISTS logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    userType VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

export const contact = `CREATE TABLE IF NOT EXISTS contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phoneNoOne VARCHAR(15) NOT NULL,
    phoneNoTwo VARCHAR(15),
    type VARCHAR(255) NOT NULL,
    profession VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

export const RETAIL_TYPE_NAME = "VCkT1O2TS3ccRwByXW"
export const CORPORATE_TYPE_NAME = "Q5UZcJ9Z5RnXb5hJy"
export const VENDOR_TYPE_NAME = "G4Jt5Fw9U8VvIv3z"