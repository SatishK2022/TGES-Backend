export function forgotPasswordTemplate(otp) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forgot Password OTP</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

            }

            p {
                margin-bottom: 10px;
            }

            p:last-child {
                font-weight: bold;
            }

            h2 {
                font-size: 25px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <p>We have received a request to reset your password. Please enter the OTP code below to continue.</p>
            <h2>${otp}</h2>
            <p>If you did not request a password reset, please ignore this email and your password will remain unchanged.</p>
            <p>Regards<br>
                TGES Travel
            </p>
        </div>
    </body>
    </html>
    `
}

export function retailRegisterTemplate({ fullName, email, residentialAddress, city, country, state, zipCode, phoneNumber1 }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>User Registration</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <p>Dear ${fullName},</p>
        <p>
            On Behalf of our team, we would like to thank you for considering TGES as your travel partner by submitting your
            documents for Registration at <a href="https://tgestravel.com" target="_blank">www.tgestravel.com</a> Our support team shall revert to you with the registration
            details & remaining formalities, if required. On fulfilling the pending documents requirement, your log in
            details along with the welcome kit will be emailed to you.
        </p>
        <table>
            <tr>
                <th colspan="4">Registration Details</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>${fullName}</td>
                <td>Address</td>
                <td>${residentialAddress}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>City</td>
                <td>${city}</td>
            </tr>
            <tr>
                <td>Phone Number</td>
                <td>${phoneNumber1}</td>
                <td>Country</td>
                <td>${country}</td>
            </tr>
            <tr>
                <td>State</td>
                <td>${state}</td>
                <td>Postal Code</td>
                <td>${zipCode}</td>
            </tr>
        </table>

        <p>Thank you for choosing TGES. We are thrilled to have you with us. We look forward to working with you.
        
        <p>Regards,</p>
        <p>TGES Team</p>
    </body>
    </html>`
}

export function corporateRegisterTemplate({ companyName, address, city, country, state, zipCode, phoneNumber, contactPerson, landlineNumber, email }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>User Registration</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <p>Dear User,</p>
        <p>
            On Behalf of our team, we would like to thank you for considering TGES as your travel partner by submitting your
            documents for Registration at <a href="https://tgestravel.com" target="_blank">www.tgestravel.com</a> Our support team shall revert to you with the registration
            details & remaining formalities, if required. On fulfilling the pending documents requirement, your log in
            details along with the welcome kit will be emailed to you.
        </p>
        <table>
            <tr>
                <th colspan="4">Registration Details</th>
            </tr>
            <tr>
                <td>Company Name</td>
                <td>${companyName}</td>
                <td>Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Contact Person</td>
                <td>${contactPerson}</td>
                <td>Country</td>
                <td>${country}</td>
            </tr>
            <tr>
                <td>Phone Number</td>
                <td>${phoneNumber}</td>
                <td>City</td>
                <td>${city}</td>
            </tr>
            <tr>
                <td>Landline Number</td>
                <td>${landlineNumber}</td>
                <td>State</td>
                <td>${state}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Postal Code</td>
                <td>${zipCode}</td>
            </tr>
            
        </table>

        <p>Thank you for choosing TGES. We are thrilled to have you with us. We look forward to working with you.
        
        <p>Regards,</p>
        <p>TGES Team</p>
    </body>
    </html>
    `
}

export function vendorRegisterTemplate({ companyName, address, city, country, state, zipCode, phoneNumber, contactPerson, landlineNumber, email }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>User Registration</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <p>Dear User,</p>
        <p>
            On Behalf of our team, we would like to thank you for considering TGES as your travel partner by submitting your
            documents for Registration at <a href="https://tgestravel.com" target="_blank">www.tgestravel.com</a> Our support team shall revert to you with the registration
            details & remaining formalities, if required. On fulfilling the pending documents requirement, your log in
            details along with the welcome kit will be emailed to you.
        </p>
        <table>
            <tr>
                <th colspan="4">Registration Details</th>
            </tr>
            <tr>
                <td>Company Name</td>
                <td>${companyName}</td>
                <td>Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Contact Person</td>
                <td>${contactPerson}</td>
                <td>Country</td>
                <td>${country}</td>
            </tr>
            <tr>
                <td>Phone Number</td>
                <td>${phoneNumber}</td>
                <td>City</td>
                <td>${city}</td>
            </tr>
            <tr>
                <td>Landline Number</td>
                <td>${landlineNumber}</td>
                <td>State</td>
                <td>${state}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Postal Code</td>
                <td>${zipCode}</td>
            </tr>
            
        </table>

        <p>Thank you for choosing TGES. We are thrilled to have you with us. We look forward to working with you.
        
        <p>Regards,</p>
        <p>TGES Team</p>
    </body>
    </html>
    `
}

export function trainBookingTemplate(data) {
    let passengerTable = '';

    data.forEach(passenger => {
        passengerTable += `
            <table>
                <tr>
                    <th colspan="4">Passenger ${passengerTable.split('</table>').length}</th>
                </tr>
                <tr>
                    <td>Full Name</td>
                    <td>${passenger.fullName}</td>
                    <td>Date of Birth</td>
                    <td>${passenger.dob}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${passenger.gender}</td>
                    <td>Contact Number</td>
                    <td>${passenger.contactNo}</td>
                </tr>
                <tr>
                    <td>Travel From</td>
                    <td>${passenger.travelFrom}</td>
                    <td>Class of Travel</td>
                    <td>${passenger.classOfTravel}</td>
                </tr>
                <tr>
                    <td>Travel To</td>
                    <td>${passenger.travelTo}</td>
                    <td>Travel Date</td>
                    <td>${passenger.travelDate}</td>
                </tr>
                <tr>
                    <td>Train Number</td>
                    <td>${passenger?.trainNo || "N/A"}</td>
                    <td>Time Preference</td>
                    <td>${passenger?.timePreference || "N/A"}</td>
                </tr>
            </table>`
    })

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Train Booking Confirmation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }        
        </style>
    </head>
    <body>
        <h1>Train Booking Confirmation</h1>
        ${passengerTable}
    </body>
    </html>`
}

export function airBookingTemplate(data) {
    let passengerTable = '';

    data.forEach(passenger => {
        passengerTable += `
            <table>
                <tr>
                    <th colspan="4">Passenger ${passengerTable.split('</table>').length}</th>
                </tr>
                <tr>
                    <td>Full Name</td>
                    <td>${passenger.fullName}</td>
                    <td>Date of Birth</td>
                    <td>${passenger.dob}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${passenger.gender}</td>
                    <td>Contact Number</td>
                    <td>${passenger.contactNo}</td>
                </tr>
                <tr>
                    <td>Travel From</td>
                    <td>${passenger.travelFrom}</td>
                    <td>Class of Travel</td>
                    <td>${passenger.classOfTravel}</td>
                </tr>
                <tr>
                    <td>Travel To</td>
                    <td>${passenger.travelTo}</td>
                    <td>Travel Date</td>
                    <td>${passenger.travelDate}</td>
                </tr>
                <tr>
                    <td>Flight Number</td>
                    <td>${passenger?.flightNo || "N/A"}</td>
                    <td>Time Preference</td>
                    <td>${passenger?.timePreference || "N/A"}</td>
                </tr>
                <tr>
                    <td>Remarks</td>
                    <td>${passenger?.remarks || "N/A"}</td>
                </tr>
            </table>`
    })

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Train Booking Confirmation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }        
        </style>
    </head>
    <body>
        <h1>Flight Booking Confirmation</h1>
        ${passengerTable}
    </body>
    </html>`
}

export function volvoBusBookingTemplate(data) {
    let passengerTable = '';

    data.forEach(passenger => {
        passengerTable += `
            <table>
                <tr>
                    <th colspan="4">Passenger ${passengerTable.split('</table>').length}</th>
                </tr>
                <tr>
                    <td>Full Name</td>
                    <td>${passenger.fullName}</td>
                    <td>Date of Birth</td>
                    <td>${passenger.dob}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${passenger.gender}</td>
                    <td>Contact Number</td>
                    <td>${passenger.contactNo}</td>
                </tr>
                <tr>
                    <td>Pickup Location</td>
                    <td>${passenger.pickupLocation}</td>
                    <td>Seat Type</td>
                    <td>${passenger.seatType}</td>
                </tr>
                <tr>
                    <td>Destination</td>
                    <td>${passenger.destination}</td>
                    <td>Travel Date</td>
                    <td>${passenger.travelDate}</td>
                </tr>
                <tr>
                    <td>Bus Number</td>
                    <td>${passenger?.busNo || "N/A"}</td>
                </tr>
            </table>`
    })

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Volvo Bus Booking Confirmation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }        
        </style>
    </head>
    <body>
        <h1>Volvo Bus Booking Confirmation</h1>
        ${passengerTable}
    </body>
    </html>`
}

export function cabBookingTemplate({ pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cab Booking Confirmation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <h1>Cab Booking Confirmation</h1>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Pickup Country</td>
                <td>${pickupCountry}</td>
                <td>Nationality</td>
                <td>${nationality}</td>
            </tr>
            <tr>
                <td>Tour Plan</td>
                <td>${tourPlan}</td>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Contact Number</td>
                <td>${contactNo}</td>
                <td>Alternate Contact Number</td>
                <td>${alternateContactNo}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Cab Required At</td>
                <td>${cabRequiredAt}</td>
            </tr>
            <tr>
                <td>Cab Required For</td>
                <td>${cabRequiredFor}</td>
                <td>Local Travel Kms Limit</td>
                <td>${localTravelKmsLimit}</td>
            </tr>
            <tr>
                <td>Pickup Date Time</td>
                <td>${pickupDateTime}</td>
                <td>Pickup Address</td>
                <td>${pickupAddress}</td>
            </tr>
            <tr>
                <td>Pickup Landmark</td>
                <td>${pickupLandmark}</td>
                <td>Drop Date Time</td>
                <td>${dropDateTime}</td>
            </tr>
            <tr>
                <td>Drop Address</td>
                <td>${dropAddress}</td>
                <td>Drop Landmark</td>
                <td>${dropLandmark}</td>
            </tr>
            <tr>
                <td>Cab Duration</td>
                <td>${cabDuration}</td>
                <td>No of Cabs Required</td>
                <td>${noOfCabsRequired}</td>
            </tr>
            <tr>
                <td>Type of Cab Required</td>
                <td>${typeOfCabRequired}</td>
                <td>No of Persons Travelling</td>
                <td>${noOfPersonsTravelling}</td>
            </tr>
            <tr>
                <td>No of Infants</td>
                <td>${noOfInfants}</td>
                <td>No of Children</td>
                <td>${noOfChildren}</td>
            </tr>
            <tr>
                <td>Other Requirements</td>
                <td colspan="3">${otherRequirements || "N/A"}</td>
            </tr>
        </table>
    </body>
    </html>`
}

export function hotelBookingTemplate({ nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Hotel Booking Confirmation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <h1>Hotel Booking Confirmation</h1>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Nationality</td>
                <td>${nationality}</td>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Contact Number 1</td>
                <td>${contactNo1}</td>
                <td>Contact Number 2</td>
                <td>${contactNo2}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Country</td>
                <td>${country}</td>
            </tr>
            <tr>
                <td>State</td>
                <td>${state}</td>
                <td>City</td>
                <td>${city}</td>
            </tr>
            <tr>
                <td>Room Category</td>
                <td>${roomCategory}</td>
                <td>Meal Plan</td>
                <td>${mealPlan}</td>
            </tr>
            <tr>
                <td>Hotel Category</td>
                <td>${hotelCategory}</td>
                <td>Price Range</td>
                <td>${priceRange}</td>
            </tr>
            <tr>
                <td>Check In Date</td>
                <td>${checkInDate}</td>
                <td>Check Out Date</td>
                <td>${checkOutDate}</td>
            </tr>
            <tr>
                <td>Number of Nights</td>
                <td>${numberOfNights}</td>
                <td>Number of Rooms</td>
                <td>${numberOfRooms}</td>
            </tr>
            <tr>
                <td>Adults</td>
                <td>${adults}</td>
                <td>Children</td>
                <td>${children}</td>
            </tr>
            <tr>
                <td>Infants</td>
                <td>${infants}</td>
            </tr>
        </table>
    </body>
    </html>`
}

export function passportBookingTemplate({ totalNoOfTravellers, name, nationality, dateOfBirth, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelDuration }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Passport Details</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <h1>Passport Details</h1>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Number of Travellers</td>
                <td>${totalNoOfTravellers}</td>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Nationality</td>
                <td>${nationality}</td>
                <td>Date of Birth</td>
                <td>${dateOfBirth}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${gender}</td>
                <td>Passport No.</td>
                <td>${passportNo}</td>
            </tr>
            <tr>
                <td>Passport Issue Date</td>
                <td>${passportIssueDate}</td>
                <td>Passport Expiry Date</td>
                <td>${passportExpiryDate}</td>
            </tr>
            <tr>
                <td>Passport Validity Period</td>
                <td>${passportValidityPeriod}</td>
                <td>Place of Issue</td>
                <td>${placeOfIssue}</td>
            </tr>
            <tr>
                <td>Nominee Name</td>
                <td>${nomineeName}</td>
                <td>Nominee Gender</td>
                <td>${nomineeGender}</td>
            </tr>
            <tr>
                <td>Address with Pin Code</td>
                <td>${addressWithPinCode}</td>
                <td>Contact No.</td>
                <td>${contactNo}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Hold Passport From</td>
                <td>${holdPassportFrom}</td>
            </tr>
            <tr>
                <td>Apply From</td>
                <td>${applyFrom}</td>
                <td>Go To</td>
                <td>${goTo}</td>
            </tr>
            <tr>
                <td>Travel Duration</td>
                <td>${travelDuration}</td>
            </tr>
        </table>
    </body>
    </html>
`
}

export function healthInsuranceTemplate({ name, gender, dateOfBirth, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Health Insurance Details</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <h1>Health Insurance Details</h1>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>${name}</td>
                <td>Gender</td>
                <td>${gender}</td>
            </tr>
            <tr>
                <td>Date of Birth</td>
                <td>${dateOfBirth}</td>
                <td>Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Contact No.</td>
                <td>${contactNo}</td>
                <td>Email</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Pre-Existing Disease</td>
                <td>${preExistingDisease}</td>
                <td>Disease Name</td>
                <td>${diseaseName}</td>
            </tr>
            <tr>
                <td>Smoker</td>
                <td>${smoker}</td>
                <td>Nominee Name</td>
                <td>${nomineeName}</td>
            </tr>
            <tr>
                <td>Nominee Gender</td>
                <td>${nomineeGender}</td>
                <td>Nominee Relationship</td>
                <td>${nomineeRelationship}</td>
            </tr>
        </table>
    </body>
    </html>
`
}

export function travelInsuranceTemplate({ name, gender, dateOfBirth, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Travel Insurance Details</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }
        </style>
    </head>
    <body>
        <h1>Travel Insurance Details</h1>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>${name}</td>
                <td>Gender</td>
                <td>${gender}</td>
            </tr>
            <tr>
                <td>Date of Birth</td>
                <td>${dateOfBirth}</td>
                <td>Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Contact No.</td>
                <td>${contactNo}</td>
                <td>Email</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Trip Type</td>
                <td>${tripType}</td>
                <td>Start Date</td>
                <td>${startDate}</td>
            </tr>
            <tr>
                <td>End Date</td>
                <td>${endDate}</td>
                <td>Pre-Existing Disease</td>
                <td>${preExistingDisease}</td>
            </tr>
            <tr>
                <td>Disease Name</td>
                <td>${diseaseName}</td>
                <td>Smoker</td>
                <td>${smoker}</td>
            </tr>
            <tr>
                <td>Passport No.</td>
                <td>${passportNo}</td>
                <td>Date of Issue</td>
                <td>${dateOfIssue}</td>
            </tr>
            <tr>
                <td>Date of Expiry</td>
                <td>${dateOfExpiry}</td>
                <td>Nominee Name</td>
                <td>${nomineeName}</td>
            </tr>
            <tr>
                <td>Nominee Gender</td>
                <td>${nomineeGender}</td>
                <td>Nominee Relationship</td>
                <td>${nomineeRelationship}</td>
            </tr>
        </table>
    </body>
    </html>`
}

export function cancelTrainBookingTemplate({ fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, trainNo, timePreference }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Train Booking Cancellation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            } 

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }       
        </style>
    </head>
    <body>
        <h1>Train Booking Cancellation</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Travel Details</th>
            </tr>
            <tr>
                <td>Full Name</td>
                <td>${fullName}</td>
                <td>Date of Birth</td>
                <td>${dob}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${gender}</td>
                <td>Contact Number</td>
                <td>${contactNo}</td>
            </tr>
            <tr>
                <td>Travel From</td>
                <td>${travelFrom}</td>
                <td>Class of Travel</td>
                <td>${classOfTravel}</td>
            </tr>
            <tr>
                <td>Travel To</td>
                <td>${travelTo}</td>
                <td>Travel Date</td>
                <td>${travelDate}</td>
            </tr>
            <tr>
                <td>Train Number</td>
                <td>${trainNo || "N/A"}</td>
                <td>Time Preference</td>
                <td>${timePreference || "N/A"}</td>
            </tr>
        </table>
    </body>
    </html>`
}

export function cancelFlightBookingTemplate({ fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, flightNo, timePreference, remarks }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Flight Booking Cancellation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }        

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Flight Booking Cancellation</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Travel Details</th>
            </tr>
            <tr>
                <td>Full Name</td>
                <td>${fullName}</td>
                <td>Date of Birth</td>
                <td>${dob}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${gender}</td>
                <td>Contact Number</td>
                <td>${contactNo}</td>
            </tr>
            <tr>
                <td>Travel From</td>
                <td>${travelFrom}</td>
                <td>Class of Travel</td>
                <td>${classOfTravel}</td>
            </tr>
            <tr>
                <td>Travel To</td>
                <td>${travelTo}</td>
                <td>Travel Date</td>
                <td>${travelDate}</td>
            </tr>
            <tr>
                <td>Flight Number</td>
                <td>${flightNo || "N/A"}</td>
                <td>Time Preference</td>
                <td>${timePreference || "N/A"}</td>
            </tr>
            <tr>
                <td>Remarks</td>
                <td>${remarks || "N/A"}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export function cancelBusBookingTemplate({ fullName, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, busNo }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Volvo Bus Booking Cancellation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }   
            
            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Volvo Bus Booking Cancellation</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Travel Details</th>
            </tr>
            <tr>
                <td>Full Name</td>
                <td>${fullName}</td>
                <td>Date of Birth</td>
                <td>${dob}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${gender}</td>
                <td>Contact Number</td>
                <td>${contactNo}</td>
            </tr>
            <tr>
                <td>Pickup Location</td>
                <td>${pickupLocation}</td>
                <td>Seat Type</td>
                <td>${seatType}</td>
            </tr>
            <tr>
                <td>Destination</td>
                <td>${destination}</td>
                <td>Travel Date</td>
                <td>${travelDate}</td>
            </tr>
            <tr>
                <td>Bus Number</td>
                <td>${busNo || "N/A"}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export function cancelCabBookingTemplate({ pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cab Booking Cancellation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Cab Booking Cancellation</h1>
        <p>This is to inform you that your cab booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Pickup Country</td>
                <td>${pickupCountry}</td>
                <td>Nationality</td>
                <td>${nationality}</td>
            </tr>
            <tr>
                <td>Tour Plan</td>
                <td>${tourPlan}</td>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Contact Number</td>
                <td>${contactNo}</td>
                <td>Alternate Contact Number</td>
                <td>${alternateContactNo}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Cab Required At</td>
                <td>${cabRequiredAt}</td>
            </tr>
            <tr>
                <td>Cab Required For</td>
                <td>${cabRequiredFor}</td>
                <td>Local Travel Kms Limit</td>
                <td>${localTravelKmsLimit}</td>
            </tr>
            <tr>
                <td>Pickup Date Time</td>
                <td>${pickupDateTime}</td>
                <td>Pickup Address</td>
                <td>${pickupAddress}</td>
            </tr>
            <tr>
                <td>Pickup Landmark</td>
                <td>${pickupLandmark}</td>
                <td>Drop Date Time</td>
                <td>${dropDateTime}</td>
            </tr>
            <tr>
                <td>Drop Address</td>
                <td>${dropAddress}</td>
                <td>Drop Landmark</td>
                <td>${dropLandmark}</td>
            </tr>
            <tr>
                <td>Cab Duration</td>
                <td>${cabDuration}</td>
                <td>No of Cabs Required</td>
                <td>${noOfCabsRequired}</td>
            </tr>
            <tr>
                <td>Type of Cab Required</td>
                <td>${typeOfCabRequired}</td>
                <td>No of Persons Travelling</td>
                <td>${noOfPersonsTravelling}</td>
            </tr>
            <tr>
                <td>No of Infants</td>
                <td>${noOfInfants}</td>
                <td>No of Children</td>
                <td>${noOfChildren}</td>
            </tr>
            <tr>
                <td>Other Requirements</td>
                <td colspan="3">${otherRequirements || "N/A"}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export function cancelHotelBookingTemplate({ nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Hotel Booking Cancellation</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Hotel Booking Cancellation</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Nationality</td>
                <td>${nationality}</td>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Contact Number 1</td>
                <td>${contactNo1}</td>
                <td>Contact Number 2</td>
                <td>${contactNo2}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Country</td>
                <td>${country}</td>
            </tr>
            <tr>
                <td>State</td>
                <td>${state}</td>
                <td>City</td>
                <td>${city}</td>
            </tr>
            <tr>
                <td>Room Category</td>
                <td>${roomCategory}</td>
                <td>Meal Plan</td>
                <td>${mealPlan}</td>
            </tr>
            <tr>
                <td>Hotel Category</td>
                <td>${hotelCategory}</td>
                <td>Price Range</td>
                <td>${priceRange}</td>
            </tr>
            <tr>
                <td>Check In Date</td>
                <td>${checkInDate}</td>
                <td>Check Out Date</td>
                <td>${checkOutDate}</td>
            </tr>
            <tr>
                <td>Number of Nights</td>
                <td>${numberOfNights}</td>
                <td>Number of Rooms</td>
                <td>${numberOfRooms}</td>
            </tr>
            <tr>
                <td>Adults</td>
                <td>${adults}</td>
                <td>Children</td>
                <td>${children}</td>
            </tr>
            <tr>
                <td>Infants</td>
                <td>${infants}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export function cancelPassportBookingTemplate({ totalNoOfTravellers, name, nationality, dateOfBirth, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelEntryDate, travelExitDate }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Passport Details</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Passport Details</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Number of Travellers</td>
                <td>${totalNoOfTravellers}</td>
                <td>Name</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Nationality</td>
                <td>${nationality}</td>
                <td>Date of Birth</td>
                <td>${dateOfBirth}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${gender}</td>
                <td>Passport No.</td>
                <td>${passportNo}</td>
            </tr>
            <tr>
                <td>Passport Issue Date</td>
                <td>${passportIssueDate}</td>
                <td>Passport Expiry Date</td>
                <td>${passportExpiryDate}</td>
            </tr>
            <tr>
                <td>Passport Validity Period</td>
                <td>${passportValidityPeriod}</td>
                <td>Place of Issue</td>
                <td>${placeOfIssue}</td>
            </tr>
            <tr>
                <td>Nominee Name</td>
                <td>${nomineeName}</td>
                <td>Nominee Gender</td>
                <td>${nomineeGender}</td>
            </tr>
            <tr>
                <td>Address with Pin Code</td>
                <td>${addressWithPinCode}</td>
                <td>Contact No.</td>
                <td>${contactNo}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>${email}</td>
                <td>Hold Passport From</td>
                <td>${holdPassportFrom}</td>
            </tr>
            <tr>
                <td>Apply From</td>
                <td>${applyFrom}</td>
                <td>Go To</td>
                <td>${goTo}</td>
            </tr>
            <tr>
                <td>Travel Duration</td>
                <td>${travelDuration}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export function cancelHealthInsuranceTemplate({ name, gender, dateOfBirth, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Health Insurance Details</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Health Insurance Details</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>${name}</td>
                <td>Gender</td>
                <td>${gender}</td>
            </tr>
            <tr>
                <td>Date of Birth</td>
                <td>${dateOfBirth}</td>
                <td>Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Contact No.</td>
                <td>${contactNo}</td>
                <td>Email</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Pre-Existing Disease</td>
                <td>${preExistingDisease}</td>
                <td>Disease Name</td>
                <td>${diseaseName}</td>
            </tr>
            <tr>
                <td>Smoker</td>
                <td>${smoker}</td>
                <td>Nominee Name</td>
                <td>${nomineeName}</td>
            </tr>
            <tr>
                <td>Nominee Gender</td>
                <td>${nomineeGender}</td>
                <td>Nominee Relationship</td>
                <td>${nomineeRelationship}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export function cancelTravelInsuranceTemplate({ name, gender, dateOfBirth, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Travel Insurance Details</title>
        <style>
            body {
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                padding: 5px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                text-align: left;
                padding: 8px;
                background-color: #f2f2f2;
                border: 1px solid #ddd
            }

            td {
                padding: 8px;
                border: 1px solid #ddd
            }

            p {
                margin-block: 10px;
                color: #ff0000;
                font-weight: bold;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <h1>Travel Insurance Details</h1>
        <p>This is to inform you that your booking has been cancelled.</p>
        <table>
            <tr>
                <th colspan="4">Booking Details</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>${name}</td>
                <td>Gender</td>
                <td>${gender}</td>
            </tr>
            <tr>
                <td>Date of Birth</td>
                <td>${dateOfBirth}</td>
                <td>Address</td>
                <td>${address}</td>
            </tr>
            <tr>
                <td>Contact No.</td>
                <td>${contactNo}</td>
                <td>Email</td>
                <td>${email}</td>
            </tr>
            <tr>
                <td>Trip Type</td>
                <td>${tripType}</td>
                <td>Start Date</td>
                <td>${startDate}</td>
            </tr>
            <tr>
                <td>End Date</td>
                <td>${endDate}</td>
                <td>Pre-Existing Disease</td>
                <td>${preExistingDisease}</td>
            </tr>
            <tr>
                <td>Disease Name</td>
                <td>${diseaseName}</td>
                <td>Smoker</td>
                <td>${smoker}</td>
            </tr>
            <tr>
                <td>Passport No.</td>
                <td>${passportNo}</td>
                <td>Date of Issue</td>
                <td>${dateOfIssue}</td>
            </tr>
            <tr>
                <td>Date of Expiry</td>
                <td>${dateOfExpiry}</td>
                <td>Nominee Name</td>
                <td>${nomineeName}</td>
            </tr>
            <tr>
                <td>Nominee Gender</td>
                <td>${nomineeGender}</td>
                <td>Nominee Relationship</td>
                <td>${nomineeRelationship}</td>
            </tr>
        </table>
    </body>
    </html>
    `
}