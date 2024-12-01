import Booking from '../model/Booking';
import Payment from '../model/Payment';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


const PostBaggageWithParamsIdBooking = async(req: Request, res: Response) => {
    try {
        const booking_id = req.params.bookingId;

        const booking = await Booking.findByPk(booking_id);

        if(!booking) {res.status(404).json( { message: "Booking ID is not found"}) ; return};

        const { Amount, PaymentMethod, PaymentStatus, PaymentDate} = req.body;


        const payment = await Payment.create({
            Id: uuidv4(),
            BookingID: booking_id,
            Amount, 
            PaymentMethod, 
            PaymentStatus, 
            PaymentDate,
            CreateDate: new Date()
        })

        res.status(200).json({
            message: 'Payment created successfully',
            payment: payment
        })

    } catch (error) {
        console.error('Error while post baggage:', error);
        res.status(505).json('Internal server error: ');
    }
}


export { PostBaggageWithParamsIdBooking}
