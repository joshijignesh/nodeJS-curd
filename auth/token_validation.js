const { verify } = require('jsonwebtoken')

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, process.env.APP_TOKEN_KEY, (err, decode) => {
                if(err){
                    return res.json({
                        success : false,
                        message : "Invalid Token."
                    })
                } else {
                    next()
                }
            })
        } else {
            res.json({
                success : false,
                message : "Access denied! unauthorized user."
            })
        }
    }
}