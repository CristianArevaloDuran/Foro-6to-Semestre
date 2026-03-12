import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.DB_PASSWORD;

const supabase = createClient(supabaseUrl, secretKey);

export default supabase;