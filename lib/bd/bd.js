
const config = require("./../config.js");
const {Pool, Client} = require('pg');
const pool = new Pool(config.pg);

module.exports = class postgress_bd {

    /**** Select al ususario por su IDFacebook, para obtener session de watson*/
    static select_user(parameters, callback) {
        pool.connect((err, client, done) => {
            client.query('select * from usuarios where id_facebook = $1', parameters, (err, res) => {
                done()
                if (err) {
                    console.log(err);
                    callback(error, null);
                } else {
                	callback(null,res.rows);
                }
            });
        });
    }

    /***** Insertar usuario, si aun no tiene una session de watson*/
    static insert_user(parameters, callback) {
        pool.connect((err, client, done) => {
            client.query('insert into usuarios(watson,id_facebook) values ($1,$2)', parameters, (err, res) => {
                done();
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    callback(null);
                }
            });
        });
    }

    /***** Actualizar Watson Context */
    static update_watson_context(parameters, callback) {
        pool.connect((err, client, done) => {
            client.query('update usuarios set watson = $1 where id_facebook = $2', parameters, (err, res) => {
                done();
                if (err) {
                	console.log(err);
                    callback(err);
                } else {
                    callback(null);
                }
            });
        });
    }

    /**** Select a la lista negra de billetes para verificar si es reportado o no*/
    static select_black_list(parameters, callback) {
        pool.connect((err, client, done) => {
            client.query('select * from lista_negra_billetes where cod_billete = $1', parameters, (err, res) => {
                done()
                if (err) {
                    console.log(err);
                    callback(error, null);
                } else {
                    callback(null,res.rows);
                }
            });
        });
    }

    /***** Insertar un nuevo codigo de billete cuando este es reportado*/
    static insert_backlist(parameters, callback) {
        pool.connect((err, client, done) => {
            client.query('insert into lista_negra_billetes(cod_billete) values ($1)', parameters, (err, res) => {
                done();
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    callback(null);
                }
            });
        });
    }

}

