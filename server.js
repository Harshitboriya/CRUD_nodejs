const express =require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT =5000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/emp1')
.then(()=>{
    console.log("db connection")
})
.catch((error)=>{
    console.log(error);
});



const userSchema = new  mongoose.Schema(
    {
        emial:{
            type : String,

        },
        name:{
            type:String,
            required:true,
        }

    });

    
    const User = mongoose.model("User",userSchema)
    //post request for adding data to th
    app.get("/",(req,res)=>{
        try{
        res.send("from get router");
    
         } catch(error){
        console.log(`Error ${error}`);
    }
    });

    app.post("/createuser",async (req,res)=>{
        try{
            const bodyData=req.body;
            const user = new User(bodyData);
        const UserData = await user.save();
        res.send(UserData);
    } catch(error)
    {res.send(error);
    }
});

app.get("/readall",async(req,res)=>{
    try{
        const userData = await User.find({});
        res.send(userData);
    }
    catch{res.send(error);}

});

app.get("/read/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const user =await User.findById({_id:id});
        res.send(user);
        }
        catch{res.send(error);}

});

app.put("/updata/:id",async(req,res)=>{
    try{ 
        const id =req.params.id;
        const user = await User.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.send(user)
    }
    catch{res.send(error);}

});

app.delete("/delete/:id",async(req,res)=>{
    try{ 
        const id =req.params.id;
        const user = await User.findByIdAndDelete({_id:id})
        res.send(user)
    }
    catch{res.send(error);}
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
