# 🎵 Música de Fondo - Pantalla Principal

Esta carpeta es para almacenar el archivo de audio de fondo de la pantalla principal.

## 📋 Archivo Requerido

### **welcome-background.mp3**
Música de fondo que se reproduce en loop en la pantalla de bienvenida.

**Requisitos:**
- 📂 **Nombre exacto:** `welcome-background.mp3`
- 🎵 **Formato:** MP3 (recomendado), WAV, OGG también funcionan
- 📏 **Tamaño:** Recomendado < 5 MB
- 🎚️ **Calidad:** 128-192 kbps es suficiente
- ⏱️ **Duración:** 1-3 minutos (se reproduce en loop)

## 📂 Ubicación

```
project/
└── public/
    └── music/
        ├── README.md (este archivo)
        └── welcome-background.mp3  ← Coloca tu archivo aquí
```

## 🔍 Cómo Verificar

1. **Abre la aplicación** en el navegador
2. **Abre la Consola de Desarrollador** (presiona F12)
3. **Busca estos mensajes:**

### ✅ **Si el audio carga correctamente:**
```
🎵 Inicializando audio de fondo de la pantalla principal...
✅ Audio de fondo cargado correctamente
📊 Duración: 120.50 segundos
🔊 Volumen: 30%
🔁 Loop: Activado
```

### ❌ **Si hay un error:**
```
❌ Error al cargar el audio de fondo: ...
📍 URL que falló: /music/welcome-background.mp3
📁 Ruta esperada: project/public/music/welcome-background.mp3

🔧 SOLUCIONES:
  1️⃣ Verifica que el archivo existe en: project/public/music/
  2️⃣ Verifica el nombre exacto: welcome-background.mp3
  3️⃣ Formato soportado: MP3, WAV, OGG
  4️⃣ Descarga audio de ejemplo: https://youtu.be/Y7Za1gGbBr4?si=i9_f0ND1ozDAn11U
```

## 🎨 Indicadores Visuales

### **Botón de Audio (esquina superior derecha):**

| Estado | Color | Icono | Descripción |
|--------|-------|-------|-------------|
| ✅ Reproduciendo | Azul degradado | 🔊 Volume2 | Audio activo con punto verde pulsante |
| 🔇 Silenciado | Gris | 🔇 VolumeX | Audio silenciado (muted) |
| ❌ Error | Rojo | 🔇 VolumeX | Archivo no encontrado |

### **Mensaje de Error:**
Si el archivo no se encuentra, verás una caja roja debajo del botón de audio que dice:
```
⚠️ Audio no disponible
Archivo no encontrado. Presiona F12 para ver detalles.
```

## 🔧 Solución de Problemas

### Problema: El audio no se reproduce automáticamente
**Causa:** Los navegadores bloquean autoplay por defecto.
**Solución:** Haz clic en el botón 🔊 en la esquina superior derecha.

### Problema: Error "404 Not Found"
**Causa:** El archivo no existe en la ubicación correcta.
**Solución:** 
1. Verifica que el archivo está en `project/public/music/`
2. Verifica que se llama exactamente `welcome-background.mp3`
3. Reinicia el servidor de desarrollo (`npm run dev`)

### Problema: "Formato no soportado"
**Causa:** El navegador no soporta el formato del archivo.
**Solución:** 
1. Convierte el archivo a MP3 (formato universal)
2. Usa herramientas como [CloudConvert](https://cloudconvert.com/mp3-converter)

### Problema: El volumen es muy bajo/alto
**Solución:** Edita el archivo `WelcomeScreen.tsx` y cambia:
```typescript
audio.volume = 0.3;  // Valores de 0.0 (silencio) a 1.0 (máximo)
```

## 🎼 Recomendaciones de Audio

**Estilo sugerido para el videojuego educativo:**
- 🎻 Música folclórica tarijeña
- 🎸 Ritmos suaves y alegres
- 🥁 Tempo moderado (no muy rápido)
- 🎵 Sin letra (instrumental)
- 📉 Volumen bajo para no distraer

**Fuentes de música libre de derechos:**
- 🎵 [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- 🎵 [Free Music Archive](https://freemusicarchive.org/)
- 🎵 [Incompetech](https://incompetech.com/)
- 🎵 [Bensound](https://www.bensound.com/)

## 📞 Ayuda Técnica

Si el audio no funciona después de seguir estos pasos:

1. **Verifica la consola del navegador** (F12 → Console)
2. **Busca mensajes de error** que empiecen con ❌
3. **Verifica la ruta del archivo** en el sistema de archivos
4. **Reinicia el servidor** de desarrollo
5. **Limpia la caché** del navegador (Ctrl + Shift + R)

## 🔗 Recursos Adicionales

- 📹 [Video de ejemplo sugerido](https://youtu.be/Y7Za1gGbBr4?si=i9_f0ND1ozDAn11U)
- 📚 [Documentación de HTML5 Audio](https://developer.mozilla.org/es/docs/Web/HTML/Element/audio)
- 🎵 [Guía de formatos de audio](https://developer.mozilla.org/es/docs/Web/Media/Formats/Audio_codecs)

---

**Última actualización:** 2024
**Versión:** 1.0

