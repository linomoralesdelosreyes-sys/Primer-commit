# 🎵 INSTRUCCIONES: Descargar Audio de Fondo

## 📹 Video Original
**URL:** https://youtu.be/Y7Za1gGbBr4?si=i9_f0ND1ozDAn11U

---

## 📥 **Pasos para Descargar el Audio:**

### **Opción A: Usando un Conversor Online (Más Fácil)**

1. **Visita uno de estos sitios:**
   - 🔗 https://ytmp3.nu/
   - 🔗 https://320ytmp3.com/
   - 🔗 https://www.y2mate.com/

2. **Pega la URL del video:**
   ```
   https://youtu.be/Y7Za1gGbBr4?si=i9_f0ND1ozDAn11U
   ```

3. **Selecciona formato MP3**

4. **Haz clic en "Convertir" o "Descargar"**

5. **Guarda el archivo como:**
   ```
   welcome-background.mp3
   ```

6. **Colócalo en:**
   ```
   project/public/music/welcome-background.mp3
   ```

---

### **Opción B: Usando yt-dlp (Para Usuarios Avanzados)**

Si tienes Python instalado:

```bash
# Instalar yt-dlp
pip install yt-dlp

# Descargar solo el audio en formato MP3
yt-dlp -x --audio-format mp3 -o "welcome-background.mp3" "https://youtu.be/Y7Za1gGbBr4?si=i9_f0ND1ozDAn11U"
```

Luego mueve el archivo a `project/public/music/`

---

## 📂 **Ubicación Final:**

El archivo debe estar exactamente en:
```
project/
└── public/
    └── music/
        └── welcome-background.mp3  ← AQUÍ
```

---

## ✅ **Verificar que Funciona:**

1. Coloca el archivo en la ubicación correcta
2. Recarga la aplicación (Ctrl + R o F5)
3. Abre la consola (F12)
4. Busca el mensaje:
   ```
   ✅ Audio de fondo cargado correctamente
   📊 Duración: [X] segundos
   ```
5. Haz clic en el botón 🔊 en la esquina superior derecha
6. Deberías escuchar el audio

---

## 🎚️ **Ajustar el Volumen (Opcional):**

Si el audio es muy fuerte o muy bajo, edita:
`project/src/components/WelcomeScreen.tsx` línea 51:

```typescript
audio.volume = 0.3;  // Valores de 0.0 a 1.0
```

---

## ⚠️ **Nota Legal:**

Asegúrate de tener los derechos o permisos para usar el audio en tu proyecto educativo.

---

## 📞 **¿Problemas?**

Si el audio no funciona después de seguir estos pasos:
1. Verifica que el archivo se llame exactamente `welcome-background.mp3`
2. Verifica que esté en `project/public/music/`
3. Reinicia el servidor: detén `npm run dev` y vuelve a ejecutarlo
4. Limpia la caché del navegador (Ctrl + Shift + R)

