import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import teamsRouter from './routes/teams'
import meetingsRouter from './routes/meetings'

dotenv.config({path: path.resolve(__dirname, '../.env')})

const app = express()
const port = process.env.PORT || 3888

app.use(cors())
app.use(express.json())

app.get('/',(req: Request, res: Response)=>{
    res.status(200).send('Meetmee server connected successfully')
})

app.use('/teams', teamsRouter)
app.use('/meetings', meetingsRouter)

app.listen(port, ()=>console.log(`Server is listening on port ${port}`))