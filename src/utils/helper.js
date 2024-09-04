import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ExcelJS from "exceljs";
import fs from 'fs';

/**
 * @hashPassword
 * @params password
 * @Description : This function is used to hash the password
 * @returns hashedPassword
 */
export const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

/**
 * @comparePassword
 * @params password, hashedPassword
 * @Description : This function is used to compare the password
 * @returns isMatch
 */
export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

/**
 * @generateToken
 * @params payload
 * @Description : This function is used to generate token
 * @returns token
 */
export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );
};

/**
 * @isValuePresent
 * @params obj
 * @Description : This function is used to check if the value is present
 * @returns boolean
 */
export function isValuePresent(obj) {
    return Object.values(obj).every(value => value !== undefined && value !== null && value !== "");
}

/**
 * @generateOTP
 * @params length
 * @Description : This function is used to generate OTP
 * @returns otp
 */
export const generateOTP = (length) => {
    const characters = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return parseInt(otp);
}

/**
 * @generateCompanyId
 * @params name
 * @Description : This function is used to generate company id
 * @returns id
 */
export function generateCompanyId(name) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const nameDigits = name.slice(0, 4).toUpperCase();
    const id = `${nameDigits}${randomNumber}`;
    return id;
}

/**
 * @generateBranchId
 * @params name
 * @Description : This function is used to generate branch id
 * @returns id
 */
export function generateBranchId(branchName) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const nameDigits = branchName.slice(0, 4).toUpperCase();
    const id = `${nameDigits}${randomNumber}`;
    return id;
}

/**
 * @calculateAge
 * @params dob
 * @Description : This function is used to calculate age
 * @returns age
 */
export function calculateAge(dob) {
    const dateOfBirth = typeof dob === 'string' ? new Date(dob) : dob;

    if (isNaN(dateOfBirth.getTime())) {
        return "Invalid date of birth";
    }

    const currentDate = new Date();
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = currentDate.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dateOfBirth.getDate())) {
        age--;
    }

    return age;
}

/**
 * @generateExcelSheet
 * @params data, fileName
 * @Description : This function is used to generate excel sheet
 */
export async function generateExcelSheet(data, fileName, travelModeType) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet1");

    // Define constants for headers
    const headers = [
        "Full Name", "Age", "DOB", "Gender", "Contact No", "Email",
        "Travel Itinerary",
        "Travel Mode",
        "Travel Details",
        "Remarks"
    ];

    const subHeaders = [
        "", "", "", "", "", "", "Travel From", "Travel To", "", "Class Of Travel", "Travel Date",
        `${travelModeType}`, `${travelModeType === "Bus No" ? "Seat Type" : "Time Preference"}`
    ];

    // Add headers and sub-headers
    sheet.addRow(headers);
    sheet.addRow(subHeaders);

    // Define column configurations
    const columnConfigs = [
        { header: "Full Name", key: "Full Name", width: 20 },
        { header: "Age", key: "Age", width: 10 },
        { header: "DOB", key: "DOB", width: 15 },
        { header: "Gender", key: "Gender", width: 15 },
        { header: "Contact No", key: "Contact No", width: 15 },
        { header: "Email", key: "Email", width: 25 },
        { header: "Travel Itinerary", key: "Travel From", width: 20 },
        { header: "", key: "Travel To", width: 20 }, // Empty for merging
        { header: "Travel Mode", key: "Travel Mode", width: 15 },
        { header: "Travel Details", key: "Class Of Travel", width: 20 },
        { header: "", key: "Travel Date", width: 20 }, // Empty for merging
        { header: "Remarks", key: `${travelModeType}`, width: 15 },
        { header: "", key: `${travelModeType === "Bus No" ? "Seat Type" : "Time Preference"}`, width: 20 } // Empty for merging
    ];

    // Set columns in the sheet
    sheet.columns = columnConfigs;

    // Add data rows
    data.forEach((row) => {
        sheet.addRow(row);
    });

    // Merge header cells
    const mergeRanges = [
        "A1:A2", // Full Name
        "B1:B2", // Age
        "C1:C2", // DOB
        "D1:D2", // Gender
        "E1:E2", // Contact No
        "F1:F2", // Email
        "G1:H1", // Travel Itinerary
        "I1:I2", // Travel Mode
        "J1:K1", // Travel Details
        "L1:M1"  // Remarks
    ];

    mergeRanges.forEach(range => sheet.mergeCells(range));

    const applyHeaderStyles = (row) => {
        row.font = { bold: true };
        row.alignment = { vertical: "middle", horizontal: "center" };
    };

    applyHeaderStyles(sheet.getRow(1));
    applyHeaderStyles(sheet.getRow(2));

    await workbook.xlsx.writeFile(fileName);

    // Automatically delete the file after 10 seconds
    setTimeout(() => {
        fs.unlink(fileName, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
            } else {
                console.log(`File deleted successfully: ${fileName}`);
            }
        });
    }, 10000);
}