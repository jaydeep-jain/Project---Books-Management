const UserModel = require("../Models/UserModel.js");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const validation = require("../middleware/validation");
const { isValidname, email, titleValid , body} = require("../middleware/validation");


const CreateUser = async (req, res) => {
  try {
    let data = req.body;

    if (!body(data))
      return res.status(400).send({ status: false, msg: "Input Should not be Empty" });

    if (!data.title)
      return res.status(400).send({ status: false, msg: "title is mandatory" });
    if (!titleValid(data.title))
     return res.status(400).send({ status: false, msg: "title must be of Mr, Mrs and Miss" });
     
    if (!data.phone)
      return res.status(400).send({ status: false, msg: "phone is mandatory" });
    if (!validation.mobile(data.phone))
      return res.status(400).send({ status: false, msg: "phone is not valid" });

    if (!data.name)
      return res.status(400).send({ status: false, msg: "name is mandatory" });
    if (!isValidname(data.name))
      return res.status(400).send({ status: false, msg: "name is not valid" });

    if (!data.email)
      return res.status(400).send({ status: false, msg: "email is mandatory" });
    if (!email(data.email))
      return res.status(400).send({ status: false, msg: "email is not valid" });

    if (!data.password)
      return res.status(400).send({ status: false, msg: "password is mandatory" });
    if (!validator.isStrongPassword(data.password))
      return res.status(400).send({ status: false, msg: "password should contain capital letter,number,symbol" });

    let UniquePhone = await UserModel.findOne({ phone: data.phone });
    if (UniquePhone)
      return res.status(400).send({ status: false, msg: " Phone must be Unique" });

    let UniqueEmail = await UserModel.findOne({ email: data.email });
    if (UniqueEmail)
      return res.status(400).send({ status: false, msg: "Email  must be Unique" });



    let createUser = await UserModel.create(data);
    return res.status(201).send({ status: true, msg: "User created Successfully", data: createUser });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    let data = req.body;
    if (!body(data))
    return res.status(400).send({status: false, msg:"Input is Missing"});

    if (!data.email)
    return res.status(400).send({ status: false, msg: "email is mandatory" });
    if (!email(data.email))
     return res.status(400).send({ status: false, msg: "email is not valid" });

    if (!data.password)
      return res.status(400).send({ status: false, msg: "password is mandatory" });

    let User = await UserModel.findOne({
      email: data.email,
      password: data.password,
    });
    if (!User)
      return res.status(404).send({ status: false, msg: "No user Found" });
    let token = jwt.sign({ UserId: User._id.toString(), iat: Math.floor(Date.now() / 1000) - 30, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, "group26project-3");
    return res.send({ status: true, msg: "success", data: token });

  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message })
  }


}
module.exports.CreateUser = CreateUser;
module.exports.LoginUser = LoginUser
