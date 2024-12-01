import bcrypt from 'bcryptjs';
import User from '../model/User';
import jwt from 'jsonwebtoken'; 
import { v4 as uuidv4 } from 'uuid';

const rootUser = {
    postSignupUser: async ({ input } : User) => {
        try {
            const { Username, FullName, Email, Password } = input;


            if(!Username){ return {message: "Username is Required"}};
            if(!FullName){ return {message: "FullName is Required"}};
            if(!Email){ return {message: "Email is Required"}};
            if(!Password){ return {message: "Password is Required"}};

            const existingUser = await User.findOne({ where: { Email } });
            if (existingUser) { return {message : "A user with this email already exists"}};
    
            const existingUsername = await User.findOne({ where: { Username } });
            if (existingUsername) { return {message : "This username is already taken"}};
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(Password, 12); // Hash the password with a salt of 12 rounds
            
            // Create the user and save to database
            const account = await User.create({
                Id: uuidv4(),
                Username, 
                PasswordHash: hashedPassword, // Ensure the hashed password is stored here
                FullName, 
                Email 
            });
    
            return {      
                message: 'User created successfully'
           
             };
        } catch (error) {
            console.error('Error while signing up user:', error);
            throw new Error('Internal server error: ');
        }
    },
    

    postLoginUser: async ({ input } : User) => {
        try {
            const { Username, Password } = input;
    
            if (!Username || !Password) {return { message: 'Username and Password are required'}}
    
    

            const account = await User.findOne({ where: { Username } });
            if (!account) { return { message: 'Account not found'}};
         

   
            if (!account.dataValues.PasswordHash) { return { message: 'No password hash found in the database for this account'}};


            const isPasswordMatch = await bcrypt.compare(Password, account.dataValues.PasswordHash);
            if (!isPasswordMatch) {return { message: 'Password is incorrect' }}
    
            const useToken = jwt.sign(
                {
                    Username: account.Username,
                    Id: account.Id,
                    FullName: account.FullName,
                    Email: account.Email,
                    Role: account.Role,
                },
                 'RANDOM-TOKEN',  // Secret for JWT token
                { expiresIn: '1h' }  // Token expires in 1 hour
            );
    
            return {
                user: account.dataValues,
                message: 'Login successful',
                useToken,  // The JWT token
            };
    
        } catch (error) {
            console.error('Error while login user:', error);
            throw new Error('Internal server error: ');
        }
    },

    getAllUser: async({} : User) => {
        try{

            const users = await User.findAll({})

            const formattedUsers = users.map(user => ({
                Id: user.dataValues.Id,
                Username: user.dataValues.Username,
                FullName: user.dataValues.FullName,
                Email: user.dataValues.Email,
                Role: user.dataValues.Role,
                CreateDate: user.dataValues.CreateDate,
                UpdateDate: user.dataValues.UpdateDate,
            }));



            return formattedUsers

            
        } catch (error) {
        console.error('Error while get all user:', error);
        throw new Error('Internal server error: ');
        }
    },

    getIdUser: async( { Id } : User ) => {
        try{
            const user = await User.findByPk(Id);

            if(!user) {return { message: `No user exists with id ${Id}`}};

        
            return {
                Id: user.dataValues.Id,
                Username: user.dataValues.Username,
                FullName: user.dataValues.FullName,
                Email: user.dataValues.Email,
                Role: user.dataValues.Role,
                CreateDate: user.dataValues.CreateDate,
                UpdateDate: user.dataValues.UpdateDate,
            };

        } catch (error) {
            console.error('Error while get id user:', error);
            throw new Error('Internal server error: ' );
        }
    },

    deleleUser: async( { Id }  : User) => {
        try {
            const user = await User.findByPk(Id);

            if(!user) { return{ message:`No user exists with id ${Id}`}};

           await user.destroy();

           return {  message: 'User Deleted successfully' };

        } catch (error) {
            console.error('Error while get id user:', error);
            throw new Error('Internal server error: ');
        }
    }
};

export default rootUser;
