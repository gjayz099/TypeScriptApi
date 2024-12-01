import { sequelize } from "../db/dbConnect";
import { DataTypes, Model, Optional } from 'sequelize';
import Booking from './Booking';  // Import the Booking model

interface PaymentAttributes {
    Id: string;
    BookingID?: string | null;
    Amount?: number | null;
    PaymentMethod?: string | null
    PaymentStatus?: string | null
    PaymentDate?: Date | null
    CreateDate?: Date | null;
    UpdateDate?: Date | null; 

}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'Id'> {}

// Define the Payment model
class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    [x: string]: any;
    public Id!: string;
    public BookingID!: string | null;
    public Amount?: number | null;
    public PaymentMethod?: string | null;
    public PaymentStatus?: string | null;
    public PaymentDate?: Date | null
    public CreateDate?: Date | null;
    public UpdateDate?: Date | null;
}


Payment.init(
    {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            // defaultValue: DataTypes.UUIDV4,  // Automatically generate UUID for each payment
        },
        BookingID: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Booking,  // The referenced table (Booking)
                key: 'Id',       // The referenced column (Id) in the Bookings table
            },
        },
        Amount: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true,
        },
        PaymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PaymentStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PaymentDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,  // Default to the current date/time
        },
        CreateDate: {
            type: DataTypes.DATE,
            allowNull: true,
          
        },
        UpdateDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        
    },
    {
        sequelize,  // Pass the Sequelize instance
        tableName: 'Payment',  // The name of the table in the database
        timestamps: false,      // Assuming no 'createdAt' and 'updatedAt' fields
        createdAt: 'CreateDate', 
        updatedAt: 'UpdateDate'
    }
);

export default Payment;