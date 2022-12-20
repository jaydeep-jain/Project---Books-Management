const jwt =require('jsonwebtoken')
const BooksModel = require('../Models/BooksModel')

const authentication = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            res.status(400).send({ err: "token is not present" })
        }
        
            let decodedtoken = jwt.verify(token, "group26project-3")
            User = decodedtoken.userId

            next()
        } catch (err) {
            return res.status(400).send({ status: false, msg: `${err.message} please check your token` })
        }
    } 

    const authorisation = async function (req, res, next) {

        try {
            let bookId = req.params.bookId
            let validbook = await BooksModel.find({bookId})
            if (!validbook) return res.status(404).send({ status: true, msg: "No book is present with this bookId" })
    
            let UserId = validbook.userId
            let decodedToken = User


            if (UserId != decodedToken) {
                return res.status(401).send({ status: false, msg: "you are not authorise person " })
            }
            next()
        } catch (err) {
            return res.status(500).send({msg:err.message })
        }
    
    }

module.exports.authentication = authentication
module.exports.authorisation = authorisation

