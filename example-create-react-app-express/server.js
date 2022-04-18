
process.env.ORA_SDTZ = 'UTC';
const fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let libPath;
if (process.platform === 'win32') {           // Windows
  libPath = 'C:\\oracle\\instantclient_19_12';
} else if (process.platform === 'darwin') {   // macOS
  libPath = process.env.HOME + '/Downloads/instantclient_19_8';
}
if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}

async function stoAvg(req, res){
  connection = await oracledb.getConnection(dbConfig);
  result = await connection.execute(`select count(high_), Extract(month from spsto.date_),symbol, Extract(year from spsto.date_)
  from "ANNA.HUBBARD".spsto
  where Extract(YEAR from "ANNA.HUBBARD".spsto.date_) > 2009
  and "ANNA.HUBBARD".spsto.symbol = 'AAPL'
  group by Extract(month from spsto.date_),Extract(year from spsto.date_), symbol
  order by Extract(year from spsto.date_) ASC`);
  return res.send(result.rows);
}

async function spPerMoWithGas(req, res) {
    connection = await oracledb.getConnection(dbConfig);
    /*
    if (connection) {
      try {
      // Always close connections
      await connection.close();
      console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    } 
    */
    
    result = await connection.execute(`select price, avg(curr_price)
    from "ANNA.HUBBARD".gas, "ANNA.HUBBARD".spsto
    where extract(month from gas.date_) = extract(month from spsto.date_)
    and extract(year from gas.date_) = extract(year from spsto.date_)
    and curr_price IS NOT NULL
    group by extract(year from gas.date_), extract(month from gas.date_), price
    order by extract(month from gas.date_) ASC, extract(year from gas.date_) ASC`);
    return res.send(result.rows);
}

app.get('/stockWithGas', function (req, res) {
  spPerMoWithGas(req, res);
})



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/stockAvg', (req, res) => {
  stoAvg(req, res);
});

app.post('/api/world', (req, res) => {
    spPerMoWithGas(req, res);
  //console.log(req.body);
  //res.send(
  //  `I received your POST request. This is what you sent me: ${req.body.post}`,
  //);
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
  
      // For a complete list of options see the documentation.
      options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
        // extendedMetaData: true,               // get extra metadata
        // prefetchRows:     100,                // internal buffer allocation size for tuning
        // fetchArraySize:   100                 // internal buffer allocation size for tuning
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