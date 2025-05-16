const express = require('express')
const userRouter = require('./routes/user.routes')
const projectRouter = require('./routes/project.routes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', projectRouter)

app.listen(PORT, () => {
  console.log(`Server starts on http://localhost:${PORT}`);
});