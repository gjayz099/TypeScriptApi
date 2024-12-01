import { sequelize } from "../db/dbConnect";  // Ensure this points to your Sequelize instance
import { DataTypes, Model, Optional } from "sequelize";
import Booking from "./Booking";  // Import the Booking model

// Define the Checkin model attributes interface
interface CheckinAttributes {
    Id: string;  // UUID type for primary key
    BookingID?: string | null;  // Reference to the booking (nullable)
    CheckinDate?: Date | null;  // Date when check-in happened
    CheckinTime?: string | null;  // Check-in Time (nullable, changed to string for TIME type)
    CheckinStatus?: string | null;  // Check-in Status: 'Checked-in', 'Pending', 'Cancelled'
    BoardingGate?: string | null;  // Boarding gate (nullable)
    BoardingTime?: string | null;  // Time when the passenger boards the plane (nullable, changed to string for TIME type)
    SeatAssignment?: string | null;  // Seat assignment (nullable)
    CreateDate?: Date | null;  // Creation date of the check-in record
    UpdateDate?: Date | null;  // Last update date of the check-in record
}

// Define the Checkin model creation attributes
interface CheckinCreationAttributes extends Optional<CheckinAttributes, 'Id'> {}

// Define the Checkin model
class Checkin extends Model<CheckinAttributes, CheckinCreationAttributes> implements CheckinAttributes {
    [x: string]: any;
    public Id!: string;
    public BookingID!: string | null;
    public CheckinDate!: Date | null;
    public CheckinTime!: string | null;  // Corrected to string for time type
    public CheckinStatus!: string | null;
    public BoardingGate!: string | null;
    public BoardingTime!: string | null;  // Corrected to string for time type
    public SeatAssignment?: string | null;
    public CreateDate?: Date | null;
    public UpdateDate?: Date | null;
}

// Initialize the model with Sequelize
Checkin.init(
    {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
            // defaultValue: DataTypes.UUIDV4,  // Optional: Uncomment if you want to auto-generate UUID
        },
        BookingID: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Booking,  // Assuming Booking model is properly defined and imported
                key: 'Id',
            },
        },
        CheckinDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CheckinTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        CheckinStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BoardingGate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        BoardingTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        SeatAssignment: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: 'Checkin',
        timestamps: false, 
        createdAt: 'CreateDate',  // Map the `createdAt` field to `CreateDate`
        updatedAt: 'UpdateDate',  // Map the `updatedAt` field to `UpdateDate`
    }
);

// Establish relationships
Checkin.belongsTo(Booking, { foreignKey: "BookingID" });  // Define the foreign key to the Booking model
Booking.hasOne(Checkin, { foreignKey: "BookingID" });  // One Booking can have one Checkin record

export default Checkin;
