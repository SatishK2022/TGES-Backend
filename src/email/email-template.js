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