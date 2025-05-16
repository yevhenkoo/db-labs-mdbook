const db = require('../db')
class UserController {
    async createUser(req, res)
    {
        try
        {
            const {nickname, email, password, photo} = req.body
            const newUser = await db.query(
                'INSERT INTO public."User" (id, nickname, email, "password", photo) VALUES(gen_random_uuid(), $1, $2, $3, $4) RETURNING *', 
                [nickname,email,password,photo])
            res.json(newUser.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async getUsers(req, res)
    {
        try
        {
            const users = await db.query('SELECT * FROM public."User"')
            res.json(users.rows)
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async getOneUser(req, res)
    {
        try
        {
            const id = req.params.id
            const user = await db.query('SELECT * FROM public."User" WHERE id = $1', [id])
            res.json(user.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async updateUser(req, res)
    {
        try
        {
            const id = req.params.id
            const {nickname, email, password, photo} = req.body
            const user = await db.query(
                'UPDATE public."User" set nickname = $1, email = $2, password = $3, photo = $4 where id = $5 RETURNING *', 
                [nickname,email,password,photo,id])
            res.json(user.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async deleteUser(req, res)
    {
        try
        {
            const id = req.params.id
            const deletedUser = await db.query('DELETE FROM public."User" WHERE id = $1 RETURNING *', [id])
            res.json(deletedUser.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async getUserProjects(req, res)
    {
        try
        {
            const id = req.params.id
            const user = await db.query('SELECT * FROM public."User_Project" WHERE user_id = $1', [id])
            res.json(user.rows)
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
}

 module.exports = new UserController()