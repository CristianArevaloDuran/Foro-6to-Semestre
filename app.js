import "dotenv/config";
import express from "express";
import sql from "./modules/db/connection.js";

// Setup server

const port = process.env.PORT || 3000;

const app = express()
app.use(express.json());

// Endpoints

import registerPermission from "./modules/permissions/register.js";
import registerRole from "./modules/roles/register.js";

// Vitals

app.get("/vitals", (req, res)=>{
    res.status(200).json({
        res: "OK"
    })
})

// Permissions

app.post("/register-permission", registerPermission(sql));

// Roles

app.post("/register-role", registerRole(sql));

app.listen(port, ()=>{
    console.log(`API on port http://localhost:${port}`);
})
