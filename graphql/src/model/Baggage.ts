import { sequelize } from '../db/dbConnect'; 
import { DataTypes, Model, Optional } from 'sequelize';
import Booking from './Booking';  

// Define the Baggage model attributes interface
interface BaggageAttributes {
    Id: string;  
    BookingID?: string | null;
    BaggageType?: string | null;  
    Weight?: number | null;  
    BaggageAllowance?: number | null;  
    ExcessWeight?: number | null; 
    BaggagePrice?: number | null;  
    BaggageClaimLocation?: string | null;
    CreateDate?: Date | null; 
    UpdateDate?: Date | null;
}

// Interface for creation attributes (Id is not required during creation)
interface BaggageCreationAttributes extends Optional<BaggageAttributes, 'Id'> {}

class Baggage extends Model<BaggageAttributes, BaggageCreationAttributes> implements BaggageAttributes {
    [x: string]: any;
    public Id!: string;
    public BookingID?: string | null;
    public BaggageType?: string | null; 
    public Weight?: number | null;  
    public BaggageAllowance?: number | null;  
    public ExcessWeight?: number | null;  
    public BaggagePrice?: number | null;  
    public BaggageClaimLocation?: string | null;
    public CreateDate?: Date | null;
    public UpdateDate?: Date | null;
}

Baggage.init(
    {
        Id: {
            type: DataTypes.UUID,
            primaryKey: true,
          
        },
        BookingID: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Booking, 
                key: 'Id', 
            },
        },
        BaggageType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Weight: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true,
        },
        BaggageAllowance: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true,
        },
        ExcessWeight: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: true,
        },
        BaggagePrice: {
            type: DataTypes.DECIMAL(8,2), 
            allowNull: true,
        },
        BaggageClaimLocation: {
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
        tableName: 'baggage',  
        timestamps: false,      
        createdAt: 'CreateDate', 
        updatedAt: 'UpdateDate'
    }
);



Baggage.belongsTo(Booking, { foreignKey: 'BookingID' });


Booking.hasOne(Baggage, { foreignKey: 'BookingID' });

export default Baggage;
