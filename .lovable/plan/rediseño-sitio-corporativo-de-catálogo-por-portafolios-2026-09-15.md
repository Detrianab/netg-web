# Rediseño: sitio corporativo de catálogo por portafolios

El sitio deja de girar en torno a la reserva de citas y pasa a ser un catálogo corporativo de equipos, con navegación jerárquica: Inicio → Portafolio → Descripción del portafolio → Equipos.

## 1. Encabezado

- Se retira el botón "Agendar cita" y el enlace a esa página del menú y del pie.
- Los botones principales pasan a ser "Contáctanos" y "Llámanos" (llamada directa y WhatsApp).
- Nuevo menú: Inicio · Nosotros · Portafolios · Soluciones · Contacto · Políticas.
- El logotipo sigue como está (nombre compuesto) hasta que me envíe el archivo del logo oficial; en cuanto lo adjunte lo sustituyo por la imagen en el encabezado, el pie y el ícono del navegador.

## 2. Agendamiento de citas

- Se elimina la página de citas y sus accesos.
- Los formularios existentes de contacto y de solicitud de información por equipo se mantienen y pasan a ser el canal principal.
- El panel privado y los datos ya guardados no se borran; simplemente dejan de estar enlazados desde el sitio público.

## 3. Inicio

- Hero con carta de presentación breve y profesional: quiénes somos, desde 2005, a qué operadores e integradores servimos y qué resolvemos en telecomunicaciones. Botones: "Contáctanos" y "Ver portafolios".
- Debajo: cuadrícula visual de los cuatro portafolios con imagen propia cada uno.
- Se conservan el bucle de logotipos de clientes, los valores y la sección de por qué trabajar con nosotros.
- Se retira la cuadrícula de todos los productos sueltos del inicio (ahora viven dentro de su portafolio).

## 4. Portafolios

Cuatro portafolios, cada uno con página propia:

1. Fibra óptica
2. Radiofrecuencia (RF)
3. Monitoreo ambiental
4. Instrumentación electrónica

- Página índice `/portafolios`: cuadrícula de tarjetas con imagen, nombre y resumen de cada portafolio.
- Página de portafolio `/portafolios/{portafolio}`: encabezado con imagen, descripción técnica de la categoría (qué abarca, para qué se usa, a quién sirve) y, debajo, la cuadrícula de equipos que pertenecen únicamente a ese portafolio.
- Radiofrecuencia se publica con su descripción técnica y un aviso de "portafolio en ampliación" con botón de contacto, hasta que me entregue los equipos de esa división.
- El catálogo actual (`/catalogo`) se conserva como buscador transversal y se enlaza desde cada portafolio; sus enlaces antiguos siguen funcionando.

## 5. Ficha de equipo

Sin cambios de fondo: imagen, código, descripción, especificaciones y formulario de solicitud de información. Se añade una miga de pan "Portafolios / {portafolio} / {equipo}" y un bloque de equipos relacionados del mismo portafolio.

## 6. Traducciones

Todos los textos nuevos (carta de presentación, nombres y descripciones de los cuatro portafolios, botones de contacto) se agregan en los cinco idiomas: español, inglés, alemán, francés y portugués.

## Detalles técnicos

- Nuevas rutas: `src/routes/portafolios.tsx` (layout), `portafolios.index.tsx`, `portafolios.$slug.tsx`. Eliminación de `src/routes/agendar-cita.tsx`.
- `src/data/products.ts`: la propiedad `division` se amplía con `radiofrecuencia`; se añade `src/data/portfolios.ts` con slug, imagen, resumen y descripción técnica localizada de cada portafolio.
- Imágenes de portafolio generadas en alta calidad y guardadas como recursos del proyecto.
- Diccionarios `src/i18n/locales/{es,en,de,fr,pt}.ts`: nueva sección `portfolios`, ajustes en `nav` y `home`, retiro de las claves de agendamiento del sitio público.
- `SiteHeader`, `SiteFooter` e `index.tsx` actualizados; `head()` propio con título y descripción para cada página nueva.
- Se mantienen las tablas y funciones de servidor existentes; solo se retira el enlace público a la reserva.

## Pendiente de su parte

- Archivo del logotipo oficial.
- Listado de equipos del portafolio de Radiofrecuencia, si desea publicarlos ahora.
