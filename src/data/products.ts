import type { Locale } from "@/i18n";

export type Localized = Record<Locale, string>;

export type Spec = { label: Localized; value: string };

export type Product = {
  slug: string;
  name: string;
  code: string;
  brand: string;
  division: "monitoreo-ambiental" | "fibra-optica" | "instrumentacion" | "radiofrecuencia";
  solutions: string[];
  short: Localized;
  description: Localized;
  specs: Spec[];
};

const L = {
  range: { es: "Rango de medición", en: "Measuring range", pt: "Faixa de medição", fr: "Plage de mesure", de: "Messbereich" },
  resolution: { es: "Resolución", en: "Resolution", pt: "Resolução", fr: "Résolution", de: "Auflösung" },
  accuracy: { es: "Exactitud", en: "Accuracy", pt: "Exatidão", fr: "Précision", de: "Genauigkeit" },
  power: { es: "Alimentación", en: "Power supply", pt: "Alimentação", fr: "Alimentation", de: "Stromversorgung" },
  radio: { es: "Banda de radio", en: "Radio band", pt: "Banda de rádio", fr: "Bande radio", de: "Funkband" },
  connectivity: { es: "Conectividad", en: "Connectivity", pt: "Conectividade", fr: "Connectivité", de: "Konnektivität" },
  capacity: { es: "Capacidad", en: "Capacity", pt: "Capacidade", fr: "Capacité", de: "Kapazität" },
  interval: { es: "Intervalo de medición", en: "Measurement interval", pt: "Intervalo de medição", fr: "Intervalle de mesure", de: "Messintervall" },
  operating: { es: "Condiciones de operación", en: "Operating conditions", pt: "Condições de operação", fr: "Conditions de fonctionnement", de: "Betriebsbedingungen" },
  probes: { es: "Sondas", en: "Probes", pt: "Sondas", fr: "Sondes", de: "Fühler" },
  input: { es: "Entrada", en: "Input", pt: "Entrada", fr: "Entrée", de: "Eingang" },
  output: { es: "Salida", en: "Output", pt: "Saída", fr: "Sortie", de: "Ausgang" },
  lifetime: { es: "Vida útil del sensor", en: "Sensor lifetime", pt: "Vida útil do sensor", fr: "Durée de vie du capteur", de: "Sensorlebensdauer" },
  spliceTime: { es: "Tiempo de empalme", en: "Splice time", pt: "Tempo de emenda", fr: "Temps d'épissure", de: "Spleißzeit" },
  loss: { es: "Pérdida típica de empalme", en: "Typical splice loss", pt: "Perda típica de emenda", fr: "Perte d'épissure typique", de: "Typische Spleißdämpfung" },
  alignment: { es: "Método de alineación", en: "Alignment method", pt: "Método de alinhamento", fr: "Méthode d'alignement", de: "Ausrichtungsverfahren" },
  battery: { es: "Batería", en: "Battery", pt: "Bateria", fr: "Batterie", de: "Akku" },
  fibers: { es: "Fibras compatibles", en: "Compatible fibers", pt: "Fibras compatíveis", fr: "Fibres compatibles", de: "Kompatible Fasern" },
  display: { es: "Pantalla", en: "Display", pt: "Tela", fr: "Écran", de: "Display" },
} satisfies Record<string, Localized>;

export const PRODUCTS: Product[] = [
  {
    slug: "gateway-pro",
    name: "Gateway Pro",
    code: "TDSGWP01",
    brand: "Aranet",
    division: "monitoreo-ambiental",
    solutions: ["calidad-aire", "granjas", "horticultura", "cadena-frio"],
    short: {
      es: "Centro de la red inalámbrica de sensores, con pantalla táctil y caché interno.",
      en: "Central hub of the wireless sensor network, with touchscreen and internal cache.",
      pt: "Centro da rede sem fio de sensores, com tela sensível ao toque e cache interno.",
      fr: "Cœur du réseau de capteurs sans fil, avec écran tactile et cache interne.",
      de: "Zentrale des drahtlosen Sensornetzes, mit Touchscreen und internem Zwischenspeicher.",
    },
    description: {
      es: "Dispositivo central de la red inalámbrica de sensores. Recopila los datos de los sensores conectados y los reenvía a la nube o a integraciones locales, garantizando monitoreo continuo en tiempo real. El almacenamiento en caché integrado evita la pérdida de datos ante interrupciones de red y la pantalla táctil permite consultar mediciones y configurar el equipo en sitio.",
      en: "Central device of the wireless sensor network. It collects data from connected sensors and forwards it to the cloud or local integrations, ensuring continuous real-time monitoring. Built-in cache storage prevents data loss during network interruptions and the touchscreen provides on-site readings and configuration.",
      pt: "Dispositivo central da rede sem fio de sensores. Coleta os dados dos sensores conectados e os encaminha à nuvem ou a integrações locais, garantindo monitoramento contínuo em tempo real. O cache interno evita perda de dados em quedas de rede e a tela sensível ao toque permite leitura e configuração no local.",
      fr: "Dispositif central du réseau de capteurs sans fil. Il collecte les données des capteurs connectés et les transmet au cloud ou à des intégrations locales, assurant une supervision continue en temps réel. La mémoire cache intégrée évite les pertes de données lors des coupures réseau et l'écran tactile permet lecture et configuration sur site.",
      de: "Zentrales Gerät des drahtlosen Sensornetzes. Es sammelt die Daten der verbundenen Sensoren und leitet sie an die Cloud oder lokale Integrationen weiter und ermöglicht so eine durchgehende Echtzeitüberwachung. Der integrierte Zwischenspeicher verhindert Datenverlust bei Netzunterbrechungen, der Touchscreen erlaubt Ablesung und Konfiguration vor Ort.",
    },
    specs: [
      { label: L.radio, value: "EU868 / US920 (TDSGWPU1)" },
      { label: L.connectivity, value: "Ethernet RJ45 con PoE 802.3af, Wi-Fi 2.4 GHz (modo cliente), USB-C 2.0" },
      { label: L.capacity, value: "Hasta 100 sensores" },
      { label: L.power, value: "5 VDC, 1 A / PoE 802.3af" },
      { label: L.accuracy, value: "Sensibilidad del receptor: -127 dBm" },
      { label: L.display, value: "Pantalla táctil integrada de gran formato" },
    ],
  },
  {
    slug: "sensor-co2-temperatura",
    name: "CO₂ and Temperature Sensor",
    code: "TDSPC005",
    brand: "Aranet",
    division: "monitoreo-ambiental",
    solutions: ["calidad-aire", "horticultura", "granjas"],
    short: {
      es: "Mide CO₂, temperatura y presión atmosférica con radio Sub-GHz.",
      en: "Measures CO₂, temperature and atmospheric pressure over Sub-GHz radio.",
      pt: "Mede CO₂, temperatura e pressão atmosférica com rádio Sub-GHz.",
      fr: "Mesure le CO₂, la température et la pression atmosphérique via radio Sub-GHz.",
      de: "Misst CO₂, Temperatur und Luftdruck über Sub-GHz-Funk.",
    },
    description: {
      es: "Sensor de la serie PRO que mide concentración de dióxido de carbono, temperatura y presión atmosférica. Incorpora radio Sub-GHz ISM que transmite las mediciones de forma inalámbrica a la estación base PRO, ideal para oficinas, aulas, invernaderos y galpones.",
      en: "PRO series sensor measuring carbon dioxide concentration, temperature and atmospheric pressure. It includes a Sub-GHz ISM radio that wirelessly transmits measurements to the PRO base station — ideal for offices, classrooms, greenhouses and animal houses.",
      pt: "Sensor da série PRO que mede concentração de dióxido de carbono, temperatura e pressão atmosférica. Inclui rádio Sub-GHz ISM que transmite as medições sem fio à estação base PRO, ideal para escritórios, salas de aula, estufas e galpões.",
      fr: "Capteur de la série PRO mesurant la concentration de dioxyde de carbone, la température et la pression atmosphérique. Il intègre une radio Sub-GHz ISM qui transmet les mesures sans fil à la station de base PRO : bureaux, salles de classe, serres et bâtiments d'élevage.",
      de: "Sensor der PRO-Serie zur Messung von Kohlendioxidkonzentration, Temperatur und Luftdruck. Mit Sub-GHz-ISM-Funk zur drahtlosen Übertragung an die PRO-Basisstation – ideal für Büros, Klassenräume, Gewächshäuser und Ställe.",
    },
    specs: [
      { label: L.range, value: "CO₂: 0–9999 ppm" },
      { label: L.resolution, value: "CO₂: 1 ppm" },
      { label: L.accuracy, value: "±(30 ppm + 3 % de la lectura), compensada por presión hasta 750 hPa" },
      { label: L.interval, value: "Constante de tiempo τ: 3 min" },
      { label: L.radio, value: "EU868 / US920 / AS923 / JP923 / KR923 según referencia" },
      { label: L.operating, value: "Exactitud especificada entre 15–35 °C y 0–80 % HR" },
    ],
  },
  {
    slug: "sonda-4xt",
    name: "4xT-Probe Sensor",
    code: "TDSPT508",
    brand: "Aranet",
    division: "monitoreo-ambiental",
    solutions: ["cadena-frio", "granjas"],
    short: {
      es: "Cuatro sondas PT1000 de temperatura en un solo transmisor inalámbrico.",
      en: "Four PT1000 temperature probes in a single wireless transmitter.",
      pt: "Quatro sondas PT1000 de temperatura em um único transmissor sem fio.",
      fr: "Quatre sondes PT1000 de température sur un seul transmetteur sans fil.",
      de: "Vier PT1000-Temperaturfühler an einem drahtlosen Transmitter.",
    },
    description: {
      es: "Mide temperatura simultáneamente con cuatro termómetros de resistencia de platino. Las cuatro sondas cableadas facilitan la instalación en múltiples puntos, por ejemplo a lo largo de tuberías en salas de calderas o mecánicas, cavas y cámaras frigoríficas. Pertenece a la serie PRO con radio Sub-GHz ISM.",
      en: "Measures temperature simultaneously with four platinum resistance thermometers. The four cabled probes ease installation across multiple points — pipelines in boiler or mechanical rooms, cold rooms and refrigerated chambers. PRO series with Sub-GHz ISM radio.",
      pt: "Mede temperatura simultaneamente com quatro termômetros de resistência de platina. As quatro sondas cabeadas facilitam a instalação em vários pontos: tubulações em casas de máquinas, câmaras frias e refrigeradas. Série PRO com rádio Sub-GHz ISM.",
      fr: "Mesure la température simultanément avec quatre thermomètres à résistance de platine. Les quatre sondes câblées facilitent l'installation sur plusieurs points : canalisations en chaufferie, chambres froides et enceintes réfrigérées. Série PRO avec radio Sub-GHz ISM.",
      de: "Misst die Temperatur gleichzeitig mit vier Platin-Widerstandsthermometern. Die vier Kabelfühler erleichtern die Installation an mehreren Punkten – Rohrleitungen in Kessel- oder Technikräumen, Kühlräume und Kühlkammern. PRO-Serie mit Sub-GHz-ISM-Funk.",
    },
    specs: [
      { label: L.probes, value: "4 × PT1000 de 2 hilos (cualquier clase)" },
      { label: L.range, value: "-200 a 600 °C (-328 a 1112 °F)" },
      { label: L.resolution, value: "0,1 °C / 0,1 °F" },
      { label: L.accuracy, value: "±0,3 °C a 0 °C (±0,5 °F a 32 °F)" },
      { label: L.radio, value: "EU868 / US920 / AS923 según referencia" },
    ],
  },
  {
    slug: "transmisor-0-10v",
    name: "0-10 V Transmitter with 24 VDC PSU",
    code: "TDSVT202",
    brand: "Aranet",
    division: "monitoreo-ambiental",
    solutions: ["granjas", "horticultura"],
    short: {
      es: "Integra sensores de terceros con salida analógica 0-10 V a la red inalámbrica.",
      en: "Brings third-party 0-10 V analog sensors into the wireless network.",
      pt: "Integra sensores de terceiros com saída analógica 0-10 V à rede sem fio.",
      fr: "Intègre les capteurs tiers à sortie analogique 0-10 V au réseau sans fil.",
      de: "Bindet Fremdsensoren mit 0-10-V-Analogausgang in das Funknetz ein.",
    },
    description: {
      es: "Mide la señal analógica de un sensor de terceros y suministra 24 VDC a dicho sensor mediante su fuente integrada. Es la pieza que permite llevar sensores industriales —como el sensor de amoníaco DOL 53— a la red inalámbrica de monitoreo. Serie PRO con radio Sub-GHz ISM.",
      en: "Measures the analog signal of a third-party sensor and powers it with 24 VDC through its built-in PSU. It is the piece that brings industrial sensors — such as the DOL 53 ammonia sensor — into the wireless monitoring network. PRO series with Sub-GHz ISM radio.",
      pt: "Mede o sinal analógico de um sensor de terceiros e o alimenta com 24 VDC pela fonte integrada. É a peça que leva sensores industriais — como o sensor de amônia DOL 53 — à rede sem fio de monitoramento. Série PRO com rádio Sub-GHz ISM.",
      fr: "Mesure le signal analogique d'un capteur tiers et l'alimente en 24 VDC via son bloc intégré. C'est l'élément qui intègre des capteurs industriels — comme le capteur d'ammoniac DOL 53 — au réseau de supervision sans fil. Série PRO avec radio Sub-GHz ISM.",
      de: "Misst das Analogsignal eines Fremdsensors und versorgt diesen über das integrierte Netzteil mit 24 VDC. Damit lassen sich Industriesensoren – etwa der Ammoniaksensor DOL 53 – in das drahtlose Überwachungsnetz einbinden. PRO-Serie mit Sub-GHz-ISM-Funk.",
    },
    specs: [
      { label: L.input, value: "Señal analógica 0–10 V de sensor de terceros" },
      { label: L.output, value: "Fuente integrada de 24 VDC para el sensor conectado" },
      { label: L.radio, value: "EU868 / US920 / AS923 / JP923 según referencia" },
      { label: L.connectivity, value: "Transmisión inalámbrica a la estación base PRO" },
    ],
  },
  {
    slug: "sensor-amoniaco-dol-53",
    name: "DOL 53 – Sensor de amoníaco",
    code: "DOL 53",
    brand: "dol-sensors",
    division: "instrumentacion",
    solutions: ["granjas"],
    short: {
      es: "Sensor electroquímico de NH₃ para galpones de aves y cerdos.",
      en: "Electrochemical NH₃ sensor for poultry and swine houses.",
      pt: "Sensor eletroquímico de NH₃ para galpões de aves e suínos.",
      fr: "Capteur électrochimique de NH₃ pour bâtiments avicoles et porcins.",
      de: "Elektrochemischer NH₃-Sensor für Geflügel- und Schweineställe.",
    },
    description: {
      es: "El DOL 53 está formado por un sensor electroquímico de difusión y electrónica de procesamiento de señal: funciona como una «nariz» y transmite la concentración de amoníaco medida en el punto de instalación. Se utiliza para la monitorización estacionaria y continua de amoníaco en el aire ambiente bajo condiciones atmosféricas, y se conecta a una unidad de control mediante cable de 3 hilos.",
      en: "The DOL 53 combines an electrochemical diffusion sensor with signal-processing electronics: it works like a \"nose\" and transmits the ammonia concentration measured at the sensor. It is used for stationary, continuous monitoring of ammonia in ambient air under atmospheric conditions, connected to a control unit over a 3-wire cable.",
      pt: "O DOL 53 combina um sensor eletroquímico de difusão com eletrônica de processamento de sinal: funciona como um \"nariz\" e transmite a concentração de amônia medida no ponto de instalação. É usado no monitoramento estacionário e contínuo de amônia no ar ambiente, conectado a uma unidade de controle por cabo de 3 fios.",
      fr: "Le DOL 53 associe un capteur électrochimique à diffusion et une électronique de traitement du signal : il fonctionne comme un « nez » et transmet la concentration d'ammoniac mesurée au point d'installation. Il assure la surveillance stationnaire et continue de l'ammoniac dans l'air ambiant, relié à une unité de contrôle par câble 3 fils.",
      de: "Der DOL 53 verbindet einen elektrochemischen Diffusionssensor mit Signalverarbeitungselektronik: Er arbeitet wie eine „Nase\" und überträgt die am Sensor gemessene Ammoniakkonzentration. Er dient der stationären, kontinuierlichen Überwachung von Ammoniak in der Umgebungsluft und wird über ein 3-adriges Kabel an eine Steuereinheit angeschlossen.",
    },
    specs: [
      { label: L.output, value: "0–10 V (señal de medición en operación normal)" },
      { label: L.connectivity, value: "Cable de 3 hilos hacia unidad de control" },
      { label: L.operating, value: "Monitorización estacionaria continua en aire ambiente" },
      { label: L.lifetime, value: "Sensor electroquímico reemplazable" },
    ],
  },
  {
    slug: "fujikura-96s",
    name: "Empalmadora de fusión Fujikura 96S",
    code: "96S",
    brand: "Fujikura",
    division: "fibra-optica",
    solutions: [],
    short: {
      es: "Empalmadora de fusión por alineación de núcleo para redes ópticas.",
      en: "Core-alignment fusion splicer for optical networks.",
      pt: "Máquina de fusão com alinhamento de núcleo para redes ópticas.",
      fr: "Soudeuse à alignement de cœur pour réseaux optiques.",
      de: "Kernausrichtender Fusionsspleißer für optische Netze.",
    },
    description: {
      es: "Empalmadora de fusión de alineación por núcleo diseñada para trabajo intensivo en campo: carcasa reforzada resistente a golpes, polvo y lluvia, hornos de termocontracción de alta velocidad y batería de larga duración. Orientada a instalación y mantenimiento de redes FTTx, troncales y enlaces metropolitanos.",
      en: "Core-alignment fusion splicer built for intensive field work: reinforced housing resistant to shock, dust and rain, high-speed heat-shrink ovens and long-life battery. Aimed at installing and maintaining FTTx networks, backbones and metropolitan links.",
      pt: "Máquina de fusão com alinhamento de núcleo para trabalho intensivo em campo: carcaça reforçada resistente a impacto, poeira e chuva, fornos de termorretração de alta velocidade e bateria de longa duração. Voltada à instalação e manutenção de redes FTTx, backbones e enlaces metropolitanos.",
      fr: "Soudeuse à alignement de cœur conçue pour un usage intensif sur le terrain : boîtier renforcé résistant aux chocs, à la poussière et à la pluie, fours de rétreint rapides et batterie longue durée. Destinée à l'installation et à la maintenance des réseaux FTTx, dorsales et liaisons métropolitaines.",
      de: "Kernausrichtender Fusionsspleißer für den intensiven Feldeinsatz: verstärktes Gehäuse gegen Stoß, Staub und Regen, schnelle Schrumpfschlauchöfen und langlebiger Akku. Für Installation und Wartung von FTTx-Netzen, Backbones und Metro-Strecken.",
    },
    specs: [
      { label: L.alignment, value: "Alineación activa por núcleo (core alignment)" },
      { label: L.fibers, value: "SM, MM, DS, NZDS y fibras de dispersión desplazada" },
      { label: L.loss, value: "0,02 dB (SM) típica" },
      { label: L.spliceTime, value: "Empalme y termocontracción de alta velocidad" },
      { label: L.battery, value: "Batería de ion-litio de alta autonomía en campo" },
    ],
  },
];

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
