const register = (supabase) => async (req, res) => {
    const {username, name, email, password, roleId} = req.body;

    try {
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

        if(error) throw error;

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
            message: 'User signed up succesfully',
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