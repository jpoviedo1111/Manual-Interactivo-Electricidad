# Configuración de Firebase + Vercel

## 1. Crear proyecto en Firebase

1. Ve a https://console.firebase.google.com
2. Haz clic en "Agregar proyecto" → ingresa un nombre (ej: `electricidad-app`)
3. Desactiva Google Analytics (opcional) → "Crear proyecto"

---

## 2. Registrar la app web

1. En la consola de Firebase, haz clic en el ícono `</>` (Web)
2. Ingresa un apodo (ej: `electricidad-web`) → "Registrar app"
3. Copia los valores de `firebaseConfig` y pégalos en `.env.local`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=mi-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mi-proyecto
VITE_FIREBASE_STORAGE_BUCKET=mi-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 3. Activar Authentication

1. En la barra lateral: **Build → Authentication → Get started**
2. Pestaña "Sign-in method"
3. Habilitar **Google** → selecciona tu email de soporte → Guardar
4. (Opcional) Habilitar **Email/Password** → Guardar

---

## 4. Crear base de datos Firestore

1. En la barra lateral: **Build → Firestore Database → Create database**
2. Selecciona **Production mode** → elige la región más cercana (ej: `us-east1`)
3. Una vez creada, ve a la pestaña **Rules** y reemplaza el contenido con:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/progress/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

4. Haz clic en **Publish**

---

## 5. Ejecutar localmente

```bash
cp .env.local.example .env.local
# Rellena los valores en .env.local con los de tu proyecto Firebase
npm run dev
```

---

## 6. Deploy en Vercel

### Desde la terminal (primera vez):

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones. Cuando pregunte por el framework, selecciona **Vite**.

### Agregar las variables de entorno en Vercel:

1. Ve a https://vercel.com → tu proyecto → Settings → Environment Variables
2. Agrega cada variable de `.env.local` con su valor

### CI/CD automático desde GitHub:

1. Sube el proyecto a GitHub: `git push`
2. En Vercel: "Add New Project" → importa el repositorio de GitHub
3. Vercel detecta Vite automáticamente y despliega en cada push a `main`

---

## Estructura de datos en Firestore

```
users/
  {uid}/
    progress/
      data          ← documento con todo el progreso del usuario
        studentName: string
        lessonsRead: { "m1-l1": true, ... }
        quizAttempts: { "m1": [72, 85, 100], ... }
        quizPassed: { "m1": true, ... }
        finalExamAttempts: [88, 94]
        finalExamPassed: true
        finalExamLastScore: 94
        updatedAt: Timestamp
```
