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

const getAllBranches = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM branch WHERE userId = ? AND companyId = ?`;
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
})

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
    const reqBody = req.body || {};
    const employeeId = req.params.employeeId;

    try {
        const sql = `DELETE FROM employee WHERE employeeId = ?`;
        const params = [employeeId];
        const [result, fields] = await db.query(sql, params);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Employee deleted successfully"
            )
        );
    } catch (error) {
        console.log("Error while deleting employee: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while deleting employee"
            )
        );
    }
})

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
    const reqBody = req.body || {};
    const branchId = req.params.branchId;

    try {
        const sql = `SELECT * FROM employee WHERE userId = ? AND branchId = ?`;
        const params = [req.user.id, branchId];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employees not found"
                )
            );
        }

        const employeeData = result.map(employee => {
            const { userId, branchId, createdAt, updatedAt, ...rest } = employee;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                employeeData,
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
})

const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        const sqlBranches = `SELECT branchId FROM branch WHERE companyId = ?`;
        const paramsBranches = [req.user.companyId];
        const [resultBranches, fieldsBranches] = await db.query(sqlBranches, paramsBranches);

        const ids = resultBranches.map(branch => branch.branchId);

        const sqlEmployees = `SELECT * FROM employee WHERE branchId IN (${ids.map(id => '?').join(',')})`;
        const paramsEmployees = ids;
        const [resultEmployees, fieldsEmployees] = await db.query(sqlEmployees, paramsEmployees);

        if (resultEmployees.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Employees not found"
                )
            );
        }

        const employeeData = resultEmployees.map(employee => {
            const { userId, createdAt, updatedAt, ...rest } = employee;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                employeeData,
                "Employees fetched successfully"
            )
        );
    } catch (error) {
        console.log("Error while getting all employees: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting all employees"
            )
        );
    }
})

export {
    addBranch,
    getAllBranches,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getBranchEmployees,
    getAllEmployees
}