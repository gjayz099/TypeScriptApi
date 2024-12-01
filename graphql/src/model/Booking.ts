import { sequelize } from '../db/dbConnect';  
import { DataTypes, Model, Optional } from 'sequelize';
import Passenger from './Passenger';  
import Flight from './Flight'; 

// Define the Booking model attributes interface
interface BookingAttributes {
    Id: string;  
    PassengerID?: string | null; 
    BookingDate?: Date | null; 
    FlightID?: string | null;  
    DepartureDateTime?: Date | null;  /// Optional
    ArrivalDateTime?: Date | null;  /// Optional
    SeatClass?: string | null; 
    SeatPreference?: string | null;  
    BookingStatus?: string | null;  
    PaymentStatus?: string | null; 
    CreateDate?: Date | null;  
    UpdateDate?: Date | null;  
}

// Interface for creation attributes (Id is not required during creation)
interface BookingCreationAttributes extends Optional<BookingAttributes, 'Id'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
    [x: string]: any;
    public Id!: string;
    public PassengerID?: string | null;
    public BookingDate?: Date | null;
    public FlightID?: string | null;
    public DepartureDateTime?: Date | null; /// Optional
    public ArrivalDateTime?: Date | null; /// Optional
    public SeatClass?: string | null;
    public SeatPreference?: string | null;
    public BookingStatus?: string | null;
    public PaymentStatus?: string | null;
    public CreateDate?: Date | null;
    public UpdateDate?: Date | null;

}

// Initialize the Booking model
Booking.init(
    {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,  
            // defaultValue: DataTypes.UUIDV4,  // Default to auto-generate UUID if not provided
        },
        PassengerID: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Passenger,  
                key: 'Id',
            },
        },
        BookingDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW, 
        },
        FlightID: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Flight, 
                key: 'Id',
            },
        },
        /// Optional
        DepartureDateTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        /// Optional
        ArrivalDateTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        SeatClass: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SeatPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BookingStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: 'Pending',  // Default status can be 'Pending'
        },
        PaymentStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: 'Unpaid',  // Default payment status can be 'Unpaid'
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
        sequelize, 
        tableName: 'booking',
        timestamps: false, 
        createdAt: 'CreateDate', 
        updatedAt: 'UpdateDate',  
    }
);

Booking.belongsTo(Passenger, { foreignKey: 'PassengerID' });
Booking.belongsTo(Flight, { foreignKey: 'FlightID' });

Passenger.hasOne(Booking, { foreignKey: 'PassengerID' });
Flight.hasMany(Booking, { foreignKey: 'FlightID' });


export default Booking;
