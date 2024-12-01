import Checkin from '../model/Checkin';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import Booking from '../model/Booking';
import Flight from '../model/Flight';


const PostCheckinWithParamsIdBooking = async(req: Request, res: Response) => {
    try{
        const booking_id = req.params.bookingId;

        const booking = await Booking.findByPk(booking_id);

        if(!booking) {res.status(404).json( { message: "Booking ID is not found"}) ; return};

        const {  BoardingGate, BoardingTime,  SeatAssignment }  = req.body;

        const checkin = await Checkin.create({
            Id: uuidv4(),
            BookingID: booking_id,
            CheckinDate: new Date(),
            CheckinTime: new Date().toLocaleTimeString('en-PH', { hour12: false }), // Format to "HH:mm:ss"
            CheckinStatus: "Checked-in",
            BoardingTime,
            BoardingGate,
            SeatAssignment,
            CreateDate: new Date()
        })


        res.status(200).json({
            message: 'Checkin created successfully',
            checkin: checkin
        })
    } catch (error) {
        console.error('Error while post Check-in:', error);
        res.status(505).json('Internal server error: ');
    }
}


const GetAllCheckin= async(req: Request, res: Response) => {
    try {
        const checkin = await Checkin.findAll({
            include: [
                {
                    model: Booking,
                    include: [
                        {
                            model: Flight,
                            attributes: [
                                'FlightPrice',
                                'Airline',
                                'PassengerCapacity'

                            ]
                        }
                    ],
                    attributes: [
                        'BookingDate',
                        'DepartureDateTime',
                        'ArrivalDateTime',
                        'SeatClass',
                        'SeatPreference',
                        'BookingStatus',
                        'PaymentStatus'
                    ],
                  
                }
            ]

        })

        res.status(200).json({
            checkin: checkin
        })
    } catch (error) {
        console.error('Error while get all Check-in:', error);
        res.status(505).json('Internal server error: ');
    }
}

const GetIdCheckin = async(req: Request, res: Response) => {
    try {
        const checkin_id = req.params.id;

        const checkin = await Checkin.findByPk(checkin_id, {
            include: [
                {
                    model: Booking,
                    include: [
                        {
                            model: Flight,
                            attributes: [
                                'FlightPrice',
                                'Airline',
                                'PassengerCapacity'

                            ]
                        }
                    ],
                    attributes: [
                        'BookingDate',
                        'DepartureDateTime',
                        'ArrivalDateTime',
                        'SeatClass',
                        'SeatPreference',
                        'BookingStatus',
                        'PaymentStatus'
                    ],
                  
                }
            ]
        });

        if(!checkin) { res.status(404).json({ messsage: "Check-in ID is not found"}); return}

        res.status(201).json({
            checkin: checkin
        })

    } catch (error) {
        console.error('Error while get one Check-in:', error);
        res.status(505).json('Internal server error: ');
    }
}

export { PostCheckinWithParamsIdBooking, GetAllCheckin, GetIdCheckin }
