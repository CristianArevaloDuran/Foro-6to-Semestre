const login = (supabase) => async (req, res) => {
    const {email, password} = req.body;

    try {
        const {data, error} = await supabase.auth.signInWithPassword(
            {
                email,
                password
            }
        )

        if(error) {
            return res.status(401).json({
                message: 'Contraseña o correo incorrecto.'
            })
        };

        res.status(200).json({
            message: 'Logged in',
            user: data.user,
            token_type: 'Bearer',
            access_token: data.session.access_token
        })

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: 'Error while logging in',
            error: error.message
        })
    }
}

export default login;