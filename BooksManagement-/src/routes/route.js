const express = require('express');
const router = express.Router();
const UserController=require('../Controllers/UserController.js')
const BookController=require('../Controllers/BookController.js')
const ReviewController=require('../Controllers/ReviewController.js')
const Auth=require('../middleware/auth.js')

router.get('/test-me', function (req, res) {
    console.log('My batch is', req.name)
    res.send('My second ever api!')
});


router.post('/register',UserController.CreateUser)
router.post('/login',UserController.LoginUser)
//==========================================================================================
router.post('/books',Auth.authentication,BookController.createBook)
router.get('/books',Auth.authentication,BookController.getBooks)
router.get('/books/:bookId',Auth.authentication,BookController.getBookById)
router.put('/books/:bookId',Auth.authentication,Auth.authorisation,BookController.UpdateBooks)
router.delete('/books/:bookId',Auth.authentication,Auth.authorisation,BookController.deleteBooks)
//=====================================================================================
router.post('/books/:bookId/review',ReviewController.createReviews)
router.put('/books/:bookId/review/:reviewId',ReviewController.updateReviewData)
router.delete('/books/:bookId/review/:reviewId',ReviewController.deleteReviews)




module.exports = router