import Passenger from '../model/Passenger';
import { v4 as uuidv4 } from 'uuid';


const rootPassenger = {
    postPassenger: async ( { input } : Passenger  ) => {
        try {
            
            const { FirstName, LastName,  MiddleName, DateOfBirth, Gender, Nationality, PassportNumber, Email, PhoneNumber, EmergencyContact} = input;


            if (!FirstName) return {message : 'FirstName is required'};
            if (!LastName) return {message : 'LastName is required'};
            if (!DateOfBirth) return {message : 'DateOfBirth is required'};
            if (!Gender) return {message : 'Gender is required'};
            if (!Email) return {message : 'Email is required'};
         

            const passenger = await Passenger.create({
                Id: uuidv4(),
                FirstName, 
                LastName,  
                MiddleName, 
                DateOfBirth, 
                Gender, 
                Nationality, 
                PassportNumber, 
                Email, 
                PhoneNumber, 
                EmergencyContact,
                CreateDate: new Date(), 
            })

            return {
                message: 'Flight created successfully',
                Id: passenger.dataValues.Id
              };
          
        } catch (error) {
            console.error('Error while post passenger:', error);
            // Throw a more informative error message
            throw new Error('Internal server error: ');
        }
    },
    getAllPassenger: async ({ } : Passenger) => {
        try{
            const passengers = await Passenger.findAll({})

            const passengerDetails = passengers.map(passenger => ({
                Id: passenger.dataValues.Id,
                FirstName: passenger.dataValues.FirstName, 
                LastName: passenger.dataValues.LastName,  
                MiddleName: passenger.dataValues.MiddleName, 
                DateOfBirth: passenger.dataValues.DateOfBirth, 
                Gender: passenger.dataValues.Gender, 
                Nationality: passenger.dataValues.Nationality, 
                PassportNumber: passenger.dataValues.PassportNumber, 
                Email: passenger.dataValues.Email, 
                PhoneNumber: passenger.dataValues.PhoneNumber, 
                EmergencyContact: passenger.dataValues.EmergencyContact
            }))

            return passengerDetails
            
        } catch (error) {
            console.error('Error while get passenger:', error);
            // Throw a more informative error message
            throw new Error('Internal server error: ');
        }
    },
    getIdPassenger: async ({ Id } : Passenger) => {

        try{
            const passenger = await Passenger.findByPk(Id)

            if(!passenger){ return {message : `No passenger exists with id ${Id}`}};



            return {
                Id: passenger.dataValues.Id,
                FirstName: passenger.dataValues.FirstName, 
                LastName: passenger.dataValues.LastName,  
                MiddleName: passenger.dataValues.MiddleName, 
                DateOfBirth: passenger.dataValues.DateOfBirth, 
                Gender: passenger.dataValues.Gender, 
                Nationality: passenger.dataValues.Nationality, 
                PassportNumber: passenger.dataValues.PassportNumber, 
                Email: passenger.dataValues.Email, 
                PhoneNumber: passenger.dataValues.PhoneNumber, 
                EmergencyContact: passenger.dataValues.EmergencyContact
            };
        } catch (error) {
            console.error('Error while get one passenger:', error);
            // Throw a more informative error message
            throw new Error('Internal server error: ');
        }

    }



}


export default rootPassenger;