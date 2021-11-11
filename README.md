### Backend Prueba PJ

##### Puesta a punto

1) Instalación
```sh
npm install
```

2) Configuración: dento de `index.js` se puede parametrizar el proyecto
- Por defecto en el puerto esta configurado en el <b>3001</b>
- Si es necesario se puede cambiar la `whitelist` para el bloqueo por `cors`

3) Inicio del proyecto

| Comando        | Detalle                                | 
| -------------  | -------------                          |
| `npm start`    | inicio del proyecto en modo producción |
| `npm run dev`  | Inicio del proyecto en modo desarrollo | 

##### Detalle de dependencias

| Dependencia    | Detalle                                  | 
| -------------  | -------------                            |
| `express`      | Creación de la API                       |
| `faker`        | Generar información automatica de prueba |
| `joi`          | Generar los `schemas` de los modelos     | 
| `boom`         | Manejo de estados HTTP                   | 

##### Consideracion de los datos.

Una vez que se inicia el proyecto, automaticamente va generar datos en la memoria, estos datos se reinician cuando se apaga el servidor. 
