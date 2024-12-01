import Flight,  { FlightAttributes }from '../model/Flight';
import { v4 as uuidv4 } from 'uuid';


const rootFlight = {

    postFlight: async ( { input } :  Flight  ) => {
        try {
    
          const { 
            FlightNumber, 
            DepartureAirport, 
            ArrivalAirport, 
            FlightPrice, 
            DepartureDate,
            DepartureTime,
            FlightDuration, 
            Airline, 
            PassengerCapacity 
          } = input;
    
        

          const flightPriceNum = Number(FlightPrice);
          if (!FlightNumber) return {message : 'Flight Number is required'};
          if (!DepartureAirport) return {message : 'Departure Airport is required'};
          if (!ArrivalAirport) return {message : 'Arrival Airport is required'};
          if (!DepartureDate) return {message : 'Departure Date is required'};
          if (!DepartureTime) return {message : 'Departure Time is required'};
          if (!FlightPrice || FlightPrice <= 0) return {message : 'Valid FlightPrice is required'};
          if (isNaN(flightPriceNum) || flightPriceNum <= 0) return {message : 'Valid FlightDuration is required'};
          if (!Airline) return {message : 'Airline is required'};
          if (!PassengerCapacity || PassengerCapacity <= 0) return {message : 'Valid PassengerCapacity is required'};
    
         
          await Flight.create({
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
            CreateDate: new Date(), 
          });
    
    
    
          return {
            message: 'Flight created successfully',
    
          };
        } catch (error) {
          console.error('Error while creating flight:', error);
          // Throw a more informative error message
          throw new Error('Internal server error: ');
        }
    },
    getAllFlight: async ({} : Flight )  => {
        try {

            const flights = await Flight.findAll({})
    
    
            const flightDetails = flights.map(flight => ({
                Id: flight.Id, 
                FlightNumber: flight.dataValues.FlightNumber, 
                DepartureAirport: flight.dataValues.DepartureAirport, 
                ArrivalAirport: flight.dataValues.ArrivalAirport, 
                FlightPrice: flight.dataValues.FlightPrice, 
                FlightDuration: flight.dataValues.FlightDuration, 
                DepartureDate: flight.dataValues.DepartureDate, 
                DepartureTime: flight.dataValues.DepartureTime, 
                Airline: flight.dataValues.Airline, 
                PassengerCapacity: flight.dataValues.PassengerCapacity,
            }));
    
            return flightDetails
        } catch (error) {
            console.error('Error while get all flight:', error);
    
            throw new Error('Internal server error: ' );
        }
    },
    getIdFlight: async( {Id} : Flight) => {
        try {
            const flight = await Flight.findByPk(Id);
    
            if(!flight) return {message : `No flight exists with id ${flight}`};
    
            return {
                Id: Id, /// --Optional
                FlightNumber: flight.dataValues.FlightNumber, 
                DepartureAirport: flight.dataValues.DepartureAirport, 
                ArrivalAirport: flight.dataValues.ArrivalAirport, 
                FlightPrice: flight.dataValues.FlightPrice, 
                FlightDuration: flight.dataValues.FlightDuration, 
                DepartureDate: flight.dataValues.DepartureDate, 
                DepartureTime: flight.dataValues.DepartureTime,
                Airline: flight.dataValues.Airline, 
                PassengerCapacity: flight.dataValues.PassengerCapacity,
            }
            
        } catch (error) {
            console.error('Error while get one flight:', error);
            throw new Error('Internal server error: ')
        }
    },

    putIdFlight: async ( {input, Id} : Flight ) => {
        try{
       
            const flight = await Flight.findByPk(Id);
    
            if (!flight) { return {message : `No flight exists with id ${Id}`};}
    
    
            const { FlightNumber, DepartureAirport, ArrivalAirport, FlightPrice, DepartureDate, DepartureTime, FlightDuration, Airline, PassengerCapacity } = input;
    
            await flight.update({
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
    
    
            return { message: 'Flight updated successfully' };
    
        } catch (error) {
          console.error('Error while update one flight:', error);
          throw new Error('Internal server error: ');
        }
    },
    deleteIdFlight: async( { Id } :Flight ) => {
        try{
          const flight = await Flight.findByPk(Id);
    
          if (!flight) { return {message : `No flight exists with id ${Id}`};}
    
          await flight.destroy()
    
          return { message: 'Flight delete successfully' };
    
        } catch (error) {
          console.error('Error while delete one flight:', error);
          throw new Error('Internal server error: ');
        }
    }
};


export default rootFlight;