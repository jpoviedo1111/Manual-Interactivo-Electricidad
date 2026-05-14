# PROMPT — Manual Interactivo de Electricidad con Firebase + Vercel

## ROL
Eres un desarrollador senior Full-Stack especializado en React, TypeScript, Firebase y Vercel.
Tu tarea es migrar y expandir una aplicación de aprendizaje interactivo ya existente,
integrando autenticación real, progreso sincronizado en la nube y despliegue continuo en Vercel.

---

## DESCRIPCIÓN DEL PROYECTO EXISTENTE

### ¿Qué es?
"Manual Interactivo de Electricidad Domiciliaria" — una app educativa tipo curso online con:
- **7 módulos** secuenciales desbloqueados progresivamente
- **50+ lecciones** con bloques de contenido enriquecido (párrafos, fórmulas, tablas, alertas, ejemplos)
- **6 calculadoras** técnicas (AWG, Ley de Ohm, Potencia, etc.)
- **155 preguntas** de quiz (por módulo + examen final de certificación)
- **Certificado PDF** generado con jsPDF al aprobar el examen final (≥ 90%)

### Stack actual
```
React 19 + TypeScript + Vite + Tailwind CSS 3
React Router v6
Zustand v5 (estado global + persistencia en localStorage)
jsPDF (generación de certificado)
```

### Estructura de datos principal
```typescript
// Tipos de bloques de contenido
type BlockKind =
  | "paragraph" | "h2" | "h3" | "concept" | "critical"
  | "rule-aea" | "formula" | "example" | "table"
  | "alert" | "note" | "list" | "cite";

interface ContentBlock {
  kind: BlockKind;
  title?: string;
  body?: string;
  rows?: string[][];
  headers?: string[];
  items?: string[];
}

interface Lesson {
  id: string;           // "m1-l3"
  title: string;
  blocks: ContentBlock[];
  estimatedMin: number;
}

interface Question {
  id: string;
  prompt: string;
  options: { id: "a"|"b"|"c"|"d"; text: string }[];
  correct: "a"|"b"|"c"|"d";
  explanation: string;
  difficulty: "basico" | "intermedio" | "avanzado";
}

interface Module {
  id: string;           // "m1" ... "m7"
  number: 1|2|3|4|5|6|7;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  quiz: Question[];
}
```

### Estado de progreso actual (Zustand + localStorage)
```typescript
interface ProgressState {
  studentName: string;
  lessonsRead: Record<string, true>;       // { "m1-l1": true, ... }
  quizAttempts: Record<string, number[]>;  // { "m1": [72, 85, 92], ... }
  quizPassed: Record<string, true>;        // { "m1": true, ... }
  finalExamAttempts: number[];
  finalExamPassed: boolean;
  finalExamLastScore: number;
}
```

### Rutas de la app
```
/                          → Home (lista de módulos + progreso global)
/modulo/:id                → Página del módulo (lista de lecciones)
/modulo/:id/leccion/:lid   → Lección individual (bloques de contenido)
/modulo/:id/quiz           → Quiz del módulo
/calculadoras              → Calculadoras técnicas (requiere m1+m2+m3 aprobados)
/examen-final              → Examen final 30 preguntas (requiere todos los módulos)
```

### Lógica de desbloqueo
- Módulo 1: siempre disponible
- Módulo N: se desbloquea cuando el quiz del módulo N-1 está aprobado (≥ 70%)
- Calculadoras: requieren m1, m2 y m3 aprobados
- Examen final: requiere los 7 módulos aprobados
- Certificado: se genera cuando el examen final se aprueba con ≥ 90%

---

## OBJETIVO DE LA MIGRACIÓN

Mantener toda la funcionalidad actual y agregar:

### 1. Firebase Authentication
- Login con **Google** (proveedor principal)
- Login con **email + contraseña** (opcional, secundario)
- Pantalla de bienvenida/login antes de acceder al contenido
- Botón de cerrar sesión visible en el header
- El `studentName` se pre-rellena con el displayName de Google

### 2. Firestore — Progreso en la nube
Migrar el store de Zustand+localStorage a **Firestore** para sincronizar el progreso entre dispositivos:

```
Colección: users/{uid}/progress  (documento único por usuario)
Campos:
  studentName: string
  lessonsRead: { [lessonId]: true }
  quizAttempts: { [moduleId]: number[] }
  quizPassed: { [moduleId]: true }
  finalExamAttempts: number[]
  finalExamPassed: boolean
  finalExamLastScore: number
  updatedAt: Timestamp
```

Reglas de seguridad Firestore recomendadas:
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

### 3. Firebase Storage (opcional)
- Guardar los certificados PDF generados en `certificates/{uid}/certificado.pdf`
- Mostrar un link de descarga permanente en el perfil del usuario

### 4. Tabla de líderes global (opcional)
```
Colección: leaderboard/{uid}
Campos:
  displayName: string
  photoURL: string
  finalExamScore: number
  completedAt: Timestamp
```
Mostrar top 10 en `/leaderboard`

---

## ARQUITECTURA TÉCNICA A IMPLEMENTAR

### Stack final
```
React 19 + TypeScript + Vite
Tailwind CSS 3
React Router v6
Zustand v5 (estado de UI local, sin persistencia)
Firebase v10+ (Auth + Firestore + Storage)
jsPDF (certificado)
Vercel (deploy + CI/CD desde GitHub)
```

### Variables de entorno (.env.local)
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Estructura de archivos nueva
```
src/
├── firebase/
│   ├── config.ts          ← initializeApp con las env vars
│   ├── auth.ts            ← signInWithGoogle, signOut, onAuthStateChanged
│   └── firestore.ts       ← getProgress, saveProgress, updateLeaderboard
├── hooks/
│   ├── useAuth.ts         ← hook para el usuario autenticado
│   └── useProgress.ts     ← reemplaza useProgressStore, sincroniza con Firestore
├── components/
│   ├── auth/
│   │   ├── LoginScreen.tsx      ← pantalla de login
│   │   └── ProtectedRoute.tsx   ← wrapper que redirige a login si no auth
│   └── layout/
│       └── Header.tsx     ← agrega avatar + botón cerrar sesión
├── pages/
│   └── LeaderboardPage.tsx (nuevo)
└── store/
    └── progressStore.ts   ← solo estado local de UI (loading, etc.)
```

### Hook useProgress (comportamiento esperado)
```typescript
// src/hooks/useProgress.ts
// Al montar: carga el progreso de Firestore
// Al mutar (markLessonRead, recordQuizAttempt, etc.): actualiza Firestore inmediatamente
// Expone: { progress, loading, markLessonRead, recordQuizAttempt, recordFinalExam, reset }
```

### Componente ProtectedRoute
```typescript
// Si el usuario NO está autenticado → mostrar <LoginScreen />
// Si está autenticado → renderizar <Outlet /> (el contenido protegido)
```

---

## FLUJO DE USUARIO ESPERADO

```
1. Usuario abre la app
2. Ve pantalla de login (logo + "Ingresar con Google" + email/contraseña)
3. Se autentica con Firebase Auth
4. La app carga su progreso desde Firestore (o crea un documento vacío si es nuevo)
5. Navega por módulos, lecciones, quizzes → cada acción se guarda en Firestore
6. Puede cerrar sesión y retomar desde otro dispositivo con el mismo progreso
7. Al aprobar el examen final → se genera el certificado PDF con su nombre real
```

---

## CONFIGURACIÓN DE VERCEL

### vercel.json (para SPA con React Router)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Variables de entorno en Vercel
Agregar en el panel de Vercel → Settings → Environment Variables:
- Todas las `VITE_FIREBASE_*` con sus valores de producción

### CI/CD
- Conectar el repositorio de GitHub a Vercel
- Cada push a `main` despliega automáticamente
- Preview deployments en cada Pull Request

---

## DETALLES DE IMPLEMENTACIÓN IMPORTANTES

1. **No duplicar datos del contenido**: los módulos, lecciones y preguntas siguen siendo
   archivos TypeScript estáticos en `src/data/`. Solo el PROGRESO va a Firestore.

2. **Optimistic updates**: actualizar el estado local inmediatamente y escribir a Firestore
   en segundo plano para que la UI no tenga latencia.

3. **Manejo de offline**: usar `enableIndexedDbPersistence(db)` para que Firestore funcione
   sin conexión y sincronice cuando vuelva.

4. **Loading state**: mientras se carga el progreso inicial de Firestore, mostrar un
   spinner/skeleton en la Home para evitar parpadeos.

5. **Migración de progreso local**: al primer login, detectar si hay datos en localStorage
   bajo la clave `electricidad-app-progress-v1` y ofrecerle al usuario migrarlos a la nube.

6. **Seguridad**: nunca exponer las Firebase Admin credentials en el frontend;
   las reglas de Firestore garantizan que cada usuario solo accede a sus propios datos.

7. **Certificado PDF**: incluir el uid del usuario en el PDF para validación futura.

---

## ENTREGABLES ESPERADOS

- [ ] `src/firebase/config.ts` — inicialización de Firebase
- [ ] `src/firebase/auth.ts` — funciones de autenticación
- [ ] `src/firebase/firestore.ts` — CRUD de progreso
- [ ] `src/hooks/useAuth.ts` — contexto/hook de autenticación
- [ ] `src/hooks/useProgress.ts` — reemplaza progressStore con Firestore
- [ ] `src/components/auth/LoginScreen.tsx` — UI de login
- [ ] `src/components/auth/ProtectedRoute.tsx` — guard de rutas
- [ ] `src/components/layout/Header.tsx` — header con avatar y logout
- [ ] `src/App.tsx` (actualizado) — ProtectedRoute envolviendo las rutas privadas
- [ ] `vercel.json` — configuración de SPA rewrites
- [ ] `.env.local.example` — plantilla de variables de entorno
- [ ] `FIREBASE_SETUP.md` — instrucciones paso a paso para configurar Firebase Console

---

## RESTRICCIONES Y PREFERENCIAS

- Mantener Tailwind CSS — no cambiar a otro sistema de estilos
- No eliminar ninguna funcionalidad existente (calculadoras, quiz, certificado, etc.)
- Código en TypeScript estricto — sin `any`
- Comentarios en español
- UI responsive (mobile-first)
- Usar Firebase v10+ (API modular, tree-shakeable)
- No usar Redux ni React Query — Zustand para UI local, hook personalizado para Firestore
