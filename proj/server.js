const express = require('express');
const bodyParser = require('body-parser');
let connection;
var oracledb = require('oracledb');

const app = express();
const port = process.env.PORT || 5000;

async function spPerMoWithGas(req, res) {
  try{
     connection = await oracledb.getConnection({
      user          : "anna.hubbard",
      password      : "aUr1H5WZq0j1kAv31MvrFcdx",
      connectString : "oracle.cise.ufl.edu/orcl"
     });
     
     console.log("Successfully connected to Oracle!")
  } catch(err) {
      console.log("Error: ", err);
    } 
    
    result = await connection.execute(`select price, avg(high_), extract(month from gas.date_), extract(year from gas.date_), (avg(high_) / price) Yep
    from "ANNA.HUBBARD".gas, "ANNA.HUBBARD".spsto
    where extract(month from gas.date_) = extract(month from spsto.date_)
    and extract(year from gas.date_) = extract(year from spsto.date_)
    group by extract(year from gas.date_), extract(month from gas.date_), price
    order by extract(month from gas.date_) ASC, extract(year from gas.date_) ASC`);
    return res.send(result.rows);

    await connection.close();
  }

  app.get('/stockWithGas', function (req, res) {
    spPerMoWithGas(req, res);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  spPerMoWithGas(req, res);
});

async function run() {
  let connection;

  try {

    let sql, binds, options, result;

    connection = await oracledb.getConnection(dbConfig);

    if (connection) {
      try {
      // Always close connections
      await connection.close();
      console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    } 

    sql = `select price, avg(high_), extract(month from gas.date_), extract(year from gas.date_), (avg(high_) / price) Yep
    from "ANNA.HUBBARD".gas, "ANNA.HUBBARD".spsto
    where extract(month from gas.date_) = extract(month from spsto.date_)
    and extract(year from gas.date_) = extract(year from spsto.date_)
    group by extract(year from gas.date_), extract(month from gas.date_), price
    order by extract(month from gas.date_) ASC, extract(year from gas.date_) ASC`;

    binds = {};

    
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      
    };

    result = await connection.execute(sql, binds, options);

    console.log("Metadata: ");
    console.dir(result.metaData, { depth: null });
    console.log("Query results: ");
    console.dir(result.rows, { depth: null });

  } catch (err) {
    console.error(err);
  } 
}

run();

app.listen(port, () => console.log(`Listening on port ${port}`));
