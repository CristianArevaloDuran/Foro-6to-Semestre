const registerRole = (supabase) => async (req, res) => {
    const {name, description} = req.body;
    
    const role = {
        name: name,
        description: description
    }

    try {
        const {data, error} = await supabase.from('roles').insert([
            {
                name: name,
                description: description
            }
        ]).select();

        if(error) throw error;

        res.status(201).json({
            message: 'Role added',
            data
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error
        })
    } 
}

export default registerRole;