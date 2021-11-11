const { genSaltSync, hashSync } = require('bcrypt');
const pool = require('../../config/database');
const { create, getUsers, getUser, update } = require('./user.service');
const salt = genSaltSync(10);

module.exports = {
    createUser : (req, res)=>{
        const body  = req.body;
        body.password = hashSync(body.password, salt)
        create(body, (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : false,
                    message : 'database connection error'
                })
            }
            return res.status(200).json({
                success: true,
                message : 'user created successfully',
                data : result
            })
        })
    },

    getUserById : (req, res) => {
        var id = req.params.id
        getUser(id, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message : "Oops !! Something went wrong. Please try again later."
                })
            }
            if(!result){
                return res.status(200).json({
                    success: true,
                    message : 'user result not found'
                })
            }
            return res.status(200).json({
                success: true,
                message : 'user fatched successfully',
                data : result
            })
        })
    },

     getAllUsers : (req, res) => {
        getUsers((err, result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message : "Oops !! Something went wrong. Please try again later."
                })
            }

            return res.status(200).json({
                success: true,
                message : 'users fatched successfully',
                data : result
            })
        })
    },

    updateUser : (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password , salt)
        update(body, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message : "Oops !! Something went wrong. Please try again later."
                })
            }

            // if success call API For Fetching user details
            getUser(req.body.id, (err, response) => {
                 if(err){ // return the response 
                    return res.status(500).json({
                        success: false,
                        message : "Oops !! Something went wrong. Please try again later."
                    })
                 }

                //perform callback to push the result to API
                return res.status(200).json({
                    success: true,
                    message : 'user updated successfully',
                    data : {user : response} 
                })
            })

            
        })
    },

    deleteuser : (req, res) => {
        this.deleteuser(req.body.id, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message : "Oops !! Something went wrong. Please try again later."
                })
            }

            return res.status(200).json({
                success: true,
                message : 'user updated successfully',
                data : result
            })
        })
    },
}