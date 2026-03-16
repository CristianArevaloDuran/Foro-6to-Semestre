import "dotenv/config";
import express from "express";
import supabase from "./modules/db/connection.js";
import cors from 'cors';

// Setup server

const port = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express()

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: CORS_ORIGIN
}))

// Endpoints

import registerPermission from "./modules/permissions/register.js";
import registerRole from "./modules/roles/register.js";
import register from "./modules/auth/register.js";
import login from "./modules/auth/login.js";


// Vitals

app.get("/vitals", (req, res)=>{
    res.status(200).json({
        res: "OK"
    })
})

// Permissions

app.post("/register-permission", registerPermission(supabase));

// Roles

app.post("/register-role", registerRole(supabase));

// Users

// -Register

app.post("/register", register(supabase));

// -Login

app.post("/login", login(supabase));

app.listen(port, ()=>{
    console.log(`API on port http://localhost:${port}`);
})
