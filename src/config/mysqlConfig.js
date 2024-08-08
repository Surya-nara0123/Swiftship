var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "userDetails"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function queryCommands(cmd){
    con.query(cmd, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

module.exports = con, queryCommands;