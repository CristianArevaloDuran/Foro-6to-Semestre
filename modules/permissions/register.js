const registerPermission = (sql) => async (req, res) => {
    const {name, slug, description} = req.body;
    console.log(req.body);
    
    const permission = {
        name: name,
        slug: slug,
        description: description
    }

    try {
        const result = await sql`
            insert into permission ${sql(permission)}
            returning *
        `;

        return res.status(200).json({
            message: "Permission created",
            data: result
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        })
    } 
}

export default registerPermission;