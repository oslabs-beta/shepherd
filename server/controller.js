const controller = {};
const { Pool } = require('pg');
const { DataFrame } = require('dataframe-js');


controller.getTableNames = async (req, res, next) => {
    let PSQL_URI = req.body.link;
    let db = new Pool({ connectionString: PSQL_URI});
    const GET_TABLE_QUERY = 'SELECT conrelid::regclass AS table_name\n'+
                            'FROM pg_constraint\n'+
                            'WHERE  contype = \'p\' AND connamespace = \'public\'::regnamespace';
    try{
        const results = await db.query(GET_TABLE_QUERY);
        res.locals.tableNames = [];
        for (let i = 0; i < results.rows.length; i++){
            res.locals.tableNames.push(results.rows[i]['table_name'])
        }
        next();
    }
    catch (error) {
        next({
            log: "Error in Get Table Names",
            status: 400,
            message: { err: "Error in Get Table Names" },
          });
    }
}


controller.getTableData = async (req, res, next) => {
    let PSQL_URI = req.body.link;
    let db = new Pool({ connectionString: PSQL_URI});

    res.locals.tableData = []
    let result;
    try{
        for (let i = 0; i < res.locals.tableNames.length; i++){
            result = await db.query('SELECT * FROM '+ res.locals.tableNames[i]);
            res.locals.tableData.push(result.rows);
        }
        res.locals.returnData = {'tableNames':res.locals.tableNames, 'tableData':res.locals.tableData}
        next();
    }
    catch (error) {
        next({
            log: "Error in Get Table Data",
            status: 400,
            message: { err: "Error in Get Table Data" },
          });
    }
}

controller.getJoinTable = async (req, res, next) => {

    const tables = req.body.query.tables;
    const tableOne = req.body.query.tables[0];
    const tableTwo = req.body.query.tables[1];
    const joinHow = req.body.query.how;
    const on = req.body.query.on;
    const columns = req.body.query.columns;
    const tableNames = req.body.query.tableNames;
    const columnNames = [];
    const qureynames = [];
    console.log(on)
    try{
        for (let i = 0; i < tableNames.length; i++){
            columnNames.push([])
            for (let name in tables[i][0]){
                columnNames[i].push(`${tableNames[i]}.${name}`)
                qureynames.push(`${tableNames[i]}.${name} as \"${tableNames[i]}.${name}\"`)
            }

        }

        dfOne = new DataFrame(tableOne);
        dfOne = dfOne.renameAll(columnNames[0]);

        dfTwo = new DataFrame(tableTwo);
        dfTwo = dfTwo.renameAll(columnNames[1]);
        
        for (let i = 0; i < columnNames.length; i++){
            columnNames[i] = [...columnNames[i], 'merge'];
        }
        console.log("on ", on)
        dfOne = dfOne.restructure(columnNames[0])
        dfTwo = dfTwo.restructure(columnNames[1])
        dfOne = dfOne.map(row => row.set('merge', row.get(`${on[0]}`))).cast('merge', String);
        // console.log('df1 ',dfOne.head(10).toCollection());//[0]['merge']
        dfTwo = dfTwo.map(row => row.set('merge', row.get(`${on[1]}`))).cast('merge', String);
        // console.log('df2 ',dfTwo.head(10).toCollection())
        dfJoin = dfOne.join(dfTwo, 'merge', joinHow.toLowerCase());
        dfJoin = dfJoin.drop('merge')
        console.log('join ', dfJoin.head(10).toCollection());
        if (columns[0]) dfJoin = dfJoin.restructure(columns);
        res.locals.returnJoinData = dfJoin.toCollection();

        next();
    }
    catch (error) {
        next({
            log: "Error in TEST Table Data",
            status: 400,
            message: { err: "Error in TEST Table Data" },
          });
    }
}

//Get table names by URL

module.exports = controller;
