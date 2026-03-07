export const login = async (req,res) => {
    return res.sendStatus(200);
}

export const signup = async (req,res) => {
    const { name, email, password, socketId } = req.body;
    

    return res.sendStatus(200)
}