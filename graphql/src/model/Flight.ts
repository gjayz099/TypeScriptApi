import { sequelize } from '../db/dbConnect';
import { DataTypes, Model, Optional } from 'sequelize';

 export interface FlightAttributes {
    Id: string;
    FlightNumber?: string | null;
    DepartureAirport?: string | null;
    ArrivalAirport?: string | null;
    FlightPrice?: number | null;  // Changed to `number` since it’s typically stored as a decimal or float
    FlightDuration?: string | null;
    DepartureDate?: Date | null;
    DepartureTime?: string | null;
    Airline?: string | null;
    PassengerCapacity?: number | null;  // Changed to `number` to better represent capacity
    CreateDate?: Date | null;
    UpdateDate?: Date | null;
}


interface FlightCreationAttributes extends Optional<FlightAttributes, 'Id'> {}


class Flight extends Model<FlightAttributes, FlightCreationAttributes> implements FlightAttributes {
    [x: string]: any;
    public Id!: string;
    public FlightNumber?: string | null;
    public DepartureAirport?: string | null;
    public ArrivalAirport?: string | null;
    public FlightPrice?: number | null;  // Decimal or float type
    public FlightDuration?: string | null;
    public DepartureDate?: Date | null;
    public DepartureTime?: string | null;
    public Airline?: string | null;
    public PassengerCapacity?: number | null;  // Number type for capacity
    public CreateDate?: Date | null;
    public UpdateDate?: Date | null;
}

// Initialize the Flight model
Flight.init(
    {
        Id: {
            type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        FlightNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DepartureAirport: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ArrivalAirport: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        FlightPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        FlightDuration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DepartureDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        DepartureTime: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        Airline: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PassengerCapacity: {
            type: DataTypes.INTEGER,
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
        tableName: 'flight',
        timestamps: false, 
        createdAt: 'CreateDate',
        updatedAt: 'UpdateDate',
    }
);

export default Flight;
