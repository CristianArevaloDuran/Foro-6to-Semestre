const getProfile = (supabase) => async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: 'Sesion no valida'
            });
        }

        // Obtener el rol del usuario
        const { data: userRole, error: userRoleError } = await supabase
            .from('user_role')
            .select('role_id')
            .eq('id', userId)
            .single();

        let role = null;
        let permissions = null;

        if (!userRoleError && userRole) {
            const roleId = userRole.role_id;

            // Obtener datos del rol
            const { data: roleData, error: roleError } = await supabase
                .from('roles')
                .select('*')
                .eq('id', roleId)
                .single();

            if (!roleError && roleData) {
                role = roleData;

                // Obtener permisos del rol
                const { data: permissionsData, error: permissionsError } = await supabase
                    .from('permission_role')
                    .select('permission_id(id, name, slug, description)')
                    .eq('role_id', roleId);

                if (!permissionsError && permissionsData) {
                    permissions = permissionsData;
                }
            }
        }

        return res.status(200).json({
            user: req.user,
            role,
            permissions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener el perfil',
            error: error.message
        });
    }
};

export default getProfile;
