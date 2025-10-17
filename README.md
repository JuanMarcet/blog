# blog
mini proyecto de la asignatura de modelado ágil del software, el objetivo de este es la creación de un proyecto pequeño, peor implementando una metodología ágil, en este caso, Kanban

<h3> blog agil </h3>
Un proyecto de gestión de contenido web desarrollado bajo un marco de trabajo ágil, centrado en la implementación de funcionalidades en tiempo real y componentes de experiencia de usuario modernos. <br>

<h4> Metodología Ágil Aplicada </h4>
Este proyecto se gestionó bajo un enfoque que combina prácticas de Scrum (entrega incremental de valor en ciclos) y Kanban (visualización continua del flujo de trabajo). <br>
Como tal este proyecto tiene 2 interfaces principales, el login que se encarga del "registro de usuarios", pero este registro de momento solo es una previa, ya que, aunque pide reguistro de usuarios, estos usuarios son almacenados en el almacenamiento local del navegador (localstorage), mas no en la base de datos seleccionada (firebase) ya que esto requiere una configuración más compleja y para mostrar el fincionamiento del login está muy bien. Por otro lado tenemos el home, que ya es la interfaz principal dentro del blog.
<br> <br>
<hr> 
<h3>Comentarios</h3>
El tema de los cometnarios si está funcionando con la base de datos (firebase), esta es una base de datos NOSQL, lo que queire decir que la estructura de esta no se manera por tablas, valores y claves; más bien se maneja con documentos, su funcionamiento de manera simple de entender es cajas dentro de cajas. <br>
Este sistema de conexion y guardado en la base de datos tiene una gestion optima de apertura y cierre de la conexion, para evitar bucles de conexión. <br>
<hr>
<h3>Estructura del proyecto</h3>
El código está organizado bajo una arquitectura de Módulos JavaScript (ESM) para separar la lógica de presentación (DOM) de la capa de servicios (Firebase).

<pre>
proyecto_focus/
├── index.html        # Página de inicio / Landing 
├── home.html         # Interfaz principal del blog 
├── login.html        # Interfaz de Login/Registro 
├── favicon.ico       # Icono del sitio (favicon)
├── assets/
│   └── musica/       # Archivos de audio alojados para Netlify
├── css/
│   └── style.css     # Estilos definidos por el compañero de Frontend
├── js/
│   ├── main.js       # Lógica principal (Comentarios, Navegación, Reproductor)
│   └── login.js      # Lógica de Autenticación (localStorage)
└── src/
    ├── music-data.js # Datos de las canciones (URLs estáticas)
    └── services/
        └── commentService.js # Capa de abstracción para la DB (Firestore)
</pre>

<h3>Tecnologías y Servicios</h3> 
<br>
<strong>Frontend: </strong> HTML5, CSS3, JavaScript (Módulos ES). <br> <br>

<strong>Base de Datos:</strong> Firebase Cloud Firestore para la gestion de comentarios. <br>

<strong> Alojamiento: </strong> Netlify para el hosting del Frontend y Archivos estáticos. <br>

<strong> Alojamiento de archivos: </strong> Netlify/GitHub Assets (Reemplazando Google Drive por estabilidad en streaming). <br>

