const registerRole = (supabase) => async (req, res) => {
    const {name, description} = req.body;

    try {
        const {data, error} = await supabase.from('roles').insert([
            {
                name,
                description
            }
        ])
        .select()
        .single();

        if(error) throw error;

        res.status(201).json({
            message: 'Role added',
            data
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    } 
}

export default registerRole;