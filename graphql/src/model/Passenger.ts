import { sequelize } from '../db/dbConnect';  // Ensure this points to your Sequelize instance
import { DataTypes, Model, Optional } from 'sequelize';

// Define the Passenger model attributes interface
interface PassengerAttributes {
    Id: string;  // UUID type for primary key
    FirstName?: string | null;
    LastName?: string | null;
    MiddleName?: string | null;
    DateOfBirth?: Date | null;
    Gender?: string | null;
    Nationality?: string | null;
    PassportNumber?: string | null;
    Email?: string | null;
    PhoneNumber?: string | null;  // Changed to string for better handling of phone numbers
    EmergencyContact?: string | null;
    CreateDate?: Date | null;
    UpdateDate?: Date | null;
}

// Interface for creation attributes (Id is not required during creation)
interface PassengerCreationAttributes extends Optional<PassengerAttributes, 'Id'> {}

// Define the Passenger model class
class Passenger extends Model<PassengerAttributes, PassengerCreationAttributes> implements PassengerAttributes {
    [x: string]: any;
    public Id!: string;
    public FirstName?: string | null;
    public LastName?: string | null;
    public MiddleName?: string | null;
    public DateOfBirth?: Date | null;
    public Gender?: string | null;
    public Nationality?: string | null;
    public PassportNumber?: string | null;
    public Email?: string | null;
    public PhoneNumber?: string | null;  // Use string for phone numbers
    public EmergencyContact?: string | null;
    public CreateDate?: Date | null;
    public UpdateDate?: Date | null;
}

// Initialize the Passenger model
Passenger.init(
    {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,  // This is your primary key, using UUID
        },
        FirstName: {
            type: DataTypes.STRING(255),  // Max length for first name
            allowNull: true,
        },
        LastName: {
            type: DataTypes.STRING(255),  // Max length for last name
            allowNull: true,
        },
        MiddleName: {
            type: DataTypes.STRING(255),  // Max length for middle name
            allowNull: true,
        },
        DateOfBirth: {
            type: DataTypes.DATEONLY,  // DATEONLY for just the date (no time)
            allowNull: true,
        },
        Gender: {
            type: DataTypes.STRING,  // Max length for gender (e.g., 'Male', 'Female')
            allowNull: true,
        },
        Nationality: {
            type: DataTypes.STRING,  // Max length for nationality
            allowNull: true,
        },
        PassportNumber: {
            type: DataTypes.STRING,  // Max length for passport number
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING,  // Max length for email
            allowNull: true,
            unique: true,  // Ensure email is unique
        },
        PhoneNumber: {
            type: DataTypes.STRING,  // Use STRING for phone number to handle symbols like + and -
            allowNull: true,
        },
        EmergencyContact: {
            type: DataTypes.STRING,  // Max length for emergency contact info
            allowNull: true,
        },
        CreateDate: {
            type: DataTypes.DATE,  // Store creation date
            allowNull: true,
        },
        UpdateDate: {
            type: DataTypes.DATE,  // Store last updated date
            allowNull: true,
        },
    },
    {
        sequelize,  // Sequelize instance
        tableName: 'passenger',  // Specify the table name in the database
        timestamps: false,  // Disable default createdAt/updatedAt
        createdAt: 'CreateDate',  // Map the `createdAt` field to `CreateDate`
        updatedAt: 'UpdateDate',  // Map the `updatedAt` field to `UpdateDate`
    }
);

export default Passenger;
