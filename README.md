# NutritionApp Frontend

Aplicación móvil desarrollada con React Native y Expo pensada para nutricionistas y pacientes.

## Stack principal

- React Native 0.76 (con TypeScript)

- Expo SDK 52

- React Navigation 7

- Axios para consumo de API’s

## Requisitos previos

- Node.js ≥ 18 LTS. Expo 52 ya no soporta Node 16
- npm/Yarn/pnpm ≥9
- Usa el gestor que prefieras
- Expo CLI
- npm install -g expo-cli
- CLI global para expo start
- Android Studio o Xcode
- Emulador / simulador, o un dispositivo físico con Expo Go

## Instalación local

### 1. Clona el repositorio
git clone https://github.com/tu-orga/nutritionapp-front.git
cd nutritionapp-front

### 2. Instala dependencias
npm install        

### 3. Arranca Expo + Metro bundler
npm run dev         # alias de `expo start`

### 4. Con Metro en marcha puedes:

Pulsar i → abrir el simulador iOS

Pulsar a → abrir el emulador Android

Escanear el QR con la app Expo Go

### Estructura del proyecto

- src/
- assets/               # Fuentes, iconos, imágenes
- components/           # Botones, tarjetas reutilizables
- hooks/                # Hooks personalizados
- navigation/           # Stacks, tabs, drawers
- screens/              # Pantallas agrupadas por flujo
- services/             # Clientes HTTP (axios)
- styles/               # Theming y estilos globales

📑Licencia

MIT

