
require('dotenv').config(); //con esto se importa para cubrir los fatos sensibles 
const mongoose = require("mongoose");

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

//crear un modelo de datos, representara la foroma de un documento en la base de datos, el nombre que se le da al moongose y dentro tendra documetnos con la forma que determinamos y esto esta dentro de un .json
//los documentos en moongo son datos tipos .json y tenemos que decirle que atributos y formas tendra este .json

const Koder = mongoose.model("koder", new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    lastName:{
        type: String,
        required: false,
        maxLength: 100,
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    birthdate:{
        type: Date,
        required: false,
    },
    generation:{
        type: Number,
        required: true,
        min:1,
        max: 100,
    },
})
);

//protocolo:usuario:pass@host/dbName   => asi va la url y estos son los elementos
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("conexion exitosa");
        //para crear algo, se manda mandar al modelo
        Koder.create({
            firstName: "Ana",
            lastName: "Laguna",
            email: "ana.laguna@kodemia.mx",
            birthdate: new Date("1991-02-14"),
            generation: 33,
        })
            .then(() => console.log('koder creado'))
            .catch((error) => console.error('error al crear koder', error));
        })
    .catch((error) => {
        console.error("error al conectar con la base de datos", error);
    });




/*promesas
 las promesas por defecto nacen o se crean en estado "pendiente" => que aun no se cumple, "resuelta" => que ya se realizo y "rechazada" => se rechasza la promesa
 el metodoo then es cuando pasa de pendiente a resuelta y el metodo catch pasa cunado pasa de pendiente  a rechazada*/

