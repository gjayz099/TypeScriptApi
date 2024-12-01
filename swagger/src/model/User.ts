import { sequelize } from '../db/dbConnect';
import { DataTypes, Model, Optional } from 'sequelize';


interface UserAttributes {
    Id: string;
    Username?: string;
    PasswordHash?: string;
    FullName?: string;
    Email?: string;
    Role?: string | null; 
    CreateDate?: Date | null;
    UpdateDate?: Date | null;
}


interface UserCreationAttributes extends Optional<UserAttributes, 'Id'> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    [x: string]: any;
    public Id!: string;
    public Username!: string;
    public PasswordHash!: string;
    public FullName!: string;
    public Email!: string;
    public Role!: string | null; 
    public CreateDate!: Date | null;
    public UpdateDate!: Date | null;

}

User.init({
    Id: {
        type: DataTypes.UUID,
        primaryKey: true,
        // defaultValue: DataTypes.UUIDV4,  // Optional: Automatically generate UUID if needed
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: true,
 
    },
    PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'AdminUser',
    },
    CreateDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    UpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    createdAt: 'CreateDate',
    updatedAt: 'UpdateDate',
});

export default User;
