# Documentación del Proyecto NutriPlan

## 1. Descripción del Proyecto
NutriPlan es una aplicación web diseñada para ayudar a los usuarios a planificar sus comidas diarias, gestionar su lista de compras y seguir su progreso nutricional. La aplicación utiliza inteligencia artificial para generar recomendaciones personalizadas.

## 2. Requerimientos Funcionales

### 2.1 Módulo de Autenticación y Usuarios
- **RF-01 Registro de Usuarios**: El sistema debe permitir a nuevos usuarios registrarse proporcionando nombre, correo electrónico y una contraseña segura.
- **RF-02 Inicio de Sesión**: El sistema debe autenticar a los usuarios mediante correo electrónico y contraseña, estableciendo una sesión segura.
- **RF-03 Gestión de Perfil**: El usuario podrá actualizar su información personal (nombre) y su objetivo nutricional (perder peso, mantener, ganar músculo).
- **RF-04 Eliminación de Cuenta**: El sistema debe permitir al usuario eliminar su cuenta de forma permanente, borrando todos sus datos asociados de la base de datos.
- **RF-05 Persistencia de Sesión**: La sesión del usuario debe mantenerse activa mediante cookies seguras hasta que expire o el usuario cierre sesión explícitamente.

### 2.2 Módulo de Planificación de Comidas
- **RF-06 Visualización del Plan Diario**: El sistema debe mostrar el plan de comidas para la fecha seleccionada, incluyendo desayuno, comida y cena.
- **RF-07 Navegación por Fechas**: El usuario debe poder navegar entre días anteriores y futuros para ver o planificar comidas.
- **RF-08 Agregar Comida Manualmente**: El usuario podrá agregar una comida personalizada especificando título, descripción, calorías, macros, tipo de comida e imagen.
- **RF-09 Edición de Comidas**: El usuario podrá modificar cualquier detalle de una comida existente en su plan.
- **RF-10 Eliminación de Comidas**: El usuario podrá eliminar una comida específica de su plan diario.
- **RF-11 Cálculo de Progreso Nutricional**: El sistema calculará y mostrará automáticamente el total de calorías, proteínas, carbohidratos y grasas consumidas en el día, comparándolas con el objetivo del usuario.

### 2.3 Módulo de Inteligencia Artificial
- **RF-12 Generación Automática de Planes**: El sistema debe ser capaz de generar un plan de comidas completo para el día basado en el objetivo nutricional seleccionado por el usuario.
- **RF-13 Personalización de Recetas IA**: Las recetas generadas por IA deben incluir títulos creativos, descripciones apetitosas, cálculos de macros aproximados e imágenes de alta calidad (Unsplash) acordes al platillo.
- **RF-14 Adaptación a Objetivos**: El contenido calórico de las comidas generadas debe ajustarse dinámicamente según si el objetivo es perder peso (déficit), mantener o ganar músculo (superávit).

### 2.4 Módulo de Lista de Compras
- **RF-15 Gestión de Ingredientes**: El usuario podrá agregar ingredientes manualmente a su lista de compras.
- **RF-16 Marcado de Items**: El usuario debe poder marcar y desmarcar items como "comprados" o "pendientes".
- **RF-17 Eliminación de Items**: El usuario podrá eliminar items de la lista de compras que ya no necesite.
- **RF-18 Persistencia de la Lista**: El estado de la lista de compras debe guardarse en la base de datos para estar disponible en futuras sesiones.

## 3. Requerimientos No Funcionales

### 3.1 Usabilidad y Experiencia de Usuario (UX)
- **RNF-01 Diseño Responsivo**: La interfaz debe adaptarse fluidamente a pantallas de escritorio, tabletas y dispositivos móviles.
- **RNF-02 Retroalimentación Visual**: El sistema debe proporcionar feedback inmediato ante acciones del usuario (ej. notificaciones de "Guardado exitoso", indicadores de carga, animaciones al completar tareas).
- **RNF-03 Estética Visual**: La aplicación debe seguir un diseño moderno y atractivo, utilizando una paleta de colores coherente y tipografía legible.
- **RNF-04 Idioma**: Toda la interfaz de usuario debe estar presentada en español.

### 3.2 Seguridad
- **RNF-05 Almacenamiento Seguro de Contraseñas**: Las contraseñas no deben guardarse en texto plano; deben utilizar un algoritmo de hash robusto (scrypt) con salt único por usuario.
- **RNF-06 Protección de Rutas**: Las páginas privadas del dashboard y perfil deben estar protegidas y ser inaccesibles sin una sesión válida.
- **RNF-07 Validación de Datos**: Todas las entradas del usuario (formularios, parámetros URL) deben ser validadas tanto en el frontend como en el backend para prevenir inyecciones SQL y datos corruptos.

### 3.3 Rendimiento y Fiabilidad
- **RNF-08 Tiempo de Respuesta**: Las operaciones principales (cargar dashboard, agregar comida) deben completarse en menos de 2 segundos bajo condiciones normales de red.
- **RNF-09 Manejo de Errores**: El sistema debe manejar los errores de manera elegante, mostrando mensajes amigables al usuario en lugar de trazas de error técnicas.
- **RNF-10 Disponibilidad de Imágenes**: El sistema debe utilizar imágenes externas optimizadas (CDN de Unsplash) y proporcionar placeholders en caso de fallo de carga.

### 3.4 Arquitectura y Mantenibilidad
- **RNF-11 Código Modular**: El código debe estar organizado en componentes reutilizables y servicios separados para facilitar el mantenimiento.
- **RNF-12 Tipado Estático**: El proyecto debe utilizar TypeScript para garantizar la seguridad de tipos y reducir errores en tiempo de ejecución.

## 4. Stack Tecnológico
- **Frontend**: Astro, React, Tailwind CSS.
- **Backend**: Astro API Routes (Node.js).
- **Base de Datos**: MySQL.
- **Librerías Clave**: `mysql2` (BD), `lucide-react` (Iconos), `canvas-confetti` (Animaciones).
