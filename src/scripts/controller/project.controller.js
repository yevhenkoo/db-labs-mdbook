const db = require('../db')
class ProjectController {
    async createProject(req, res)
    {
        try
        {
            const {user_id, name} = req.body
            const newProject = await db.query(
                `INSERT INTO public."Project" (id, name) VALUES(nextval('"Project_id_seq"'::regclass), $1) RETURNING *`, 
                [name])
            await db.query(
                `INSERT INTO public."User_Project" (id, user_id, project_id, role_id, team_id) VALUES(nextval('"User_Project_id_seq"'::regclass),$1, $2, null, null)`, 
                [user_id,newProject.rows[0]["id"]])
            res.json(newProject.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async getProjects(req, res)
    {
        try
        {
            const projects = await db.query('SELECT * FROM public."Project"')
            res.json(projects.rows)
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async getOneProject(req, res)
    {
        try
        {
            const id = req.params.id
            const project = await db.query('SELECT * FROM public."Project" WHERE id = $1', [id])
            res.json(project.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async updateProjectName(req, res)
    {
        try
        {
            const id = req.params.id
            const {name} = req.body
            const project = await db.query(
                'UPDATE public."Project" set name = $1 where id = $2 RETURNING *', 
                [name,id])
            res.json(project.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
    async deleteProject(req, res)
    {
        try
        {
            const id = req.params.id
            const deletedProject = await db.query('DELETE FROM public."Project" WHERE id = $1 RETURNING *', [id])
            res.json(deletedProject.rows[0])
        }
        catch(err)
        {
            console.error(err.toString())
        }
    }
}

 module.exports = new ProjectController()