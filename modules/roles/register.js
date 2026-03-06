const registerRole = (sql) => async (req, res) => {
    const {name, description} = req.body;
    console.log(req.body);
    
    const role = {
        name: name,
        description: description
    }

    try {
        const result = await sql`
            insert into roles ${sql(role)}
            returning *
        `;

        return res.status(200).json({
            message: "Role created",
            data: result
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        })
    } 
}

export default registerRole;