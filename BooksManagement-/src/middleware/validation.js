const mongoose=require ('mongoose')


// for personName
const isValidname=function(name){
    if(/^[A-Za-z, ]{2,80}$/.test(name.trim())) return true
    return false
  }
  
  // for mobile number
  const mobile=function(mobile){
    if(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile)) return true
    return false
  }
  
  // for email id
  const email=function(email){
      if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email) ) return true
      return false
    }
  
    // for body
  const body = function (data) {
      return Object.keys(data).length > 0;
    }

    // for title
    const titleValid=function(title){
        const data=["Mr", "Mrs","Miss"].filter(e1=>e1==title)
       return data.length>0
    }
   
    // password
    const password=function(password){
        if(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/.test(password) ) return true
        return false
      }

      const address=function(name){
        if(/^[A-Za-z, 0-9]{2,80}$/.test(name.trim())) return true
        return false
      }
      const pincode=function(name){
        if(/^[0-9]{6}$/.test(name.trim())) return true
        return false
      }
      const isValidObjectId = function (ObjectId) { return mongoose.Types.ObjectId.isValid(ObjectId) }

      const isValidISBN = function (ISBN) {
        if (/^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)) return true
    }
    

    const validation = function (value) {
      if (value == undefined || value == null) {
          return false
      }
      if (typeof (value) == "string" && value.trim() == 0) {
          return false
      }
      return true
  }
  

    module.exports={body,email,mobile,isValidname,titleValid,password,address,pincode,isValidObjectId,isValidISBN,validation}