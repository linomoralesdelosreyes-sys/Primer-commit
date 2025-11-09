# 🎵 Coplas - Archivos de Audio

Esta carpeta es para almacenar los archivos de audio de las coplas.

## 📋 Instrucciones

### 1. Descargar los audios desde Google Drive

Los audios actuales están en Google Drive:

**Carnaval:**
- `carnaval (2).mp3`
  - Ubicación: project/public/music/carnaval (2).mp3 ✅

**San Antonio:**
- `dice-que-andas-hablando.mp3`
  - URL: https://drive.google.com/file/d/18u-W3NYWOhBbylb7lK9jJ4B-6WUdeeJI/view?usp=sharing

### 2. Colocar los archivos aquí

Una vez descargados, coloca los archivos MP3 en esta carpeta:
```
project/public/coplas/
├── README.md (este archivo)
├── yo-soy-mosita-cantora.mp3
└── dice-que-andas-hablando.mp3
```

### 3. Actualizar las rutas en coplas.ts

Edita el archivo `project/src/lib/coplas.ts` y cambia las URLs de Google Drive por rutas locales:

**Antes:**
```typescript
audio_url: 'https://drive.google.com/file/d/1-1z_lxonmB1fbay0q9ygPt-8AMDdNONG/view?usp=drive_link'
```

**Después:**
```typescript
audio_url: '/coplas/yo-soy-mosita-cantora.mp3'
```

### 4. Formatos soportados

- ✅ MP3 (recomendado)
- ✅ WAV
- ✅ OGG
- ✅ M4A

### 5. Notas importantes

- ⚠️ Los audios de Google Drive pueden tener problemas de CORS
- ✅ Los archivos locales siempre funcionan mejor
- 📏 Tamaño recomendado: < 5 MB por archivo
- 🎚️ Calidad recomendada: 128-192 kbps

## 🔧 Solución de problemas

Si el audio no se reproduce:

1. **Verifica la ruta**: Debe ser `/coplas/nombre-del-archivo.mp3` (empezando con `/`)
2. **Verifica el nombre**: Debe coincidir exactamente con el archivo (mayúsculas/minúsculas)
3. **Verifica el formato**: Asegúrate de que sea MP3 u otro formato soportado
4. **Verifica la consola**: Abre F12 y revisa los errores en la pestaña Console

## 📞 Ayuda

Si necesitas ayuda, verifica los logs en la consola del navegador (F12 → Console).

