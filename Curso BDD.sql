#7 OPERADORES DE COMPARACION
create database if not exists operadores_comparacion;

create table if not exists personas 
(
id int not null primary key auto_increment,
nombre varchar(45) not null,
apellidos varchar(45) not null,
email varchar(45) not null,
pais varchar(45) not null,
edad int not null
);

insert into personas values (0, 'Chiara', 'Carfagno', 'xx@xx.com', 'Argentina', 22);
insert into personas values (0, 'ismael', 'franco', 'xx1@xx.com', 'Argentina', 24);
insert into personas values (0, 'tomas', 'bertea', 'xx@xx.com', 'Argentina', 98);
insert into personas values (0, 'lorena', 'Carfagno', 'xx@xx.com', 'Argentina', 45);
INSERT INTO personas(nombre, apellidos, email, pais, edad)VALUES
('Alcia', 'Abrego Fierro', 'Alciaabregofierro@gmail.com', 'Peru', 34),
('Loana', 'Sanches Altamirano', 'LoanaSanchesAltamirano@yahoo.com', 'Argentina', 24),
('Mateos', 'Jasso Gómez', 'MateosJassoGomez@altavista.com', 'Ecuador', 37),
('Morgan', 'Mora Aguilar', 'MorganMoraAguilar@hotmail.com', 'Colombia', 41),
('Alulay', 'Lozano Cavazos', 'AlulayLozanoCavazos@gustr.com', 'Paraguay', 44),
('Amalio', 'Roldán Guerrero', 'AmalioRoldanGuerrero@yahoo.com', 'Ecuador', 37),
('Carola', 'Preciado Guevara', 'CarolaPreciadoGuevara@gmail.com', 'Uruguay', 53),
('Mauli', 'Nazario Candelaria', 'MauliNazarioCandelaria@gustr.com', 'Brasil', 37);

#ejercicio 1: Seleccionar las personas que son de argentina
select * from personas where pais = 'Argentina';
#ejercicio 2: seleccionar a las personas  q no son de argentina hay 2 formas
select * from personas where pais != 'argentina';
select * from personas where pais <> 'brasil';
#BETWEEN Y NOT BETWEEN
select * from personas where edad between 30 and 50;  
select * from personas where edad not between 30 and 50;

create table if not exists pagos (
id int not null primary key auto_increment,
nombre varchar(100) not null,
valor int,
estado varchar (100)
);

insert into pagos (nombre, valor, estado) values
('jose montoya', 35000, 'Pagado'),
('alejandro lopez', 47000, null),
('juan perez', 145000, 'Pagado'),
('Angelica montes', 8300, NULL);
select * from pagos where estado is not null;
select * from pagos where estado is  null;


/*10 FUNCIONES DE AGREGADO*/
#contar
select count(*) from personas;
select count(idempleados) from personas;
#group by
select pais, count(*) from personas group by pais;
select pais, count(id) from personas group by pais;
#promedio
select pais, avg(edad) from personas group by pais; # promedio de cada pais
select  avg(edad) from personas; # promedio total
select  avg(edad) from personas where pais = 'argentina' ; # promedio de argentina nomas
#having se usa cuando hay un group by (son para las funciones de agregado
select pais, sum(edad) as total from personas group by pais having total >= 120;


/*11 FUNCIONES DE STRING*/
select distinct concat('su nombre es: ', nombre, ' y su mail es: ', email) from personas where pais = 'argentina';


/*12 FUNCIONES DE FECHAS Y TIEMPO*/
#agregar intervalo de fecha
select adddate('2024-11-17', interval 30 day);
#diferencia entre fechas
select datediff('2024-11-17', '2024-12-31');
#agregar tiempo
select addtime('03:00:00', '00:45:00');


/*13 RELACIONANDO TABLAS*/
#no fue muy importante


/*14  COMBINANDO CONSULTAS (JOIN)*/
CREATE DATABASE IF NOT EXISTS consultas_combinadas;
USE consultas_combinadas;
CREATE TABLE clientes(
	id_cliente INT PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    fecha_creacion DATE NOT NULL
);

CREATE TABLE detalle_cliente(
	id_detalle INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    #Llave foránea (foreign key) - este campo que sigue se relaciona con la llave primaria de la 
    #tabla clientes de uno a uno
    #Esta llave foranea está de manera implicita
    cliente_id INT,
    #FOREIGN KEY(cliente_id) REFERENCES clientes(id_cliente),
    #CONSTRAINT FK_DetalleCliente FOREIGN KEY(cliente_id) REFERENCES clientes(id_cliente),
    #CONSTRAINT FK_DetalleCliente FOREIGN KEY(cliente_id) REFERENCES clientes(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_DetalleCliente FOREIGN KEY(cliente_id) REFERENCES clientes(id_cliente) ON DELETE SET NULL ON UPDATE SET NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_creacion DATE NOT NULL
);

CREATE TABLE libros(
	id_libro INT PRIMARY KEY NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    paginas INT NOT NULL,
    idioma VARCHAR(100) NOT NULL,
    fecha_lanzamiento DATE NOT NULL,
    fecha_creacion DATE NOT NULL
);

CREATE TABLE resenias(
	id_resenia INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    calificacion INT NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    #La siguiente es la llave foranea
    libro_id INT,
    #No estamos indicando el comportamiento para UPDATE y DELETE, así que será el por defecto: NO ACTION
    CONSTRAINT FK_ReseniaLibro FOREIGN KEY(libro_id) REFERENCES libros(id_libro),
    fecha_creacion DATE NOT NULL    
);

CREATE TABLE autores(
	id_autor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    apellidos VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    telefono INT NOT NULL,
    fecha_creacion DATE NOT NULL
);

CREATE TABLE libros_autores(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    libro_id INT,
    autor_id INT,
    #Los constraint como ya se explico no son obligatorios pero si recomendados para mantener la
    #integridad de los datos y no permitir por ejemplo insertar aqui un id de un libro o de un autor
    #que no existen en esas tablas.
    CONSTRAINT FK_LibroAutores_Libros FOREIGN KEY(libro_id) REFERENCES libros(id_libro),
    CONSTRAINT FK_LibroAutores_Autores FOREIGN KEY(autor_id) REFERENCES autores(id_autor),
    fecha_creacion DATE NOT NULL
);

#Inserción de datos en las tablas
#Aquí empieza la inserción de los datos de uno a uno los mismos datos de la anterior para probar
#Insertar datos demo en las tabla clientes
INSERT INTO clientes(id_cliente, nombre, apellidos, fecha_creacion)
VALUES(123645, 'José', 'Montoya', CURDATE()),
(133444, 'Juan', 'Gonzales', CURDATE()),
(235647, 'Maria', 'Yepez', CURDATE()),
(256894, 'Marcela', 'Gomez', CURDATE());

#Insert datos demo en la tabla detalle_cliente
INSERT INTO detalle_cliente(email, telefono, direccion, ciudad, pais, cliente_id, fecha_nacimiento, fecha_creacion)
VALUES('jose@gmail.com', 32323232, 'Calle 24 # 3-56', 'Pereira', 'Colombia', 123645, '1978-09-30', CURDATE()),
('juan@gmail.com', 36985412, 'Carrera 23 # 12-20', 'Lima', 'Peru', 133444, '1987-10-10', CURDATE());

#Aquí están los datos de la relación de uno a muchos para probar la inserción con los mismos datos
#Insertar datos demo en las tabla libros
INSERT INTO libros(id_libro, titulo, descripcion, paginas, idioma, fecha_lanzamiento, fecha_creacion)
VALUES(21123, 'Cien años de soledad', 'descripcion demo', 320, 'Español', '1985-11-10', CURDATE()),
(223612, 'El señor de los anillos', 'descripcion demo', 280, 'Español', '1978-04-02', CURDATE()),
(223145, '1984', 'descripcion demo', 480, 'Inglés', '1984-05-21', CURDATE()),
(215632, 'Un mundo feliz', 'descripcion demo', 250, 'Español', '1998-11-05', CURDATE());

#Insertar datos demo en las tabla resenias
INSERT INTO resenias(calificacion, mensaje, usuario, libro_id, fecha_creacion)
VALUES(9, 'Excelente libro', 'jose@gmail.com', 21123, CURDATE()),
(9, 'Es de los mejores libros que he leído', 'juan@gmail.com', 223145, CURDATE()),
(8, 'Siento que le falto profundidad', 'carlos@gmail.com', 21123, CURDATE()),
(10, 'Lo mejor delo mejor. Recomendado', 'marcela@gmail.com', 215632, CURDATE()),
#Datos nuevos nulos para probar
(8, 'Es un libro entretenido.', 'camila@hotmail.com', NULL, CURDATE()),
(10, 'No me gustó.', 'liliana@yahoo.com', NULL, CURDATE());

#Aquí empiezan los datos de la relación de muchos a muchos los mismos datos para probar
#Insertar datos demo en la tabla autores
INSERT INTO autores(nombre, apellidos, email, telefono, fecha_creacion)
VALUES('Gabriel', 'García Marquez', 'ggarcia1@gmail.com', 32569841, CURDATE()),
('J.R.R', 'Tolkien', 'j.tolkien@gmail.com', 321212632, CURDATE()),
('George', 'Orwell', 'orwellgeo@hotmail.com', 36925632, CURDATE()),
('Aldous', 'Huxley', 'aldhux@gmail.com', 321457812, CURDATE());

#Insertamos datos en la tabla relacionada
INSERT INTO libros_autores(libro_id, autor_id, fecha_creacion)VALUES(21123, 1, CURDATE());
INSERT INTO libros_autores(libro_id, autor_id, fecha_creacion)VALUES(223612, 2, CURDATE());
INSERT INTO libros_autores(libro_id, autor_id, fecha_creacion)VALUES(223145, 3, CURDATE());
INSERT INTO libros_autores(libro_id, autor_id, fecha_creacion)VALUES(215632, 4, CURDATE());

#INNER JOIN si o si tiene que haber un concordancia entre las tablas
#ejercicio 1
select id_libro, titulo, idioma, calificacion, usuario, resenias.fecha_creacion
from libros
inner join resenias 
	on id_libro = libro_id;

#ejercicio 2
select id_cliente, nombre, apellidos, email, telefono, direccion, ciudad, pais
from clientes c
inner join detalle_cliente dc
	on c.id_cliente = dc.cliente_id;
    
#LEFT JOIN devuelve todos los registros de la tabla de la izquierda y los registros coincidentes de la tabla derecha
select l.id_libro, titulo, idioma, calificacion, usuario, r.fecha_creacion
from libros l
left join resenias r
	on l.id_libro = r.libro_id;

#SELFT JOIN union normal, pero la tabla se une consigo misma
#creacion de la tabla para el ejemplo de elf join
create  table ejemplo_selfjoin(
	id int not null primary key auto_increment,
    nombre varchar(100) not null,
    id_administrador int not null
);

insert into ejemplo_selfjoin values (1,'juan velez', 0);
insert into ejemplo_selfjoin values (2,'angela fernandez', 0);
insert into ejemplo_selfjoin values (3,'victoria cardona', 1);
insert into ejemplo_selfjoin values (4,'maria trejos', 1);
insert into ejemplo_selfjoin values (5,'alexander lopez', 2);
insert into ejemplo_selfjoin values (6,'jaime grajales', 2);
insert into ejemplo_selfjoin values (7,'vanesa ramirez', 1);

#ejemplo
select e1.id, e1.nombre empleado, e2.nombre jefe 
from ejemplo_selfjoin e1
inner join ejemplo_selfjoin e2
	on e1.id_administrador = e2.id;
