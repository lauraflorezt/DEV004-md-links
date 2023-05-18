
- 1. [Google.com](https://www.google.com/?hl=es)
- 2. [Este es un link de prueba erróneo](linkerroneo)
- 3. [Link en git](https://github.com/lauraflorezt/DEV004-md-links/blob/main/functions.js)
- 4. [mozilla.org](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
- 5. [pinterest.com](https://co.pinterest.com/pin/1759287346254424/)

* Códigos de estado de respuesta HTTP Status

1. Respuestas informativas (100–199),
2. Respuestas satisfactorias (200–299),
200 OK
La solicitud ha tenido éxito. El significado de un éxito varía dependiendo del método HTTP:
3. Redirecciones (300–399),
4. Errores de los clientes (400–499),
404 Not Found
El servidor no pudo encontrar el contenido solicitado. Este código de respuesta es uno de los más famosos dada su alta ocurrencia en la web.
5. errores de los servidores (500–599).


* Con validate:false :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.

* Con validate:true :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Mensaje fail en caso de fallo u ok en caso de éxito.