 // api key
// 936a0ab93b0399a31fd86463998c3778-us4

// Audience id
// 1fec899251


const express= require("express");
const app =express();
const bodyParser = require("body-parser");

const request=require("request");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response)
{
  response.sendFile(__dirname+ "/index.html");
})





app.post("/",function(req,res)
{

  var myStat;
  console.log(req.body);
  var firstName = req.body.first;
  var lastName = req.body.last;
  var eMail = req.body.email;
  var data ={
    members:[
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields:
        {
          FNAME:firstName,
          LNAME:lastName,
        },
      }
    ]
  };
  var jsonData=JSON.stringify(data);

  var option={
    url :"https://us4.api.mailchimp.com/3.0/lists/1fec899251",
    method :"POST",
    headers:
    {
      "Authorization": "kgargdun 936a0ab93b0399a31fd86463998c3778-us4 "
    },
    body: jsonData,

  };

  request(option,function(error,response,body)
  {
    var myData = JSON.parse(body);
    if(error)
    {
      res.send("Error");
      console.log(error);
    }
    else
    {
      myStat = response.statusCode;
      if(myStat==200)
      {
        res.send("Success");
      }
      else
      {
        res.send("Error");
      }

      console.log(response.statusCode);
    }
  });






})


// curl --request POST \
// --url 'https://usX.api.mailchimp.com/3.0/lists' \
// --user 'anystring:apikey' \
// --header 'content-type: application/json' \
// --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \
// --include








app.listen(process.env.PORT || 3000,function()
{
  console.log("Listening at port 3000");
});
