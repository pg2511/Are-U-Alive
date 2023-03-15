const bcrypt = require('bcrypt');

const userSchema = require("./UserSchema");

const verifyEmail = (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  
    return pattern.test(email);
};

const signupUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({
            status: false,
            message: `All fields are required`,
        });
        return;
    }

    if(!verifyEmail(email)){
        res.status(400).json({
            status: false,
            message: `Email is not valid`,
        });
        return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
        name, 
        email,
        password: hashedPassword,
    });

    newUser.save().then((user) => {
        res.status(201).json({
            status: true,
            message: `User successfully created`,
            data: user,
        });
        return;
    }).catch(err => {
        res.status(500).json({
            status: false,
            message: `Error creating user`,
            error: err,
        });
    })
}


const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            status: false,
            message: `All fields are required`,
        });
        return;
    }

    if(!verifyEmail(email)){
        res.status(400).json({
            status: false,
            message: `Email is not valid`,
        });
        return;
    }
    
    const user = await userSchema.findOne({ email });

    if(!user) {
        res.status(422).json({
            status: false,
            message: `Email is not present in our database`,
        });
        return;
    }

    const dbPassword = user.password;

    const matched = await bcrypt.compare(password, dbPassword);

    if(!matched) {
        res.status(422).json({
            status: false,
            message: `Credentials does not match`,
        });
        return;
    }

    res.status(200).json({
        status: true,
        message: `Login Successful`,
        data: user,
    });
};

module.exports = {
    signupUser, loginUser,
}