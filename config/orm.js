var connection = require("../config/connection.js");

// question marks array
function printQuestionMarks(num){
    var arr = [];

    for(var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

// Convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Bob Barker -> 'Bob Barker')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Bob Barker'} => ["name='Bob Barker'"]
        // e.g. {old: true} => ["old=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

//   create object for sql functions - use to get and store data in your database
var orm = { 
        all: function(tableInput, cb){
            var query = "SELECT * FROM + tableInput + ";"";
            connection.query(query, function(err, res){
                if(err) throw err;
                cb(res)
            })
        },
        insertOne: function(table,cols,vals,cb){
            var queryString = "INSERT INTO " + table;

            queryString += "(";
            queryString += cols.toString;
            queryString += ")";
            queryString += "VALUES (";
            queryString += printQuestionMarks(vals.length);
            queryString += ")";

            console.log(queryString)

            connection.query(queryString, vals, function(err, res){
                if(err) throw err;
                cb(res)
            })
        },
        updateOne: function(table, objColsVals, condition, cb){
            var queryString = "UPDATE " + table;
            queryString += "SET";
            queryString += objToSql(objColsVals);
            queryString += "WHERE";
            queryString += condition;

            console.log(queryString);
            connection.query(queryString, function(err, res){
                if (err) throw err;
                cb(res);
            })
        } 
};

module.exports = orm;