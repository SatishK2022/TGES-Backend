import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";
import { generateBranchId } from "../utils/helper.js";

let db = await connectToDb();

const addBranch = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, city, country, state, zipCode, address1, address2, countryCode, contactNo, landlineNumber, landlineCityCode, landlineCountryCode, email } = reqBody;

    try {
        const branchId = generateBranchId(name);

        const branch = `INSERT INTO branch (userId, companyId, branchId, name, city, country, state, zipCode, address1, address2, countryCode, contactNo, landlineNumber, landlineCityCode, landlineCountryCode, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const branchParams = [req.user.id, req.user.companyId, branchId, name, city, country, state, zipCode, address1, address2, countryCode, contactNo, landlineNumber, landlineCityCode, landlineCountryCode, email];

        const [insertResult, insertFields] = await db.query(branch, branchParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Branch added successfully"
            )
        );
    } catch (error) {
        console.log("Error while adding branch: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while adding branch"
            )
        );
    }
})

const updateBranch = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const branchId = req.params.branchId;
    const { name, city, country, state, zipCode, address1, address2, countryCode, contactNo, landlineNumber, landlineCityCode, landlineCountryCode, email } = reqBody;

    try {
        const sql = `SELECT * FROM branch WHERE branchId = ?`
        const params = [branchId];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Branch not found"
                )
            )
        }

        const updateSql = `UPDATE branch SET name = ?, city = ?, country = ?, state = ?, zipCode = ?, address1 = ?, address2 = ?, countryCode = ?, contactNo = ?, landlineNumber = ?, landlineCityCode = ?, landlineCountryCode = ?, email = ? WHERE branchId = ?`;
        const updateParams = [name, city, country, state, zipCode, address1, address2, countryCode, contactNo, landlineNumber, landlineCityCode, landlineCountryCode, email, branchId];
        const [updateResult, updateFields] = await db.query(updateSql, updateParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Branch updated successfully"
            )
        )
    } catch(error) {
        console.log("Error while updating branch: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while updating branch"
            )
        )
    }
})

const deleteBranch = asyncHandler(async (req, res) => {
    const branchId = req.params.branchId;

    if (!branchId) {
        return res.status(400).json(
            new ApiResponse(400, null, "Branch ID is required")
        );
    }

    try {
        const employeeSql = "UPDATE employee SET branchId = NULL WHERE branchId = ?";
        const employeeParams = [branchId];
        await db.query(employeeSql, employeeParams);

        const sql = `DELETE FROM branch WHERE branchId = ?`;
        const queryParams = [branchId];
        const [result] = await db.query(sql, queryParams);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "Branch not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Branch deleted successfully")
        );
    } catch (error) {
        console.error(`Error while deleting branch with ID ${branchId}:`, error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error while deleting branch")
        );
    }
});

const getAllBranches = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM branch WHERE userId = ? AND companyId = ? ORDER BY createdAt DESC`;
        const params = [req.user.id, req.user.companyId];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No branches found"
                )
            );
        }

        const branchData = result.map(branch => {
            const { userId, createdAt, updatedAt, ...rest } = branch;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                branchData,
                "Branches fetched successfully"
            )
        );
    } catch (error) {
        console.log("Error while getting branches: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting branches"
            )
        );
    }
});

const addEmployee = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { employeeId, name, gender, dateOfBirth, zipCode, country, city, state, email, password, countryCode, contactNo, department, position } = reqBody;
    const branchId = req.params.branchId;

    try {
        const checkEmployeeIdSql = `SELECT * FROM employee WHERE employeeId = ?`;
        const checkEmployeeIdParams = [employeeId];
        const [checkEmployeeIdResult, checkEmployeeIdFields] = await db.query(checkEmployeeIdSql, checkEmployeeIdParams);

        if (checkEmployeeIdResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "Employee Id already exists"
                )
            );
        }

        const employee = `INSERT INTO employee (userId, branchId, employeeId, name, gender, dateOfBirth, zipCode, country, city, state, email, password, countryCode, contactNo, department, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const employeeParams = [req.user.id, branchId, employeeId, name, gender, dateOfBirth, zipCode, country, city, state, email, password, countryCode, contactNo, department, position];

        const [insertResult, insertFields] = await db.query(employee, employeeParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Employee added successfully"
            )
        );
    } catch (error) {
        console.log("Error while adding employee: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while adding employee"
            )
        );
    }
});

const updateEmployee = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const employeeId = req.params.employeeId;
    const { name, gender, dateOfBirth, zipCode, country, city, state, email, password, countryCode, contactNo, department, position } = reqBody;

    try {
        const sql = `SELECT * FROM employee WHERE employeeId = ?`;
        const params = [employeeId];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employee not found"
                )
            );
        }

        const updateSql = `UPDATE employee SET name = ?, gender = ?, dateOfBirth = ?, zipCode = ?, country = ?, city = ?, state = ?, email = ?, password = ?, countryCode = ?, contactNo = ?, department = ?, position = ? WHERE employeeId = ?`;
        const updateParams = [name, gender, dateOfBirth, zipCode, country, city, state, email, password, countryCode, contactNo, department, position, employeeId];
        const [updateResult, updateFields] = await db.query(updateSql, updateParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Employee updated successfully"
            )
        );
    } catch (error) {
        console.log("Error while updating employee: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while updating employee"
            )
        );
    }

})

const deleteEmployee = asyncHandler(async (req, res) => {
    const employeeId = req.params.employeeId;

    if (!employeeId) {
        return res.status(400).json(
            new ApiResponse(400, null, "Employee ID is required")
        );
    }

    try {
        const sql = `DELETE FROM employee WHERE employeeId = ?`;
        const params = [employeeId];
        const [result] = await db.query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "Employee not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Employee deleted successfully")
        );
    } catch (error) {
        console.error(`Error while deleting employee with ID ${employeeId}:`, error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error while deleting employee")
        );
    }
});

const getEmployee = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { employeeId, companyId } = reqBody;

    try {
        const selectEmployee = `SELECT branchId FROM employee WHERE employeeId = ?`;
        const paramsEmployee = [employeeId];
        const [resultEmployee, fieldsEmployee] = await db.query(selectEmployee, paramsEmployee);

        if (resultEmployee.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employee not found"
                )
            );
        }
        const branchId = resultEmployee[0].branchId;

        const selectBranch = `SELECT * FROM branch WHERE branchId = ? AND companyId = ?`;
        const paramsBranch = [branchId, companyId];
        const [resultBranch, fieldsBranch] = await db.query(selectBranch, paramsBranch);

        if (resultBranch.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Company not found"
                )
            );
        }

        const selectEmployeeInfo = `SELECT * FROM employee WHERE employeeId = ? AND branchId = ?`;
        const paramsEmployeeInfo = [employeeId, branchId];
        const [resultEmployeeInfo, fieldsEmployeeInfo] = await db.query(selectEmployeeInfo, paramsEmployeeInfo);

        if (resultEmployeeInfo.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employee not found"
                )
            );
        }

        const employeeData = resultEmployeeInfo.map(employee => {
            const { userId, createdAt, updatedAt, ...rest } = employee;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                employeeData,
                "Employee fetched successfully"
            )
        );
    } catch (error) {
        console.log("Error while getting employee: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting employee"
            )
        );
    }
})

const getBranchEmployees = asyncHandler(async (req, res) => {
    const { employeeId, name } = req.query;
    const branchId = req.params.branchId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM employee WHERE userId = ? AND branchId = ?`;
    const params = [req.user.id, branchId];

    // Check for search criteria in the request body
    if (employeeId) {
        sql += ` AND employeeId = ?`;
        params.push(employeeId);
    }
    if (name) {
        sql += ` AND name LIKE ?`;
        params.push(`%${name}%`);
    }

    // Add pagination to the SQL query
    sql += ` ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
    params.push(limit, skip);

    try {
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employees not found"
                )
            );
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const employeeData = result.map(employee => {
            const { userId, branchId, createdAt, updatedAt, ...rest } = employee;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: employeeData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Employees fetched successfully"
            )
        );
    } catch (error) {
        console.log("Error while getting branch employees: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting branch employees"
            )
        );
    }
});

const getAllEmployees = asyncHandler(async (req, res) => {
    const { name, email, employeeId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Fetch branch IDs for the user's company
        const sqlBranches = `SELECT branchId FROM branch WHERE companyId = ?`;
        const paramsBranches = [req.user.companyId];
        const [resultBranches] = await db.query(sqlBranches, paramsBranches);

        // Check if any branches were found
        if (resultBranches.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No branches found for this company"
                )
            );
        }

        const ids = resultBranches.map(branch => branch.branchId);

        // Initialize SQL query and parameters for employees
        let sqlEmployees = `
            SELECT SQL_CALC_FOUND_ROWS * 
            FROM employee 
            WHERE branchId IN (${ids.map(() => '?').join(',')})`;
        const paramsEmployees = [...ids];

        // Add search conditions if provided
        if (name) {
            sqlEmployees += ` AND name LIKE ?`;
            paramsEmployees.push(`%${name}%`); // Use LIKE for partial matches
        }
        if (email) {
            sqlEmployees += ` AND email LIKE ?`;
            paramsEmployees.push(`%${email}%`); // Use LIKE for partial matches
        }
        if (employeeId) {
            sqlEmployees += ` AND employeeId = ?`;
            paramsEmployees.push(employeeId);
        }

        // Add pagination to the SQL query
        sqlEmployees += ` ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        paramsEmployees.push(limit, skip);

        // Fetch employees based on the constructed query
        const [resultEmployees] = await db.query(sqlEmployees, paramsEmployees);

        // Get the total count of employees
        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        // Check if any employees were found
        if (resultEmployees.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employees not found"
                )
            );
        }

        // Clean up employee data by removing sensitive fields
        const employeeData = resultEmployees.map(employee => {
            const { userId, createdAt, updatedAt, ...rest } = employee;
            return rest;
        });

        // Return the fetched employee data with pagination info
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: employeeData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Employees fetched successfully"
            )
        );
    } catch (error) {
        console.error("Error while getting all employees: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting all employees"
            )
        );
    }
});

export {
    addBranch,
    updateBranch,
    deleteBranch,
    getAllBranches,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getBranchEmployees,
    getAllEmployees
}