const express = require ('express');
const cursos = require('./data/cursos.json');
const _= require("lodash");
const app = express();//llamo un app  con una funcion para levantar erl server
const PORT=3001

//para que reciva jsons, es para setear por defecto la informacion que se envia en el body
app.use(express.json());

//me van hacer solicitudes de tipo get
// una funcion que recive dos parametros algo que se envia y algo que vuelve
app.get("/cursos", (req,res)=>{
    //responde cuando todo ande bien, devuelve un json como respuesta
    res.status(201).json(cursos);
});

//req viene la informacion de la solicitud
app.get('/cursos/:cursoId', (req, res)=>{
    //quiero recuperar el id
    const idCurso = req.params.cursoId;
    //en el array de cursos busco el curso con ese id
    const curso = cursos.find(c=>c.id===idCurso);
    if(curso)
        res.status(200).json(curso);
    else
    //si no lo encuentra
        res.status(404).json({
    message:`El curso ${idCurso} no se encuentra.`
    });
});

app.post("/cursos", (req, res) => {
    const datosCursos = req.body; 
    //a la informacion le tengo que agregar un identificador
    //usamos libreria lodash, trabaja con arrays
    //necesito hacer una transformacion del curso
    const ids = cursos.map((c)=>c.id);
    const idMax = _.max(ids) + 1;
    const cursoNuevo = {id:idMax,...datosCursos, habilitado: true};
    cursos.push(cursoNuevo);
    //el json que devuelvo es el curso que cree
    res.status(201).json(cursoNuevo);
});
//borrar un curso determinado
app.delete("/cursos/:cursoId", (req, res) => {
    const idCurso = req.params.cursoId;
    const cursoIdx= cursos.findIndex((c)=> c.id==idCurso);
    if (cursoIdx >= 0){

        cursos.splice(cursoIdx,1);
        res.status(200).json({message:`El curso se borro correctamente`});

        }else
    //si no lo encuentra
        res.status(404).json({message:`El curso ${idCurso} no se encuentra.`
    });
})

app.listen(PORT, ()=>{// CUANDO LA APP ARANCA EJECUTA UNA CALBACK PARA ESCUCHAR EL PUERTO
    console.log(`La app inicio en el puerto ${PORT}`);
}); //metodo para que escuche el servidor