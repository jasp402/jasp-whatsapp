# jasp-whatsapp

Cliente experimental para automatizar WhatsApp Web mediante Chrome y Puppeteer. El proyecto nació a partir de ideas y código de [WBOT](https://github.com/vasani-arpit/WBOT), y evolucionó como laboratorio personal para respuestas automáticas, reglas de grupos, tareas programadas, webhooks y persistencia local.

> [!WARNING]
> **Estado: Legacy / experimental.** Este repositorio se conserva como referencia histórica. No representa una integración oficial, estable ni recomendada para producción.

## Capacidades implementadas

- Inicio de sesión mediante QR y reutilización del perfil local de Chrome.
- Conexión a WhatsApp Web mediante Puppeteer.
- Respuestas automáticas por coincidencia exacta o parcial.
- Respuestas con variables, archivos, stickers y expresiones con Spintax.
- Reglas específicas para chats y grupos.
- Mensajes y scripts programados por horario.
- Webhooks configurables mediante variables de entorno.
- Servidor Express auxiliar.
- Persistencia local mediante SQLite.
- Empaquetado histórico como ejecutable de Windows mediante `pkg`.

## Arquitectura

```text
Chrome / WhatsApp Web
        ↓
Puppeteer + scripts inyectados
        ↓
Configuración y reglas
        ↓
Respuestas, tareas y webhooks
        ↓
Servidor auxiliar y SQLite
```

Componentes principales:

- `src/index.js`: inicia Chrome, conecta Puppeteer, gestiona el QR e inyecta las funciones del bot.
- `src/config/index.js`: configuración general, respuestas y programación.
- `src/config/groups.local.js`: identificadores y reglas privadas de grupos; no se versiona.
- `src/config/groups.example.js`: ejemplo público con identificadores ficticios.
- `server/`: servidor HTTP auxiliar.
- `plugins/`: funciones inyectadas y respuestas inteligentes.
- `db/`: configuración histórica de SQLite.

## Configuración segura de grupos

Los números telefónicos y los identificadores reales de grupos fueron retirados de la rama actual.

Para configurar grupos localmente:

1. Copia el archivo de ejemplo:

   ```bash
   cp src/config/groups.example.js src/config/groups.local.js
   ```

2. Reemplaza los identificadores ficticios por los identificadores de tus propios grupos.
3. Mantén `groups.local.js` únicamente en tu equipo. El archivo está excluido mediante `.gitignore`.

Si `groups.local.js` no existe, el bot inicia con las respuestas específicas de grupos desactivadas.

## Variables de entorno

Crea un archivo `.env` local cuando necesites configurar webhooks u otros valores privados:

```env
WEBHOOKS=https://example.com/webhook
```

No guardes tokens, cookies, teléfonos, identificadores de grupos ni URLs privadas dentro del repositorio.

## Instalación histórica

Requisitos aproximados del proyecto original:

- Node.js compatible con las dependencias antiguas.
- Google Chrome instalado.
- Acceso a WhatsApp Web.

```bash
npm install
npm start
```

Al iniciar por primera vez, el usuario debe escanear el código QR mostrado en la terminal.

## Limitaciones

- Depende del DOM interno de WhatsApp Web y puede romperse ante cualquier actualización.
- Utiliza versiones antiguas de Puppeteer, Express, Axios y otras dependencias.
- No cuenta con pruebas automatizadas.
- Conserva rutas y comportamientos orientados principalmente a Windows.
- La automatización puede provocar bloqueos, cierres de sesión o restricciones de la cuenta.
- No debe exponerse como servicio público sin autenticación, autorización y límites de uso.

## Relación con WBOT

El proyecto fue inspirado e iniciado desde [vasani-arpit/WBOT](https://github.com/vasani-arpit/WBOT). Las modificaciones posteriores incorporaron experimentos y necesidades personales adicionales. Para comprender el antecedente original, consulta ese repositorio.

## Uso responsable

Este proyecto no está afiliado, autorizado, mantenido, patrocinado ni respaldado por WhatsApp o Meta. WhatsApp y sus marcas relacionadas pertenecen a sus respectivos propietarios.

La automatización de WhatsApp Web utiliza mecanismos no oficiales. Puede incumplir condiciones del servicio, dejar de funcionar sin previo aviso o provocar restricciones de cuenta. Utilízala únicamente con cuentas, contactos y grupos propios o expresamente autorizados.

## Decisión de conservación

Se conserva como proyecto **Legacy** por su valor histórico y técnico. Si la idea se retoma, conviene reconstruirla con dependencias actuales, configuración completamente externa, pruebas y controles de seguridad, en lugar de continuar directamente sobre esta base.
