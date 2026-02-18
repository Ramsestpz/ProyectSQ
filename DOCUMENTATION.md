# Documentación del Proyecto NutriPlan

## 1. Descripción del Proyecto
NutriPlan es una aplicación web diseñada para ayudar a los usuarios a planificar sus comidas diarias, gestionar su lista de compras y seguir su progreso nutricional. La aplicación utiliza inteligencia artificial para generar recomendaciones personalizadas.

## 2. Requerimientos Funcionales

### 2.1 Gestión de Usuarios (CRUD)
- **Altas (Registro)**: Los nuevos usuarios pueden crear una cuenta proporcionando nombre, correo, contraseña y objetivos.
- **Consultas (Perfil)**: Los usuarios pueden ver su información personal y estadísticas de uso.
- **Edición (Actualizar Perfil)**: Los usuarios pueden modificar su nombre y objetivo nutricional.
- **Bajas (Eliminar Cuenta)**: Los usuarios pueden eliminar su cuenta permanentemente, lo que borra todos sus datos asociados.

### 2.2 Gestión de Comidas (CRUD)
- **Altas**: Agregar nuevas comidas manualmnete o mediante IA.
- **Consultas**: Ver el plan de comidas diario y navegar por fechas anteriores/futuras.
- **Edición**: Modificar detalles de una comida (título, calorías, macros).
- **Bajas**: Eliminar comidas del plan.

### 2.3 Gestión de Lista de Compras (CRUD parcial)
- **Altas**: Agregar ingredientes manual o automáticamente desde recetas.
- **Consultas**: Ver lista de ingredientes pendientes.
- **Edición**: Marcar ingredientes como comprados (cambio de estado).
- **Bajas**: Eliminar ingredientes de la lista.

### 2.4 Generación de Planes con IA
- El sistema genera un plan de 3 comidas (Desayuno, Comida, Cena) basado en el objetivo del usuario y la fecha seleccionada.

## 3. Requerimientos No Funcionales

### 3.1 Usabilidad
- **Interfaz Intuitiva**: Diseño moderno y responsivo que se adapta a dispositivos móviles y de escritorio.
- **Accesibilidad**: Uso de colores contrastantes y etiquetas semánticas.
- **Localización**: Interfaz completamente en español.

### 3.2 Seguridad
- **Autenticación**: Manejo de sesiones seguras mediante cookies HTTP-only.
- **Protección de Datos**: Las contraseñas se almacenan como hashes (scrypt).
- **Aislamiento de Datos**: Cada usuario solo puede acceder a su propia información.
- **Prevención de Inyecciones**: Uso de consultas parametrizadas para todas las operaciones de base de datos.

### 3.3 Rendimiento
- **Tiempos de Carga**: Optimización de assets y consultas eficientes a la base de datos.
- **Persistencia**: Los datos se guardan y recuperan eficazmente sin pérdida de información al navegar.

## 4. Stack Tecnológico
- **Frontend**: Astro, React, Tailwind CSS.
- **Backend**: Astro API Routes (Node.js).
- **Base de Datos**: MySQL.
- **Librerías Clave**: `mysql2` (BD), `lucide-react` (Iconos), `canvas-confetti` (Animaciones).
