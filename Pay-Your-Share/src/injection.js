var db;

function getdb(){
    return db;
}

function setdb(dbo){
    db = dbo
}

module.exports = {getdb, setdb}