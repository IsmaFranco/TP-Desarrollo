# Propuesta TP Desarrollo de SoftWare

## Link Pull Request
https://github.com/IsmaFranco/TP-Desarrollo/pull/1

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
(https://app.diagrams.net/#G1T820d4CNIOQc7aCUXa8UF6I6R0Vd3Hd8#%7B%22pageId%22%3A%22SbjHolrNF-ujds2NBdKP%22%7D)

## Alcance Funcional
### Alcance Mínimo 
Regularidad:

|  Req               |    Detalle     |
|---                 |---       |
| CRUD simple        | 1. CRUD Prendas <br> 2. CRUD Proovedores <br> 3. CRUD Clientes <br> 4. CRUD Localidad|
| CRUD dependiente   | 1. CRUP Pedido <br> 2. CRUD Envio|
| Listado <br> + <br> detalle  |1. Listado de Prendas, filtrado por tipo de prenda, muestra=> Nombre, descripcion, precio, talleDiponible <br> 2. Listado de Pedidos, filtrador por fecha pedidos, muestra=> idPedido, fecha, idUsuario, idEnvío, idPrendas, descripcionPrendas, monto|
| CUU/Epic           |1. Registrar un pedido <br> 2. Registrar un nuevo cliente|

Adicionales para Aprobación
|  Req               |    Detalle     |
|---                 |---       |
|CRUD                | 1. CRUD Prendas <br> 2. CRUD Proovedores <br> 3. CRUD Clientes <br> 4. CRUD Localidad <br> 5. CRUP Pedido <br> 6. CRUD Envio <br> |
|CUU/Epic            |1. Registrar un pedido <br> 2. Registrar un nuevo cliente <br> 3. Actualizar monto prenda 4. Cargar nueva prenda|

## Alcance Funcional Voluntario
|  Req               |    Detalle     |
|---                 |---       |
|Listados            ||
|CUU/Epic            ||
|Otros               ||
