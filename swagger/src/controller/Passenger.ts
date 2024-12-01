import Passenger from '../model/Passenger';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';



const PostPassenger = async(req: Request, res: Response) => {
    try {
        const { FirstName, LastName, MiddleName, DateOfBirth, Gender, Nationality, PassportNumber, Email, PhoneNumber, EmergencyContact} = req.body;

        if(!FirstName){ res.status(404).json( {message: "FirstName are required." }); return}
        if(!LastName){ res.status(404).json( {message: "LastName are required." }); return}
        if(!MiddleName){ res.status(404).json( {message: "MiddleName are required." }); return}
        if(!DateOfBirth){ res.status(404).json( {DateOfBirth: "DateOfBirth are required." }); return}
        if(!Gender){ res.status(404).json( {Gender: "Gender are required." }); return}
        if(!Email){ res.status(404).json( {Gender: "Email are required." }); return} /// any kind Email

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
            CreateDate: new Date()
        })

        res.status(200).json({   
            message: 'Passenger Successful Create', 
            passenger: passenger 
        });

        
    } catch (error) {
        console.error('Error while post passenger:', error);
        res.status(505).json('Internal server error: ');
    }
    
}

const GetAllPassenger = async(req: Request, res: Response) => {
    try {
        const passenger = await Passenger.findAll({})

        if(!passenger){res.status(400).json({ message: "Passenger is not found"}) ; return};

        res.status(200).json({passenger: passenger})

    } catch (error) {
        console.error('Error while get all passenger:', error);
        res.status(505).json('Internal server error: ');
    }
}

const GetIdPassenger = async(req: Request, res: Response) => {
    try{
        const passenger_id = req.params.id

        const passenger = await Passenger.findByPk(passenger_id)

        if(!passenger){res.status(400).json({ message: "Passenger is not found"}) ; return};

        res.status(200).json({
            passenger: passenger
        })


    } catch (error) {
        console.error('Error while get one passenger:', error);
        res.status(505).json('Internal server error: ');
    }
};





export { PostPassenger, GetAllPassenger, GetIdPassenger }