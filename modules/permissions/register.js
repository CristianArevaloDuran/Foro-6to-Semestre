const registerPermission = (supabase) => async (req, res) => {
    const {name, slug, description} = req.body;

    try {
        const {data, error} = await supabase.from('permission').insert([
            {
                name: name,
                slug: slug,
                description: description
            }
        ]).select();

        if(error) throw error;

        return res.status(201).json({
            message: "Permission created",
            data
        })
    } catch(error) {
        res.status(500).json({
            error
        })
    } 
}

export default registerPermission;