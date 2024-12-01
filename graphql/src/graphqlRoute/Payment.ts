import Payment from '../model/Payment';
import Booking from "../model/Booking";
import { v4 as uuidv4 } from 'uuid';


const rootPayment = {
    postPaymentBookingID: async( { input, bookingId}  : Payment) => {
        try{
            const { Amount, PaymentMethod, PaymentStatus, PaymentDate } = input

            const booking = await Booking.findByPk(bookingId);


            if (!booking) {return {message : 'booking not found'}};

            const payment = await Payment.create({
                Id: uuidv4(),
                BookingID: bookingId,
                Amount, 
                PaymentMethod, 
                PaymentStatus, 
                PaymentDate: new Date(),
                CreateDate: new Date()
            })

            return {
                Id: payment.dataValues.Id,
                BookingID: {
                    SeatClass: booking.dataValues.SeatClass,
                    SeatPreference: booking.dataValues.SeatPreference,
                    BookingStatus: booking.dataValues.BookingStatus,
                    PaymentStatus: booking.dataValues.PaymentStatus,
                },
                Amount: payment.dataValues.Amount,
                PaymentMethod: payment.dataValues.PaymentMethod ,
                PaymentStatus: payment.dataValues.PaymentStatus,
                PaymentDate: payment.dataValues.PaymentDate,
            }

        } catch (error) {
            console.error('Error while post payment:', error);
            // Throw a more informative error message
            throw new Error('Internal server error: ');
        }
    }
}


export default rootPayment;