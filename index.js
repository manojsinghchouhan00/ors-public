const express = require('express')
 const connectDb = require("./db/config")
const cors = require('cors');
const dotenv = require('dotenv');

// connectDb()
dotenv.config();
const PORT = process.env.PORT || 5000;
const dev_mode = process.env.DEV_MODE;

const User = require('./model/user');
const College = require('./model/college');
const Marksheet = require('./model/marksheet');
const Student = require('./model/student');
const Role = require('./model/role');

// app.use(cors(express.json()));
const app = express()
app.use(express.json())
app.use(cors())

// ------------Users collectiion route------------------------
app.post("/login", async (req, resp) => {
    if (req.body.loginId && req.body.password) {
        try {
            const data = await User.findOne(req.body).select("-password")
            if (data === null) {
                resp.send({ message: "No result found" })
            } else {
                console.log(data)
                resp.send(data)
            }
        } catch (err) {
            console.log("Error in login Api", err)
        }
    } else if (req.body.loginId === "undefined") {
        resp.send({ message: "Enter Email id" })
    } else if (req.body.password === "undefined") {
        resp.send({ message: "Enter Password" })
    } else {
        resp.send({ message: "Enter LoginId And Password" })
    }
})
// ---------------------- user list-------------------------
app.get("/user", async (req, resp) => {
    try {
        let data = await User.find();
        resp.send(data)
    } catch (err) {
        console.log("Error on server", err.message)
    }
})
// --------------------Create user----------------------------------
app.post("/user", async (req, resp) => {
    try {
        let data = new User(req.body);
        let result = await data.save();
        resp.send(result)
    } catch (err) {
        if(err?.errors?.roleId?.message){
            resp.send(err?.errors?.roleId?.message)
        }else{
            resp.send({ message: "Email id already exist" })
        }
        // console.log("Register user :-", err)
    }
})
// --------------------Delete user----------------------------------
app.delete("/user/:id", async (req, resp) => {
    try {
        // console.log("req in user", req.params)
        let data = await User.deleteOne({ _id: req.params.id });
        resp.send(data);
    } catch (err) {
        console.log("Error in delete user", err)
    }
})
// --------------------Update user----------------------------------
app.put("/user/:id", async (req, resp) => {
    try {
        // console.log("update id",req.params)
        let data = await User.updateOne({ _id: req.params.id }, { $set: req.body })
        resp.send(data)
    } catch (err) {
        console.log("Error in user update", err)
        resp.send({ message: "user id exist" })
    }
})
app.get("/user/:id", async (req,resp)=>{
    try{
        let data = await User.findOne({_id : req.params.id});
    resp.send(data)
    }catch(err){
        resp.send({message : "Send correct id"})
    }
    
})
// --------------------Search user----------------------------------
app.get("/user/search/:key", async (req, resp) => {
    const caseInsensitiveKey = new RegExp(req.params.key, "i");
    let data = await User.find({
        $or: [
            { firstName: { $regex: caseInsensitiveKey } },
            { lastName: { $regex: caseInsensitiveKey } },
            { loginId: { $regex: caseInsensitiveKey } }
        ]
    })
    resp.send(data)
})
// ------------Users collectiion End route------------------------
// ------------College collectiion Start route------------------------
app.post('/college', async (req, resp) => {
    try {
        let data = new College(req.body);
        data = await data.save();
        resp.send(data)
    } catch (error) {
        // console.log("College Catch block erroe", error.errors.mobileNo.message)
        if (error?.errors?.mobileNo?.message) {
            resp.send({ message: error.errors.mobileNo.message })
        } else {
            // resp.send(error.message)
            resp.send({ message: "College already exist" })
        }
    }
})
app.put("/college/:id", async (req, resp) => {
    console.log("College put api")
    try {
        let data = await College.updateOne({ _id: req.params.id }, { $set: req.body })
        resp.send(data)
    } catch (error) {
        console.log("College put api catch block")
        resp.send({ message: 'College already exiest' })
    }
})

app.delete("/college/:id", async (req, resp) => {
    try {
        let data = await College.deleteOne({ _id: req.params.id })
        resp.send(data)
    } catch (error) {
        resp.send({ message: "Id is not there / already deleted" });
    }
})
app.get("/college", async (req, resp) => {
    try {
        let data = await College.find();
        resp.send(data)
    } catch (error) {
        console.log(error)
        resp.send({ message: "Look the console" })
    }
})
app.get("/college/:id", async (req, resp) => {
    try {
        let data = await College.findOne({ _id: req.params.id })
        resp.send(data)
    } catch (error) {
        console.log("college serach one")
        resp.send({ message: "Put the correct id" })
    }
})
app.get("/college/search/:key", async (req, resp) => {
    const caseInsensitiveKey = new RegExp(req.params.key, "i");
    let data = await College.find({
        $or: [
            { collegeName: { $regex: caseInsensitiveKey } },
            { address: { $regex: caseInsensitiveKey } },
            { city: { $regex: caseInsensitiveKey } },
            { state: { $regex: caseInsensitiveKey } }
        ]
    })
    resp.send(data)
})
// ------------College collectiion Start route------------------------
// ------------Marksheet collectiion Start route------------------------
app.post("/marksheet", async (req, resp) => {
    try {
        let data = new Marksheet(req.body);
        data = await data.save();
        resp.send(data);
    } catch (error) {
        console.log(error)
        resp.send({ message: "StudentId / roll number alredy exist" })
    }
})
app.get("/marksheet", async (req, resp) => {
    let data = await Marksheet.find();
    resp.send(data);
})
app.get("/marksheet/:id", async (req, resp) => {
    try {
        let data = await Marksheet.findOne({ _id: req.params.id });
        resp.send(data);
    } catch (error) {
        console.log(error)
        resp.send({ message: "Something is missing here in id" });
    }
})
app.get("/marksheet/search/:key", async (req, resp) => {
    try {
        const caseInsensitiveKey = new RegExp(req.params.key);
        let data = await Marksheet.find({
            $or: [
                { name: { $regex: caseInsensitiveKey } },
                { studentId: { $regex: caseInsensitiveKey } },
                { rollNo: { $regex: caseInsensitiveKey } }
            ]
        });
        resp.send(data);
    } catch (error) {
        console.log(error)
    }

})
app.delete("/marksheet/:id", async (req, resp) => {
    try {
        let data = await Marksheet.deleteOne({ _id: req.params.id });
        if (data.deletedCount == 0) {
            resp.send({ message: "Data already deleted" })
        } else {
            resp.send(data)
        }

    } catch (error) {
        console.log(error);
        resp.send({ message: "Something is mssing here/ id issue." })

    }
})
app.put("/marksheet/:id", async (req, resp) => {
    try {
        let data = await Marksheet.updateOne({ _id: req.params.id }, { $set: req.body })
        resp.send(data)
    } catch (error) {
        console.log(error)
    }
})
// ------------Marksheet collectiion End route------------------------
// ------------Students collectiion Start route------------------------
app.post("/student", async (req, resp) => {
    try {
        let data = new Student(req.body);
        data = await data.save()
        resp.send(data)
    } catch (error) {
        if (error?.keyPattern?.emailId === 1) {
            resp.send({ message: "Email id already exist" })
        } else if (error?.keyPattern?.collegeId === 1) {
            resp.send({ message: "collegeId already exist" })
        } else if (error?.errors?.mobileNo) {
            resp.send(error?.errors?.mobileNo?.message)
        } else {
            console.log(error)
            resp.send(error)
        }
    }
})
app.get("/student", async (req, resp) => {
    let data = await Student.find()
    try {
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
app.get("/student/:id", async (req, resp) => {
    try {
        let data = await Student.findOne({ _id: req.params.id });
        resp.send(data)
    } catch (error) {
        if (error?.path === "_id") {
            resp.send({ message: "Wrong id" })
        } else {
            resp.send(error)
        }
    }
})
app.get("/student/search/:key", async (req, resp) => {
    try {
        const caseInsensitiveKey = new RegExp(req.params.key)
        let data = await Student.find({
            $or: [
                { firstName: { $regex: caseInsensitiveKey } },
                { lastName: { $regex: caseInsensitiveKey } },
                { emailId: { $regex: caseInsensitiveKey } },
                { collegeId: { $regex: caseInsensitiveKey } },
            ]
        })
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
app.put("/student/:id", async (req, resp) => {
    try {
        let data = await Student.updateOne({ _id: req.params.id }, { $set: req.body });
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
app.delete("/student/:id", async (req, resp) => {
    try {
        let data = await Student.deleteOne({ _id: req.params.id });
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
// ------------Student collectiion End route------------------------
// ------------Role collectiion start route------------------------
app.post('/role', async (req, resp) => {
    try {
        let data = new Role(req.body);
        data = await data.save();
        resp.send(data)
    } catch (error) {
        if (error.keyPattern.name === 1) {
            resp.send({ message: "Role already exist" })
        } else {
            resp.send(error)
        }
    }
})
app.get('/role', async (req, resp) => {
    try {
        let data = await Role.find()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
app.get('/role/:id', async (req, resp) => {
    try {
        let data = await Role.findOne({ _id: req.params.id });
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
});
app.get('/role/search/:key', async (req, resp) => {
    const caseInsensitiveKey = new RegExp(req.params.key)
    try {
        let data = await Role.find({
            $or: [
                { name: { $regex: caseInsensitiveKey } },
                { discription: { $regex: caseInsensitiveKey } }
            ]
        });
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
app.delete('/role/:id', async (req, resp) => {
    try {
        let data = await Role.find({ _id: req.params.id })
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
app.put('/role/:id', async (req, resp) => {
    try {
        let data = await Role.updateOne({ _id: req.params.id }, { $set: req.body })
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})
// ------------Role collectiion End route------------------------


app.listen(PORT, () => {
    console.log(` Server run ${dev_mode} with port http://localhost:${PORT}`)
})
