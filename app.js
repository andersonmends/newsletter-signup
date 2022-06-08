const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");


})

app.post("/failure", function (req, res) {

})

app.post("/", function (req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    // res.send("dfsdfsgsfdg")

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    //testeando
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/b58b6a1733";

    const options = {
        method: "POST",
        auth: "anderson:5994358a5b8f542dba898b5b5c614f79-us9"
    };

    const reque = https.request(url, options, function (response) {


        console.log(response.statusCode)
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");



        } else {
            res.sendFile(__dirname + "/failure.html");

        }
        response.on("data", function (data) {
            ;
            // console.log(JSON.parse(data));
        })
    })

    reque.write(jsonData);
    console.log("1");
    reque.end();

    console.log("2");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server startuo on port 3000");
})

// 5994358a5b8f542dba898b5b5c614f79-us9
// b58b6a1733
// https://us9.api.mailchimp.com/3.0/lists/b58b6a1733