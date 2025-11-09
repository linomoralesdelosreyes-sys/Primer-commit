# 🚀 Guía Completa para Desplegar en Vercel

## Paso 1: Instalar todas las dependencias del proyecto

```powershell
cd "C:\Users\USUARIO\Downloads\project-bolt-sb1-t6zubzcc (1)\project"
npm install
```

## Paso 2: Verificar que el build funciona correctamente

```powershell
npm run build
```

Este comando creará una carpeta `dist` con todos los archivos optimizados para producción.

## Paso 3: Instalar Vercel CLI globalmente

```powershell
npm install -g vercel
```

## Paso 4: Iniciar sesión en Vercel

```powershell
vercel login
```

Esto abrirá tu navegador para que inicies sesión con:
- GitHub
- GitLab
- Bitbucket
- Email

## Paso 5: Desplegar en Vercel

### Opción A: Deploy desde la terminal (Recomendado)

```powershell
# Para hacer un deploy de prueba
vercel

# Para hacer un deploy a producción
vercel --prod
```

Durante el primer deploy, Vercel te hará algunas preguntas:
- **Set up and deploy?** → Yes
- **Which scope?** → Selecciona tu cuenta
- **Link to existing project?** → No
- **What's your project's name?** → conociendo-mendez (o el nombre que prefieras)
- **In which directory is your code located?** → ./ (presiona Enter)
- **Want to override the settings?** → No

### Opción B: Deploy desde el sitio web de Vercel

1. Ve a https://vercel.com
2. Inicia sesión
3. Click en "Add New" → "Project"
4. Sube tu carpeta del proyecto o conecta tu repositorio de Git
5. Vercel detectará automáticamente que es un proyecto Vite
6. Click en "Deploy"

## Configuraciones importantes

Los siguientes archivos ya están configurados en tu proyecto:

### ✅ `vercel.json` (Ya creado)
Configura cómo Vercel debe construir y servir tu aplicación.

### ✅ `package.json` (Ya actualizado)
Incluye el script `vercel-build` necesario para el deploy.

### ✅ `.vercelignore` (Ya creado)
Excluye archivos innecesarios del deploy.

## Comandos útiles de Vercel CLI

```powershell
# Ver todos tus proyectos
vercel list

# Ver logs del proyecto
vercel logs

# Eliminar un proyecto
vercel remove nombre-proyecto

# Ver información del último deploy
vercel inspect

# Abrir el dashboard de Vercel
vercel open
```

## Variables de entorno (Opcional)

Si tu aplicación necesita variables de entorno:

```powershell
# Agregar una variable de entorno
vercel env add NOMBRE_VARIABLE

# Listar variables de entorno
vercel env ls
```

O desde el dashboard de Vercel:
1. Ve a tu proyecto
2. Settings → Environment Variables
3. Agrega tus variables

## Actualizar tu aplicación

Cada vez que hagas cambios y quieras actualizar la versión en Vercel:

```powershell
# Navegar al directorio del proyecto
cd "C:\Users\USUARIO\Downloads\project-bolt-sb1-t6zubzcc (1)\project"

# Hacer el deploy actualizado
vercel --prod
```

## Dominios personalizados

Una vez desplegado, puedes:
1. Usar el dominio que Vercel te asigna: `tu-proyecto.vercel.app`
2. Agregar un dominio personalizado desde el dashboard de Vercel

## Solución de problemas

### Error: "Command not found: vercel"
```powershell
npm install -g vercel
```

### Error durante el build
```powershell
# Limpiar cache y reinstalar
rm -rf node_modules
rm -rf dist
npm install
npm run build
```

### El sitio no carga correctamente
Verifica que `vercel.json` esté configurado correctamente con las rutas SPA.

## 🎉 ¡Listo!

Tu aplicación "Conociendo Méndez" estará disponible en:
- URL de Vercel: `https://tu-proyecto.vercel.app`
- Con HTTPS automático
- Con CDN global
- Con actualizaciones automáticas si usas Git

## Notas importantes

- ✅ Los archivos de audio en `/public/music/` se desplegarán correctamente
- ✅ Las imágenes en `/public/` y `/src/assets/` estarán disponibles
- ✅ La aplicación funcionará en modo demo (sin Supabase) automáticamente
- ✅ Vercel detectará automáticamente que es un proyecto Vite/React

---

**¿Necesitas ayuda?**
- Documentación de Vercel: https://vercel.com/docs
- Soporte de Vercel: https://vercel.com/support

