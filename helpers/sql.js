const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

// This takes in a dataToUpdate object and a jsToSql object. The dataToUpdate object is the data that needs 
// to be updated in the database. The jsToSql object is a mapping of JavaScript-style keys to 
// the corresponding column names in the SQL database. This function returns an object 
// with a setCols key and a values key. The setCols key is a string that is used in the SQL query to update the database.
// The values key is an array of the values that need to be updated in the database. This function is used 
// in the update method in the base model class.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
