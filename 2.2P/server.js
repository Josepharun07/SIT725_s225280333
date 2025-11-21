var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/addTwoNumbers", (req, res) => {

    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    const result = n1 + n2;


    res.json({ statusCode: 200, data: result, message: "Success" });
});

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port);
});