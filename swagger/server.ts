import express from 'express'
import swaggerDocs from './swagger'
import bodyParser from 'body-parser'
import routerUser from './src/routes/User'
import routePassenger from './src/routes/Passenger'
import routeFlight from './src/routes/Flight'
import routeBooking from './src/routes/Booking'
import routeBaggage from './src/routes/Baggage'
import routeCheckin from './src/routes//Checkin'
import routePayment from './src/routes/Payment'

const app = express();


const PORT =  3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.use(express.json())




// app.use('/', (req: Request, res: Response) => {
//     res.status(200).json('Hello Word')
    
// })



app.use('/api/user', routerUser)

app.use('/api/passenger', routePassenger)

app.use('/api/flight', routeFlight)

app.use('/api/booking', routeBooking)

app.use('/api/baggage', routeBaggage)

app.use('/api/checkin', routeCheckin)


app.use('/api/payment', routePayment)


swaggerDocs(app, PORT);





app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})