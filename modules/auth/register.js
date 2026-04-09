const register = (supabase) => async (req, res) => {
    const {username, name, email, password, roleId} = req.body;

    try {

        // Verify username is unique

        const {data: userNameData, error: userNameError} = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .limit(1);        

        if(userNameData && userNameData.length > 0) {
            return res.status(409).json({
                ok: false,
                code: 'user_already_exists',
                message: 'El nombre de usuario ya se encuentra registrado'
            })
        }

        // User signup

        const {data, error} = await supabase.auth.signUp(
            {
                email,
                password,
                options: {
                    data: {
                        username,
                        name
                    }
                }
            }
        )

        if(error) {
            if(error.code === "user_already_exists") {
                return res.status(409).json({
                    ok: false,
                    code: error.code,
                    message: 'Este correo ya esta registrado'
                })
            }
        };

        const userId = data.user.id;

        const {data: profileData, error: profileError} = await supabase.from('profiles').insert([
            {
                id: userId,
                username: username,
                role_id: roleId
            }
        ])

        if(profileError) throw profileError;

        res.status(201).json({
            message: 'Usuario registrado',
            data: data.user,
            profile: profileData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    }
}

export default register;