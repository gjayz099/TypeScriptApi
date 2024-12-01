import Flight from '../model/Flight';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


const PostFlight = async(req: Request, res: Response) => {
    try {
        const { FlightNumber, DepartureAirport, ArrivalAirport, FlightPrice, FlightDuration, DepartureDate, DepartureTime, Airline, PassengerCapacity, } = req.body;

        if(!FlightNumber){ res.status(404).json( {message: "Flight Number are required." }); return};
        if(!DepartureAirport){ res.status(404).json( {message: "Departure Airport are required." }); return};
        if(!ArrivalAirport){ res.status(404).json( {message: "Arrival Airport are required." }); return};
        if(!FlightPrice){ res.status(404).json( {message: "Flight Price are required." }); return;}
        if(!FlightDuration){ res.status(404).json( {message: "Flight Duration are required." }); return};
        if(!DepartureDate){ res.status(404).json( {message: "Departure Date are required." }); return};
        if(!DepartureTime){ res.status(404).json( {message: "Departure Time are required." }); return};
        if(!Airline){ res.status(404).json( {message: "Airline are required." }); return};
        if(!PassengerCapacity){ res.status(404).json( {message: "Passenger Capacity are required." }); return};

        const flight = await Flight.create({
            Id: uuidv4(),
            FlightNumber, 
            DepartureAirport, 
            ArrivalAirport, 
            FlightPrice, 
            FlightDuration, 
            DepartureDate, 
            DepartureTime,
            Airline, 
            PassengerCapacity,
            CreateDate: new Date()
        });

        res.status(200).json({
            message: 'Flight created successfully',
            flight: flight
        });

    } catch (error) {
        console.error('Error while post flight:', error);
        res.status(505).json('Internal server error: ');
    }
};

const GetAllFlight = async(req: Request, res: Response) => {
    try{
        const flight = await Flight.findAll({});

        if(!flight){res.status(400).json({ message: "Flight is not found"}); return};

        res.status(200).json({
            flight: flight
        });

    } catch (error) {
        console.error('Error while post flight:', error);
        res.status(505).json('Internal server error: ');
    }
};

const GetIdFlight = async(req:Request, res:Response) => {
    try{
        const flight_id =  req.params.id

        const flight = await Flight.findByPk(flight_id)
        if(!flight){res.status(400).json({ message: "Flight ID is not found"}) ; return};

        res.status(200).json({
            flight: flight
        })
    } catch (error) {
        console.error('Error while post flight:', error);
        res.status(505).json('Internal server error: ');
    }
}


const PutIdFlight = async(req:Request, res:Response) => {
    try {
        const flight_id = req.params.id

        const flight = await Flight.findByPk(flight_id);
    
        if(!flight){res.status(400).json({ message: "Flight is not found"}) ; return};

        const { FlightNumber, DepartureAirport, ArrivalAirport, FlightPrice, DepartureDate, DepartureTime, FlightDuration, Airline, PassengerCapacity } = req.body;

        const updateflight =  await flight.update({
          FlightNumber, 
          DepartureAirport, 
          ArrivalAirport, 
          FlightPrice, 
          FlightDuration, 
          DepartureDate, 
          DepartureTime,
          Airline, 
          PassengerCapacity,
          UpdateDate: new Date
        });


        res.status(200).json({
            message: "Flight is Updated",
            updateflight: updateflight
        })


    } catch (error) {
        console.error('Error while put flight:', error);
        res.status(505).json('Internal server error: ');
    }
}

const DeleteIdFlight = async(req: Request, res: Response) => {
    try {
        const flight_id = req.params.id

        const flight = await Flight.findByPk(flight_id);
    
        if(!flight){res.status(400).json({ message: "Flight is not found"}) ; return};

        const deleteflight = await flight.destroy()

        res.status(200).json({
            message: "Flight is Deleted",
            deleteflight: deleteflight
        })
    } catch (error) {
        console.error('Error while delete flight:', error);
        res.status(505).json('Internal server error: ');
    }
}


export { PostFlight, GetAllFlight, GetIdFlight, PutIdFlight, DeleteIdFlight}

