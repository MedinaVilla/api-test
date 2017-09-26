var express        = require('express');
var bodyParser     = require('body-parser');
var app            = express();
var mysql = require('mysql');

app.use(bodyParser.json());
//Conexión base de datos
var con = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "n0m3l0",
 database: "MascotaServlet"
});
con.connect(function(err){
  if(err){
    console.log("Error conexion base");
    return;
  }
  console.log('Conexion establecida :)');
});
  //en vez de folio sería la ID pero para esta base, esta es la PK :V

//Router que permite consultar registros de la bd
app.get('/api/mascotas/findall',function(request, response){
con.query('select *from Mascotas',function(error,rows){
  response.end(JSON.stringify(rows));
});
});
//Router que permite obtener un registro a partir de una id
app.get('/api/mascotas/find/:folio',function(request,response){
con.query('select* from Mascotas where folio = ?',[request.params.folio],function(error,rows){
  response.end(JSON.stringify(rows));
});
});
//Router que permite eliminar un registro a partir de la id
app.delete('/api/mascotas/delete/:folio',function(request,response){
con.query('delete from Mascotas where folio = ?',[request.params.folio],function(error,rows){
  response.end(JSON.stringify(rows));
});
});
//Router que permite realizar nuevos registros a la bd
app.post('/api/mascotas',function(request,response){
con.query('insert into Mascotas(nombre, edad)values(?,?)',[request.body.name, request.body.edad],function(error,rows){
  response.end(JSON.stringify(rows));
});
});
//Router que permite editar un registro de la bd
app.put('/api/mascotas',function(request,response){
con.query('update Mascotas set nombre=?, edad=?',[request.body.nombre, request.body.edad],function(error,rows){
  response.end(JSON.stringify(rows));
});
});

app.listen(8082);

/*
app.delete('/api/producto/delete/:id', function(request, response){
con.query('delete from producto where id = ?'[])

})
*/
