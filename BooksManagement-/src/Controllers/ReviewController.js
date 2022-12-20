const {body,isValidObjectId, isValidname} = require("../middleware/validation");
const BooksModel = require("../Models/BooksModel");
const validator=require('validator');
const ReviewModel = require("../Models/ReviewModel");


let createReviews = async (req,res)=>{

try {
    let bookId = req.params.bookId
  if(!bookId) return res.status(400).send({status:false,msg:"Book id should be in params"})
  if(!isValidObjectId(bookId))
  return res.status(400).send({status:false, msg: "BookId is not Valid"})
  let CheckBook= await BooksModel.findById(bookId)
  if(CheckBook.isDeleted==true) return res.status(404).send({status:false,msg:"no book found"})

  let data=req.body
  if(!body(data)) return res.status(400).send({status:false,msg:"Input is missing"})

  if(!isValidname(data.reviewedBy)) return res.status(400).send({status:false,msg:"name is mandatory"})
  if(!validator.isDate(data.reviewedAt)) return res.status(400).send({status:false,msg:"date is mandatory"})
  if(!data.rating ) return res.status(400).send({status:false,msg:"rating is mandatory"})
  if((!(data.rating<6) && (data.rating>0))) return res.status(400).send({status:false,msg:"rating should be between 1 to 5"})

   data.bookId=bookId

 let reviewData=await ReviewModel.create(data)
  await BooksModel.updateOne({_id:bookId},{$inc:{reviews:1}})
  return res.status(201).send({status:true,msg:"Review Created successfully",data:reviewData})    

} catch (error) {
    return res.status(500).send({msg:error.message})
    
}

}

//UPDATE REVIEWS DATA
const updateReviewData= async function(req, res){
try{
data = req.body
const{rating, reviewedBy,review } = data
if(!body(data))return res.status(400).send({status:false,msg:"Input is missing"})
if((!(rating) && (reviewedBy) && (review))) return res.status(400).send({status:false,msg: "You can Only update: Rating,reviewedBy,reviewedBy "})
if((!(rating<6) && (rating>0))) return res.status(400).send({status:false,msg:"rating should be between 1 to 5"})

bookId=req.params.bookId
reviewId=req.params.reviewId

if(!bookId) return res.status(400).send({status:false, msg: "BookId is required"})
if(!isValidObjectId(bookId))
return res.status(400).send({status:false, msg: "BookId is not Valid"})

if(!reviewId) return res.status(400).send({status:false, msg: "reviewId is required"})
if(!isValidObjectId(reviewId))
return res.status(400).send({status:false, msg: "reviewId is not Valid"})

let checkReviewId=await ReviewModel.findById(reviewId)
if(!checkReviewId)  return res.status(400).send({status:false, msg: " review not found by the reviewId "})

if(checkReviewId.bookId.toString()!== bookId)
return res.status(400).send({status:false, msg: "Review Not Found, Id doesn't matched"})

if(checkReviewId.isDeleted== true) 
return res.status(400).send({status:false, msg: "Review already deleted"})

let updateReview = await ReviewModel.findByIdAndUpdate({_id:reviewId},data,{new:true})
return res.status(200).send({status:true, msg: "Review updated Successfully", data:updateReview})

}
 catch (error) {
    return res.status(500).send({status:false,msg:error.message})
  
}
}

// DELETE REVIEWS

const deleteReviews= async function(req, res){
  try {
  bookId=req.params.bookId
  reviewId=req.params.reviewId

  if(!bookId) return res.status(400).send({status:false, msg: "BookId is required"})
  if(!isValidObjectId(bookId))
  return res.status(400).send({status:false, msg: "BookId is not Valid"})

  if(!reviewId) return res.status(400).send({status:false, msg: "reviewId is required"})
  if(!isValidObjectId(reviewId))
  return res.status(400).send({status:false, msg: "reviewId is not Valid"})

  let checkReviewId=await ReviewModel.findById(reviewId)
  if(!checkReviewId)  return res.status(400).send({status:false, msg: " review not found by the reviewId "})

  if(checkReviewId.bookId.toString()!== bookId)
  return res.status(400).send({status:false, msg: "Book Not Found, Id doesn't matched"})

  if(checkReviewId.isDeleted== true) 
  return res.status(400).send({status:false, msg: "Book already deleted"})

  await BooksModel.updateOne({_id:bookId},{$inc:{reviews:-1}})
  await ReviewModel.updateOne({_id:reviewId}, { $set: { isDeleted: true, deletedAt: new Date() } })
  return res.status(200).send({status:true, msg: "review Deleted Successfully"})

} catch (error) {
    return res.status(500).send({status:false,msg:error.message})
  
}
}


module.exports.createReviews=createReviews
module.exports.deleteReviews=deleteReviews
module.exports.updateReviewData=updateReviewData