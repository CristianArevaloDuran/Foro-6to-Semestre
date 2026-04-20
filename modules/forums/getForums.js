const getForums = (supabase) => async (req, res) => {
    try {
        const {data, error} = await supabase
            .from('subforum')
            .select()

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