const getForums = (supabase) => async (req, res) => {
    try {
        const {data, error} = await supabase
            .from('subforum')
            .select('*, profiles!subforum_created_by_fkey(*)')

        
        if(error) {
            throw error;
        }

        return res.status(200).json({
            data
        })
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: 'Error fetching forums'
        })
    }
} 

export default getForums;