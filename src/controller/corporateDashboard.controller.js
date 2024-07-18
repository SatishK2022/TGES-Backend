import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

const addBranch = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, address, contactNo, email } = reqBody;

    try {
        const branch = `INSERT INTO branch (userId, companyId, name, address, contactNo, email) VALUES (?, ?, ?, ?, ?, ?)`;
        const branchParams = [req.user.id, req.user.companyId, name, address, contactNo, email];

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

const getBranches = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM branch WHERE userId = ? AND companyId = ?`;
        const params = [req.user.id, req.user.companyId];
        const [result, fields] = await db.query(sql, params);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Branches fetched successfully",
                result
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
    const { employeeId, name, gender, dateOfBirth, zipCode, country, city, state, email, password, contactNo, department, position } = reqBody;

    try {
        const selectBranchSql = `SELECT id FROM branch WHERE userId = ? AND companyId = ?`;
        const selectBranchParams = [req.user.id, req.user.companyId];
        const [branchResult, branchFields] = await db.query(selectBranchSql, selectBranchParams);

        if (branchResult.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Branch not found"
                )
            );
        }

        const branchId = branchResult[0].id;

        const employee = `INSERT INTO employee (userId, branchId, employeeId, name, gender, dateOfBirth, zipCode, country, city, state, email, password, contactNo, department, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const employeeParams = [req.user.id, branchId, employeeId, name, gender, dateOfBirth, zipCode, country, city, state, email, password, contactNo, department, position];

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

const getEmployees = asyncHandler(async (req, res) => {
    try {
        const selectBranchSql = `SELECT id FROM branch WHERE userId = ? AND companyId = ?`;
        const selectBranchParams = [req.user.id, req.user.companyId];
        const [branchResult, branchFields] = await db.query(selectBranchSql, selectBranchParams);

        if (branchResult.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Branch not found"
                )
            );
        }

        const branchId = branchResult[0].id;

        const sql = `SELECT * FROM employee WHERE userId = ? AND branchId = ?`;
        const params = [req.user.id, branchId];
        const [result, fields] = await db.query(sql, params);

        return res.status(200).json(
            new ApiResponse(
                200,
                "Employees fetched successfully",
                result
            )
        );
    } catch (error) {
        console.log("Error while getting employees: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting employees"
            )
        );
    }
})

export {
    addBranch,
    getBranches,
    addEmployee,
    getEmployees
}