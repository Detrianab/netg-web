# NextG Solutions Telecom — Sitio corporativo B2B

Sitio formal y directo, sin precios, con catálogo digital, agendamiento de citas y panel privado.

## Idiomas
Español, Inglés, Alemán, Francés y Portugués (Brasil), con selector de banderas siempre visible en la cabecera. Todo el contenido del sitio traducido; las fichas técnicas se muestran tal cual las entrega el fabricante.

## Páginas
- **Inicio**: presentación, propuesta de valor, carrusel animado con los logos de clientes (DIGITEL, TELEFÓNICA, AirTEK, THUNDERNET, INGYPRO, SUCRENET) y de marcas representadas, accesos a soluciones y a agendar cita.
- **Nosotros**: por qué trabajar con nosotros (desde 2005), misión, visión, valores corporativos y política de calidad.
- **Soluciones**: Calidad de aire en oficinas · Granjas de animales vivos (sección ampliada) · Horticultura e invernaderos · Control de cadena de frío. Cada una con su descripción y los sensores asociados.
- **Catálogo de productos**: divisiones, buscador y filtros; cada producto con su ficha técnica (extraída de los PDF adjuntos: gateway, sensor CO2+temperatura, transmisor 0-10 V, sonda 4xT, sensor de amoníaco, empalmadora Fujikura 96S) y botón para solicitar información por WhatsApp o correo. Marca del sitio siempre NextG.
- **Agendar cita**: calendario con día y hora disponibles, datos de la empresa y motivo de la visita.
- **Contacto**: mapa de Google con la oficina en Caracas, correo a.luzardo@ngstelecom.com.ve, WhatsApp +58 414-3004421 y enlaces directos a las redes sociales.
- **Políticas**: garantías, cancelaciones, reembolsos y tratamiento de datos.

## Agendamiento y WhatsApp
- Calendario con horarios de oficina, bloqueo de fechas ocupadas y confirmación inmediata en pantalla.
- Cada cita se guarda y se envía un mensaje de WhatsApp automático al cliente con el comprobante (día, hora, dirección) y un aviso al equipo.
- El envío automático de WhatsApp requiere una cuenta de WhatsApp Business API (por ejemplo Twilio o Meta) contratada por ustedes. Dejo todo conectado y listo; en cuanto entreguen las credenciales empieza a enviar solo. Mientras tanto, la cita queda guardada y se envía confirmación por correo, más un botón de respaldo que abre WhatsApp con el resumen.

## Panel administrativo privado
Acceso con usuario y contraseña para el equipo: ver, confirmar o cancelar citas, bloquear días y horas no disponibles, y revisar las solicitudes de información del catálogo.

## Diseño
Corporativo y sobrio, basado en el azul del logotipo NextG sobre blanco, tipografía limpia, mucho aire y navegación sin fricción. Animaciones discretas: aparición al hacer scroll, el bucle continuo de logos de clientes y transiciones suaves en tarjetas y botones.

## Detalles técnicos
- TanStack Start con rutas propias por sección (SEO y compartición en redes), i18n con detección de idioma y persistencia.
- Lovable Cloud para base de datos (citas, horarios bloqueados, solicitudes, productos), autenticación del panel y funciones de servidor.
- Componente LogoLoop suministrado, adaptado a TypeScript y a los tokens de diseño.
- Google Maps embebido en Contacto.
- Envío de WhatsApp mediante función de servidor con credenciales guardadas como secretos; correo transaccional como respaldo.
- Imágenes y PDF de fichas técnicas servidos vía Lovable Assets.

## Pendiente de ustedes
- Dirección exacta de la oficina en Caracas para el mapa (uso una referencia provisional hasta recibirla).
- Enlaces reales de las redes sociales y logos de clientes en imagen (si no llegan, uso versiones tipográficas).
