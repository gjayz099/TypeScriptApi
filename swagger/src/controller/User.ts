import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

const PostUserSignUp = async (req: Request, res: Response) =>  {
  try{
  
    const { Username , FullName, Email, PasswordHash } = req.body;

    // Validate input fields
    if (!Username) {res.status(404).json({ message: 'Username are required' }); return};
    if (!PasswordHash) {res.status(400).json({ message: "Password are required." }); return};
    if (!FullName) {res.status(400).json({ message: "FullName are required." }); return};
    if (!Email) {res.status(400).json({ message: "Email are required." }); return};

    // Check if the username is already taken
    const UsernameTaken = await User.findOne({ where: { Username } });
    if (UsernameTaken) {res.status(409).json({ message: "This Username is already taken." }); return};

    const EmailTaken = await User.findOne({ where:  { Email }})
    if (EmailTaken) {res.status(409).json({ message: "This Email is already taken." }); return};

    const saltRounds = 12

    const hashedPassword = await bcrypt.hash(PasswordHash, saltRounds); 
    
    // Create the user and save to database
    const account = await User.create({
        Id: uuidv4(),
        Username, 
        PasswordHash: hashedPassword, 
        FullName, 
        Email,
        CreateDate: new Date()
    });
    

    res.status(200).json({   
      message: 'Signup Successful', 
      account: account 
  });

  }catch(error){
    console.error('Error while signup user:', error);
    res.status(505).json('Internal server error: ');
  }
};

const PostUserLogin = async(req: Request, res: Response) => {

  try {
      const { Username, PasswordHash} = req.body;

      if (!Username) { res.status(404).json({ message: 'Username are required' }); return};
      if (!PasswordHash) {res.status(400).json({ message: "Password are required." }); return};

      const account = await User.findOne({ where: { Username } });

      if (!account) { res.status(400).json( { message: 'Account not found'}); return};
      

      const accountPasswordHash = account.dataValues.PasswordHash;

      if (!accountPasswordHash || typeof accountPasswordHash !== 'string') {res.status(500).json({ message: 'Server error: Password not found in account data' }); return};
      

      const isPasswordMatch = await bcrypt.compare(PasswordHash, accountPasswordHash);

      if (!isPasswordMatch) {res.status(400).json({ message: 'Password is incorrect' }); return};
      
      const token = jwt.sign(
        {
          Username: account.dataValues.Username
        },
        'RANDOM-TOKEN',  
        { expiresIn: '1h' } 
      );

      res.status(200).json({
        message: 'Login successful',
        token, 
        user: 
        {
          Username: account.dataValues.Username,
          Id: account.dataValues.Id,
          FullName: account.dataValues.FullName,
          Email: account.dataValues.Email,
          Role: account.dataValues.Role,
        }
       })
      

  } catch (error) {
    console.error('Error while login user:', error);
    res.status(505).json('Internal server error: ');
  }
};

const GetAllUser = async(req: Request, res: Response) => {
  try{
    const user = await User.findAll({})

    if(!user){res.status(400).json({ message: 'User is Empty' }); return};

    res.status(200).json( {user: user} );

  }catch (error) {
    console.error('Error while Get all user:', error);
    res.status(505).json('Internal server error: ');
  }
}

const GetIdUser = async(req: Request, res: Response) => {
  try {

    const user_id = req.params.id

    const user = await User.findByPk(user_id)
    if(!user) {res.status(400).json({ message: "User is not found"}) ; return};

    res.status(200).json({user: user})

      
  } catch (error) {
    console.error('Error while Get one user:', error);
    res.status(505).json('Internal server error: ');
  }
}

const DeleteIdUser = async(req: Request, res: Response) => {
  try {
    const user_id = req.params.id

    const user = await User.findByPk(user_id)
    if(!user) {res.status(400).json({ message: "User is not found"}) ; return};

    const deleteduser = await user.destroy()

    res.status(200).json({ 
        message: "User has been deleted",
        userdelete: deleteduser
     });

  } catch (error) {
    console.error('Error while delete one user:', error);
    res.status(505).json('Internal server error: ');
  }
} 

export { PostUserSignUp, PostUserLogin, GetAllUser, GetIdUser, DeleteIdUser }
