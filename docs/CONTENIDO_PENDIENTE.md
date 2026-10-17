# Contenido pendiente (para latroupe)

Lo que hace falta escribir para desbloquear el roadmap de visibilidad. El plan
técnico y el contexto están en [ROADMAP_VISIBILIDAD.md](./ROADMAP_VISIBILIDAD.md).

**No hace falta tocar código.** Los textos se pueden entregar en un documento y
se vuelcan al sitio; lo importante es que respeten la estructura de cada bloque,
porque es la que ya renderiza la web.

Todo lleva versión **ES y EN**. Si el inglés se traduce después, entregar
primero el español y marcarlo.

---

## Resumen y prioridad

| # | Bloque | Quién | Esfuerzo estimado | Prioridad |
|---|---|---|---|---|
| A | Textos de 5 proyectos del portfolio | latroupe | ~45 min por proyecto | **Alta** |
| B | 2 casos de estudio narrativos (Andaz, Rochester Row) | latroupe | ~2 h cada uno | **Alta** |
| C | 5-8 FAQs para la home | latroupe | ~1 h | Media |
| D | Imagen de marca para compartir en redes | Diseño | ~1 h | Media |
| E | Temas del blog (3 primeros artículos) | latroupe + quien redacte | ~1 h de decisión | Media |
| F | Lead magnet y newsletter | latroupe | Depende de G | Baja hasta decidir G |
| G | **Decisión de posicionamiento** | Emmelin + Jaume | Una conversación | **Bloqueante** |

---

## A · Textos de los proyectos del portfolio

**Estado actual:** de los seis proyectos con ficha, solo **Al Ameen** tiene texto.
`Rochester Row` y `ORO Hato Rey` muestran literalmente «Información del proyecto
próximamente». `Sant Feliu`, `Holbein Gardens` y `Andaz Turks` están vacíos.

**Por qué importa:** hoy la home tiene 541 palabras visibles. Google no indexa
imágenes como contenido, así que un portfolio sin texto es invisible para
cualquiera que no busque «latroupe» por su nombre. Es también el material que
usan ChatGPT o Perplexity para poder citar al estudio.

**Qué hace falta, por proyecto** (100-150 palabras en total bastan):

| Campo | Qué es | Ejemplo (Al Ameen) |
|---|---|---|
| `type` | Sector | «Oficinas corporativas / Workplace» |
| `client` | Cliente, o «confidencial» | confidencial |
| `partner` | Estudio con el que se colaboró | BDG |
| `phase` | Fase RIBA o equivalente | «Stage 3 – Desarrollo técnico» |
| `status` | Estado | «Proyecto completado» / «En desarrollo» |
| `shortDesc` | Una frase | «Desarrollo técnico y coordinación BIM para proyecto corporativo en Arabia Saudí.» |
| `longDesc` | 2-3 párrafos: cómo entramos, cuál era el reto, en qué entorno se trabajó | ver `src/content/es.ts` |
| `labor` | 4-6 viñetas de qué hicimos exactamente | «Producción y desarrollo de modelos en Revit conforme a los estándares del proyecto», «Revisión y resolución de interferencias»… |
| `closingText` | Resultado para el cliente | «Se aseguró una documentación técnica consistente y alineada con los requerimientos del cliente.» |
| `closingText2` | Valor diferencial | «El valor diferencial fue la capacidad de aportar estructura, rigor BIM y refuerzo técnico especializado.» |
| `images` | Imágenes con pie de foto | render, planta, explotado, moodboard… |

**Los cinco pendientes:** Rochester Row · ORO Hato Rey · Sant Feliu · Holbein
Gardens · Andaz Turks and Caicos.

> Si algún proyecto no se puede publicar por confidencialidad, decidlo y se
> retira de la ficha en vez de dejarlo con «próximamente», que hoy es el peor de
> los dos mundos: ocupa sitio y no aporta nada.

---

## B · Los dos casos de estudio narrativos

El informe de Holdmin los señala como **el activo de conversión más potente
disponible**, y ninguno de los dos está escrito: **Andaz Turks and Caicos** (Hyatt,
hospitality internacional) y **Rochester Row** (Londres, workplace).

Un caso de estudio es más largo que una ficha de proyecto (600-900 palabras) y
va más allá de fotos y nombre de cliente. Estructura:

1. **El reto del cliente.** Qué necesitaba el estudio, con qué restricción
   (plazo, volumen, estándar, husos horarios, fase en la que entraron).
2. **Cómo nos integramos.** Cuánto se tardó, con qué herramientas, cómo se
   coordinó con el equipo interno. Esta es la parte que nadie más puede contar y
   la que responde a la duda real de quien está evaluando externalizar.
3. **Las fases de trabajo.** Qué se entregó en cada una.
4. **El resultado.** Con algún dato concreto si es posible: número de planos,
   semanas de entrega, interferencias resueltas, personas del equipo.

Si hay una cita del cliente o del partner, aunque sea de una sola línea, vale
más que tres párrafos de descripción.

---

## C · FAQs para la home

Entre 5 y 8 preguntas reales con respuesta directa. Se publican visibles en la
home y se marcan con datos estructurados, que es lo que hace que aparezcan en
Google y en respuestas de IA.

La landing `/bim-consultancy` ya tiene nueve, así que **el punto de partida es
revisarlas y adaptar las que apliquen al servicio general**, no escribir de cero.

Preguntas que el informe sugiere cubrir:

- ¿Cuánto se tarda en integrar al equipo de latroupe en un proyecto?
- ¿Con qué tipo de estudios trabajáis?
- ¿En qué fases del proyecto podéis apoyar?
- ¿Cómo se factura / cómo se dimensiona el equipo?
- ¿Trabajáis con los estándares y las plantillas del estudio cliente?

Formato: respuesta en la primera frase, sin rodeos. Los motores generativos
citan la primera frase, no el tercer párrafo.

---

## D · Imagen para compartir en redes

Hasta ahora, cualquier enlace del sitio compartido en LinkedIn o WhatsApp salía
sin imagen. Se ha puesto una imagen del portfolio como parche, pero hace falta
**una pieza de marca de 1200 × 630 px** (wordmark + claim sobre color de marca),
y opcionalmente una variante para la landing BIM.

Es el primer contacto visual de todo lo que se comparta en el canal que el plan
considera prioritario.

---

## E · Blog: los tres primeros temas

No existe blog. El plan pedía un artículo mensual desde julio. Antes de
construirlo hay que decidir de qué habla, porque eso condiciona la arquitectura.

Del mapa de keywords del informe, los candidatos de menor dificultad y mayor
intención son:

| Tema | Keyword objetivo | Intención |
|---|---|---|
| Cómo escalar un estudio de arquitectura sin contratar | «como escalar estudio arquitectura» | Informacional, fácil |
| Qué implica externalizar producción técnica y cuándo compensa | «externalizar proyectos arquitectura» | Transaccional |
| Gestión de proyectos de hospitality: dónde se pierde el tiempo | «gestion proyectos hospitality diseño» | Informacional |

Hace falta: confirmar los tres temas, decidir quién redacta (interno o Holdmin),
y si el contenido vive en el repo (Markdown) o en un gestor aparte.

---

## F · Lead magnet y newsletter

Pendiente de la decisión G. El informe propone un lead magnet específico de
hospitality («el proceso que usan los estudios de hospitality premium para
escalar proyectos sin contratar») en vez de una guía genérica de externalización,
porque una guía genérica compite con plataformas globales y atrae leads malos.

Si el foco pasa a ser BIM y Reino Unido, el tema del lead magnet cambia por
completo. Por eso no se ha avanzado.

---

## G · La decisión que bloquea el resto

Hay dos posicionamientos en marcha a la vez:

- **Hospitality premium** (Hyatt, Marriott, Andaz), con LinkedIn y casos de
  estudio como motor. Es lo que propone el informe de Holdmin y para lo que el
  portfolio es un activo casi imposible de replicar.
- **BIM consultancy orientada a Reino Unido**, con Google Ads como motor. Es lo
  que se ha construido de hecho: la landing `/bim-consultancy` tiene tres veces
  más contenido que la home y está configurada con el inglés como idioma por
  defecto.

Los dos son defendibles. Lo que no funciona es sostener los dos a medias: los
textos de los proyectos, los temas del blog, el lead magnet y el idioma
prioritario de la web cambian según cuál sea.

**Qué hace falta decidir:** cuál de los dos es la cuña principal para los
próximos seis meses, y si el otro se mantiene como línea secundaria o se para.
