var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const addNumbers = (num1, num2) => {
    return num1 + num2;
}


app.get("/addTwoNumbers", (req, res) => {
    
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({
            statusCode: 400,
            message: "Invalid Input: Parameters must be numbers",
            data: null
        });
    }

    
    const result = addNumbers(n1, n2);

    
    res.json({ 
        statusCode: 200, 
        data: result, 
        message: "Success" 
    });
});

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port);
});


module.exports = app;