const createForum = (supabase) => async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({
            message: 'Sesion no valida'
        });
    }

    if (!name) {
        return res.status(400).json({
            message: 'El nombre es necesario'
        });
    }

    if (!description) {
        return res.status(400).json({
            message: 'La descripcion es necesaria'
        });
    }

    try {
        const { data, error } = await supabase
            .from('subforum')
            .insert([
                {
                    name,
                    description,
                    created_by: userId
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        return res.status(201).json({
            message: 'Forum created',
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error while creating forum',
            error: error.message
        });
    }
};

export default createForum;
