const pool =  require('../../config/database')

module.exports = {

    // Create User
    create : (data, callback) => {
        pool.query(
            `insert into users(name, gender, email, password, number) 
            values(?,?,?,?,?)`,
            [
                data.name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, result, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, result)
            }
        );
    },

    // Fetch All Users
    getUsers : (callback)=> {
            pool.query(`select id,name,email,password,gender from users`,
            [],
            (error, result, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, result)
            })
    },

    // Fetch User From Id
    getUser : (id, callback)=> {
            pool.query(`select id,name,email,password,gender from users WHERE id=?`,
            [id],
            (error, result, fields) => {
                if(error){
                    return callback(error)
                }
                console.log("got response")
                return callback(null, result[0])
            })
    },

    login : (data, callback)=> {
        pool.query(`SELECT * FROM users WHERE email=?`,
        [data.email],
        (error, result, fields) => {
            if(error){
                return callback(error)
            }
            return callback(null, result)
        })
},

    //Update User
    update : (data, callback)=> {
            pool.query(`UPDATE users SET name=?,email=?,password=?,gender=? WHERE id=?`,
            [
                data.name, data.email, data.password, data.gender, data.id
            ],
            (error, result, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, result[0])
            })
    },


    // Delete User 
    delete : (data, callback)=> {
            pool.query(`DELETE FROM users WHERE id=?`,
            [data.id],
            (error, result, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, result[0])
            });
    }
}