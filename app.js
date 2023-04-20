const express=require("express");
const bodyParser =require ("body-parser");
const request =require("request");
const https =require("https");


const app= express();
//pour que le serveur puisse prendre en compte les fichier statique comme le css et bootstrapp on le smet dans un fichier appele public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName =req.body.lName;
    const email =req.body.email;
    
    //afficher dans le terminal
   // console.log(firstName,lastName,email);


   const data ={
    members: [
       {
        email_address: email ,
        status: "subscribed" ,
        merge_fields:{
            FNAME: firstName,
            LNAME: lastName
        }
       }
    ]
   } ;

   const jsonData =JSON.stringify(data);

   const url="https://us21.api.mailchimp.com/3.0/lists/086832be20";
   const options ={
    method: "POST",
    auth: "yannick:3c710c3cd387a62347e52305262a341c-us21"
   }
   const request =https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }



    response.on("data'",function(data){
        console.log(JSON.parse(data));
    })

   })
   request.write(jsonData);
   request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/")
})



app.listen(process.env.PORT || 3000,function(){
    console.log("your server running on port 3000");
})


// API key
// 3c710c3cd387a62347e52305262a341c-us21

//liste id
// 086832be20