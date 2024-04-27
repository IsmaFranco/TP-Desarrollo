# Propuesta TP Desarrollo de SoftWare

## Grupo

### Integrantes 
-  Bertea Tomas - 49607
-  Carfagno Chiara - 49450
-  Franco  Ismael - 49545
-  Zampa Gino - 49504 

## Tema 
### Descripción
Negocio a cargo de la venta al por menor de indumentaria textil, la cual se encuentra clasificada según el tipo de prenda, sus talles, colores, disponibilidad y precio. Por parte de los proveedores, se lleva un registro del stock de los productos y con quien debe comunicarse el administrador en caso de necesitar más. Además, cuenta con un servicio de envío dependiendo la ciudad a la que pertenezca el cliente.

## Modelo 
![image](https://github.com/IsmaFranco/TP-Desarrollo/assets/164551766/5869d839-0c55-4111-828d-42ac5cefc341)

(https://dbdiagram.io/d/6629572e03593b6b61e2beeb)

## Alcance Funcional
### Alcance Mínimo 
Regularidad:

|  Req               |    Detalle     |
|---                 |---       |
| CRUD simple        | 1. CRUD Prendas <br> 2. CRUD Proovedores <br> 3. CRUD Clientes <br> 4. CRUD Localidad|
| CRUD dependiente   | 1. CRUP Pedido <br> 2. CRUD Envio|
| Listado <br> + <br> detalle  |1. Listado de Prendas, filtrado por tipo de prenda, muestra=> idPrendas, descripcion, precio, talleDiponible <br> 2. Listado de Pedidos, filtrador por fecha pedidos, muesta=> idPedido, cantidad, idPrendas, descripcionPrendas, monto|
| CUU/Epic           |1. Registrar un pedido <br> 2. Registrar un nuevo cliente|

Adicionales para Aprobación
|  Req               |    Detalle     |
|---                 |---       |
|CRUD                |1. CRUD Prendas <br> 2. CRUD Proovedores <br> 3. CRUD Clientes <br> 4. CRUD Localidad <br> 6. CRUD <br> 7. CRUD |
|CUU/Epic            |1. Registrar un pedido <br> 2. Registrar un nuevo cliente|

## Alcance Funcional Voluntario
|  Req               |    Detalle     |
|---                 |---       |
|Listados            ||
|CUU/Epic            ||
|Otros               ||
