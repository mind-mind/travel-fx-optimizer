export type WeatherType = "cool" | "mild" | "warm";

export interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  description: string;
  /** Localized descriptions keyed by lang code (falls back to `description` if missing) */
  descriptions?: Partial<Record<string, string>>;
  /** Average temperature (°C) per month — index 0 = January, 11 = December */
  avgTempByMonth: number[];
  flightPriceEstimate: string;
  /** Best month indices (0-based) to visit */
  bestMonths: number[];
  tags: string[];
  currency: string;
  countryCode: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "japan",
    name: "Japan",
    city: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    description:
      "Cherry blossoms, ancient temples, and world-class food. Tokyo blends ultramodern with timeless culture.",
    descriptions: {
      th: "ดอกซากุระ วัดโบราณ และร้านอาหารระดับโลก โตเกียวผสมผสานความทันสมัยสุดขีดกับวัฒนธรรมอันเก่าแก่ได้อย่างลงตัว",
      es: "Flores de cerezo, templos milenarios y gastronomía de clase mundial. Tokio fusiona perfectamente lo ultramoderno con la cultura atemporal.",
      zh: "樱花、古老寺庙与世界级美食。东京将超现代与永恒文化完美融合。",
      ja: "桜、古寺、そして世界屈指のグルメ。東京は超現代的な都市と永遠の文化が融合した場所です。",
      ko: "벚꽃, 고대 사원, 세계 최고의 음식. 도쿄는 초현대적 도시와 시간을 초월한 문화가 어우러진 곳입니다.",
    },
    avgTempByMonth: [4, 5, 9, 15, 19, 23, 27, 29, 25, 19, 13, 7],
    flightPriceEstimate: "$600–$1,200",
    bestMonths: [2, 3, 9, 10],
    tags: ["culture", "food", "temples"],
    currency: "JPY",
    countryCode: "JP",
  },
  {
    id: "south-korea",
    name: "South Korea",
    city: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    description:
      "K-pop culture, ancient palaces, vibrant street food markets, and cutting-edge city vibes.",
    descriptions: {
      th: "วัฒนธรรม K-pop พระราชวังโบราณ ตลาดอาหารข้างทางที่คึกคัก และบรรยากาศเมืองล้ำยุค",
      es: "Cultura K-pop, palacios ancestrales, vibrantes mercados de comida callejera y una energía urbana de vanguardia.",
      zh: "K-pop文化、古代宫殿、热闹的街头美食市场，以及充满活力的现代都市氛围。",
      ja: "K-POPカルチャー、古代の宮殿、活気ある屋台グルメ、そして最先端の都市の雰囲気。",
      ko: "K-팝 문화, 고대 궁궐, 활기찬 길거리 음식 시장, 그리고 최첨단 도시 분위기.",
    },
    avgTempByMonth: [0, 2, 7, 14, 19, 23, 27, 28, 23, 17, 10, 3],
    flightPriceEstimate: "$500–$1,000",
    bestMonths: [3, 4, 8, 9],
    tags: ["culture", "food", "shopping"],
    currency: "KRW",
    countryCode: "KR",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    city: "Zurich / Alps",
    country: "Switzerland",
    flag: "🇨🇭",
    description:
      "Stunning Alpine scenery, world-class skiing in winter, and breathtaking scenic train journeys.",
    descriptions: {
      th: "ทิวทัศน์แอลป์อันงดงาม สกีฤดูหนาวระดับโลก และทริปรถไฟชมวิวที่หยุดหายใจ",
      es: "Espectaculares paisajes alpinos, esquí de clase mundial en invierno y fascinantes travesías en tren escénico.",
      zh: "壮丽的阿尔卑斯山风光、世界一流的冬季滑雪，以及令人叹为观止的风景火车之旅。",
      ja: "壮大なアルプスの絶景、世界クラスのウィンタースキー、そして息を飲む絶景列車の旅。",
      ko: "장엄한 알프스 경치, 세계 수준의 겨울 스키, 그리고 숨막히는 절경의 기차 여행.",
    },
    avgTempByMonth: [0, 1, 5, 10, 14, 18, 21, 20, 16, 11, 5, 1],
    flightPriceEstimate: "$700–$1,400",
    bestMonths: [5, 6, 7, 11],
    tags: ["mountains", "skiing", "nature"],
    currency: "CHF",
    countryCode: "CH",
  },
  {
    id: "norway",
    name: "Norway",
    city: "Oslo / Tromsø",
    country: "Norway",
    flag: "🇳🇴",
    description:
      "Witness the Northern Lights in winter or the midnight sun in summer among epic Nordic fjords.",
    descriptions: {
      th: "ชมแสงเหนือในฤดูหนาวหรือดวงอาทิตย์เที่ยงคืนในฤดูร้อนท่ามกลางฟยอร์ดนอร์ดิกอันงดงาม",
      es: "Contempla la aurora boreal en invierno o el sol de medianoche en verano entre los épicos fiordos nórdicos.",
      zh: "在冬季欣赏北极光，或在夏季感受午夜阳光，背景是壮阔的北欧峡湾。",
      ja: "冬はオーロラ、夏は白夜を、壮大な北欧フィヨルドの中で体験しましょう。",
      ko: "겨울에는 오로라를, 여름에는 백야를, 장엄한 북유럽 피오르드 속에서 경험하세요.",
    },
    avgTempByMonth: [-4, -4, -1, 5, 11, 16, 19, 18, 13, 7, 2, -2],
    flightPriceEstimate: "$600–$1,300",
    bestMonths: [5, 6, 7, 11],
    tags: ["fjords", "northern lights", "hiking"],
    currency: "NOK",
    countryCode: "NO",
  },
  {
    id: "thailand",
    name: "Thailand",
    city: "Bangkok / Chiang Mai",
    country: "Thailand",
    flag: "🇹🇭",
    description:
      "Tropical beaches, ornate temples, sizzling street food, and affordable luxury await in the Land of Smiles.",
    descriptions: {
      th: "ชายหาดเขตร้อน วัดวาอาราม อาหารข้างทางสุดเด็ด และความหรูหราราคาย่อมเยา รอต้อนรับในดินแดนยิ้มสยาม",
      es: "Playas tropicales, ornamentados templos, comida callejera inigualable y lujo asequible en la Tierra de las Sonrisas.",
      zh: "热带海滩、华丽寺庙、令人垂涎的街头美食，以及实惠的奢华体验，欢迎来到微笑之国。",
      ja: "トロピカルビーチ、荘厳な寺院、絶品ストリートフード、そして手が届くラグジュアリー体験が待つ「ほほえみの国」。",
      ko: "열대 해변, 화려한 사원, 맛있는 길거리 음식, 합리적인 럭셔리가 기다리는 '미소의 나라'.",
    },
    avgTempByMonth: [26, 28, 30, 32, 32, 31, 30, 30, 29, 28, 27, 26],
    flightPriceEstimate: "$400–$900",
    bestMonths: [10, 11, 0, 1],
    tags: ["beach", "temples", "food"],
    currency: "THB",
    countryCode: "TH",
  },
  {
    id: "bali",
    name: "Bali",
    city: "Ubud / Seminyak",
    country: "Indonesia",
    flag: "🇮🇩",
    description:
      "Lush rice terraces, surf beaches, Hindu temples, and a thriving wellness scene on the Island of the Gods.",
    descriptions: {
      th: "ขั้นบันไดนาสีเขียวชอุ่ม ชายหาดเซิร์ฟ วัดฮินดู และวัฒนธรรมสุขภาพที่เฟื่องฟูบนเกาะแห่งพระเจ้า",
      es: "Exuberantes arrozales en terrazas, playas para surfear, templos hindúes y una próspera escena de bienestar en la Isla de los Dioses.",
      zh: "郁郁葱葱的梯田、冲浪海滩、印度教神庙，以及在神之岛蓬勃发展的健康文化。",
      ja: "緑豊かな棚田、サーフビーチ、ヒンドゥー寺院、そして「神々の島」で花開くウェルネスカルチャー。",
      ko: "초록빛 계단식 논, 서핑 해변, 힌두 사원, 그리고 '신들의 섬'에서 꽃피는 웰니스 문화.",
    },
    avgTempByMonth: [27, 27, 27, 28, 28, 27, 27, 27, 27, 28, 28, 27],
    flightPriceEstimate: "$500–$1,000",
    bestMonths: [6, 7, 8],
    tags: ["beach", "surfing", "spiritual"],
    currency: "IDR",
    countryCode: "ID",
  },
  {
    id: "mexico",
    name: "Mexico",
    city: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    description:
      "Rich Aztec history, world-famous cuisine, colorful neighborhoods, and one of the world's great capital cities.",
    descriptions: {
      th: "ประวัติศาสตร์อันยิ่งใหญ่ของแอซเท็ก อาหารชื่อดังระดับโลก ย่านสีสันสดใส และหนึ่งในเมืองหลวงที่ยิ่งใหญ่ที่สุดในโลก",
      es: "Rica historia azteca, gastronomía mundialmente famosa, coloridos barrios y una de las grandes capitales del mundo.",
      zh: "丰富的阿兹特克历史、享誉全球的美食、色彩斑斓的街区，以及世界最伟大的首都之一。",
      ja: "豊かなアステカの歴史、世界的に有名なグルメ、カラフルな街並み、そして世界屈指の首都。",
      ko: "풍부한 아즈텍 역사, 세계적으로 유명한 음식, 다채로운 街区, 그리고 세계 최고의 수도 중 하나.",
    },
    avgTempByMonth: [14, 16, 19, 21, 22, 20, 18, 19, 18, 17, 16, 14],
    flightPriceEstimate: "$250–$600",
    bestMonths: [2, 3, 4, 10, 11],
    tags: ["history", "food", "culture"],
    currency: "MXN",
    countryCode: "MX",
  },
  {
    id: "greece",
    name: "Greece",
    city: "Athens / Santorini",
    country: "Greece",
    flag: "🇬🇷",
    description:
      "Ancient ruins, whitewashed villages, crystal-clear Aegean waters, and magnificent Mediterranean cuisine.",
    descriptions: {
      th: "ซากปรักหักพังโบราณ หมู่บ้านขาวโพลน น้ำทะเลอีเจียนใสคริสตัล และอาหารเมดิเตอร์เรเนียนสุดอร่อย",
      es: "Ruinas antiguas, pueblos encalados, las cristalinas aguas del Egeo y una magnífica gastronomía mediterránea.",
      zh: "古代遗迹、白色粉刷的村庄、清澈的爱琴海，以及壮丽的地中海美食。",
      ja: "古代遺跡、白壁の村、透き通るエーゲ海、そして素晴らしい地中海料理。",
      ko: "고대 유적, 하얀 마을, 맑은 에게해, 그리고 훌륭한 지중해 요리.",
    },
    avgTempByMonth: [10, 11, 13, 17, 22, 27, 32, 32, 28, 23, 16, 12],
    flightPriceEstimate: "$500–$1,100",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "beach", "islands"],
    currency: "EUR",
    countryCode: "GR",
  },
  {
    id: "italy",
    name: "Italy",
    city: "Rome / Florence",
    country: "Italy",
    flag: "🇮🇹",
    description:
      "Timeless art, iconic cuisine, romantic cities, and ancient history waiting around every corner.",
    descriptions: {
      th: "ศิลปะอมตะ อาหารสุดไอคอนิก เมืองโรแมนติก และประวัติศาสตร์โบราณรอคุณค้นพบทุกหัวมุม",
      es: "Arte eterno, gastronomía icónica, ciudades románticas e historia antigua esperando en cada esquina.",
      zh: "永恒的艺术、标志性的美食、浪漫的城市，以及在每个角落等待您发现的古老历史。",
      ja: "時を超えたアート、アイコニックな料理、ロマンティックな街並み、そして至る所に宿る古代の歴史。",
      ko: "시간을 초월한 예술, 아이코닉한 요리, 낭만적인 도시들, 그리고 모든 골목마다 기다리는 고대 역사.",
    },
    avgTempByMonth: [8, 9, 12, 16, 21, 26, 30, 30, 26, 20, 14, 9],
    flightPriceEstimate: "$500–$1,000",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "food", "art"],
    currency: "EUR",
    countryCode: "IT",
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    city: "Hong Kong",
    country: "Hong Kong",
    flag: "🇭🇰",
    description:
      "A dazzling skyline, world-class dim sum, night markets, and a unique blend of East-meets-West energy unlike anywhere else.",
    descriptions: {
      th: "เส้นขอบฟ้าที่สว่างไสว ติ่มซำระดับโลก ตลาดกลางคืน และพลังผสมผสานตะวันออก-ตะวันตกที่หาที่ไหนไม่ได้",
      es: "Un deslumbrante skyline, dim sum de clase mundial, mercados nocturnos y una fusión única de energía Oriente-Occidente.",
      zh: "璀璨的天际线、世界级点心、夜市，以及独一无二的东西方文化交融活力。",
      ja: "輝くスカイライン、世界クラスの飲茶、ナイトマーケット、そして唯一無二の東西融合のエネルギー。",
      ko: "찬란한 스카이라인, 세계적 딤섬, 야시장, 그리고 어디서도 볼 수 없는 동서양 융합의 에너지.",
    },
    avgTempByMonth: [17, 17, 19, 23, 27, 29, 31, 31, 29, 26, 22, 19],
    flightPriceEstimate: "$450–$1,000",
    bestMonths: [9, 10, 11, 0],
    tags: ["food", "shopping", "city"],
    currency: "HKD",
    countryCode: "HK",
  },
  {
    id: "taiwan",
    name: "Taiwan",
    city: "Taipei",
    country: "Taiwan",
    flag: "🇹🇼",
    description:
      "Night markets overflowing with street food, dramatic mountain scenery, hot springs, and a famously welcoming culture.",
    descriptions: {
      th: "ตลาดกลางคืนที่เต็มไปด้วยอาหารข้างทาง ภูมิทัศน์ภูเขาสุดตระการตา น้ำพุร้อน และวัฒนธรรมที่ยินดีต้อนรับสุดๆ",
      es: "Mercados nocturnos rebosantes de comida callejera, dramáticos paisajes montañosos, aguas termales y una cultura de bienvenida sin igual.",
      zh: "夜市美食、壮丽山景、温泉，以及以热情好客著称的文化。",
      ja: "屋台で溢れる夜市、ドラマチックな山岳風景、温泉、そして人情溢れる温かい文化。",
      ko: "길거리 음식이 가득한 야시장, 극적인 산악 경치, 온천, 그리고 따뜻한 환영 문화.",
    },
    avgTempByMonth: [16, 16, 18, 22, 26, 29, 31, 31, 28, 25, 22, 18],
    flightPriceEstimate: "$400–$900",
    bestMonths: [9, 10, 11, 2],
    tags: ["food", "nature", "culture"],
    currency: "TWD",
    countryCode: "TW",
  },
  {
    id: "china",
    name: "China",
    city: "Beijing / Shanghai",
    country: "China",
    flag: "🇨🇳",
    description:
      "The Great Wall, the Forbidden City, futuristic Shanghai, and ancient traditions spanning thousands of years — all in one vast country.",
    descriptions: {
      th: "กำแพงเมืองจีน พระราชวังต้องห้าม เซี่ยงไฮ้แห่งอนาคต และประเพณีโบราณนับพันปี รวมอยู่ในประเทศเดียว",
      es: "La Gran Muralla, la Ciudad Prohibida, el futurista Shanghái y tradiciones milenarias — todo en un vasto país.",
      zh: "长城、故宫、未来感十足的上海，以及跨越数千年的古老传统——全都在这片广袤的土地上。",
      ja: "万里の長城、故宮、未来都市上海、そして数千年の古代文明——すべてが一つの広大な国に。",
      ko: "만리장성, 자금성, 미래적인 상하이, 수천 년의 고대 전통—모두 하나의 광활한 나라에.",
    },
    avgTempByMonth: [-3, 0, 7, 15, 21, 26, 29, 28, 22, 15, 7, 0],
    flightPriceEstimate: "$500–$1,100",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "culture", "food"],
    currency: "CNY",
    countryCode: "CN",
  },

  // ── Southeast Asia ────────────────────────────────────────────────────────
  {
    id: "singapore",
    name: "Singapore",
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    description:
      "A gleaming city-state of futuristic architecture, world-class hawker food, lush gardens, and impeccable infrastructure.",
    descriptions: {
      th: "นครรัฐที่สุกสว่าง สถาปัตยกรรมล้ำอนาคต อาหารฮอว์กเกอร์ระดับโลก สวนเขียวขจี และโครงสร้างพื้นฐานระดับเยี่ยม",
      es: "Una brillante ciudad-estado con arquitectura futurista, comida hawker de clase mundial, exuberantes jardines e infraestructura impecable.",
      zh: "闪耀的城市国家，拥有未来主义建筑、世界级小贩美食、郁郁葱葱的花园和无与伦比的基础设施。",
      ja: "輝くシティ・ステート、未来的な建築、世界クラスのホーカーフード、緑豊かな庭園、そして卓越したインフラ。",
      ko: "빛나는 도시 국가, 미래적 건축, 세계적 호커 푸드, 푸른 정원, 그리고 탁월한 인프라.",
    },
    avgTempByMonth: [27, 27, 28, 28, 29, 29, 28, 28, 28, 28, 27, 27],
    flightPriceEstimate: "$400–$900",
    bestMonths: [1, 2, 6, 7],
    tags: ["food", "city", "shopping"],
    currency: "SGD",
    countryCode: "SG",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    city: "Hanoi / Ho Chi Minh City",
    country: "Vietnam",
    flag: "🇻🇳",
    description:
      "Glowing lantern towns, emerald Halong Bay limestone karsts, French-influenced cuisine, and one of Asia's most scenic train routes.",
    descriptions: {
      th: "เมืองโคมไฟ อ่าวฮาลองที่เต็มไปด้วยเพิงหินปูน อาหารที่ได้อิทธิพลฝรั่งเศส และเส้นทางรถไฟที่งดงามที่สุดในเอเชีย",
      es: "Ciudades de linternas brillantes, calizos esmeraldas de la Bahía de Ha Long, cocina con influencia francesa y una de las rutas de tren más escénicas de Asia.",
      zh: "发光的灯笼小镇、翡翠色的下龙湾石灰岩、法式风味美食，以及亚洲最美的火车路线之一。",
      ja: "輝くランタンの街、翡翠色のハロン湾の石灰岩、フランス料理の影響を受けたグルメ、そしてアジア屈指の絶景鉄道ルート。",
      ko: "빛나는 등불 마을, 에메랄드빛 하롱베이 석회암, 프랑스 영향의 음식 문화, 그리고 아시아에서 가장 아름다운 기차 노선.",
    },
    avgTempByMonth: [17, 18, 21, 25, 28, 29, 29, 29, 28, 25, 22, 19],
    flightPriceEstimate: "$350–$850",
    bestMonths: [1, 2, 10, 11],
    tags: ["nature", "food", "culture"],
    currency: "VND",
    countryCode: "VN",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    city: "Kuala Lumpur / Penang",
    country: "Malaysia",
    flag: "🇲🇾",
    description:
      "Petronas Towers, multicultural street food, pristine rainforests, and colonial Penang's UNESCO heritage quarter.",
    descriptions: {
      th: "ตึกแฝดปิโตรนาส อาหารหลายวัฒนธรรม ป่าดิบชื้นบริสุทธิ์ และย่านมรดกโลก UNESCO ของปีนัง",
      es: "Las Torres Petronas, la multicultural oferta gastronómica, impenetrables selvas tropicales y el barrio patrimonial colonial de Penang.",
      zh: "双子塔、多元文化街头美食、原始热带雨林，以及槟城的联合国教科文组织殖民地遗产街区。",
      ja: "ペトロナスタワー、多文化ストリートフード、手つかずの熱帯雨林、そしてペナンのユネスコ世界遺産の植民地街区。",
      ko: "페트로나스 타워, 다문화 길거리 음식, 원시 열대우림, 그리고 페낭의 유네스코 식민지 유산 지구.",
    },
    avgTempByMonth: [27, 28, 28, 29, 29, 28, 28, 28, 28, 28, 27, 27],
    flightPriceEstimate: "$350–$800",
    bestMonths: [5, 6, 7, 1, 2],
    tags: ["food", "nature", "culture"],
    currency: "MYR",
    countryCode: "MY",
  },
  {
    id: "philippines",
    name: "Philippines",
    city: "Manila / Palawan",
    country: "Philippines",
    flag: "🇵🇭",
    description:
      "Over 7,000 islands of powder-white beaches, turquoise lagoons, vibrant coral reefs, and warm Filipino hospitality.",
    descriptions: {
      th: "หมู่เกาะกว่า 7,000 เกาะ มีชายหาดทรายขาวละเอียด ทะเลสาบสีฟ้า แนวปะการังสีสัน และน้ำใจไมตรีของชาวฟิลิปปินส์",
      es: "Más de 7.000 islas de playas de arena blanca, lagunas turquesas, arrecifes de coral vibrantes y la cálida hospitalidad filipina.",
      zh: "7000多个岛屿，拥有白色沙滩、碧绿泻湖、缤纷珊瑚礁，以及热情的菲律宾款待。",
      ja: "7,000以上の島々、パウダーホワイトのビーチ、ターコイズブルーのラグーン、鮮やかなサンゴ礁、そして温かいフィリピンのおもてなし。",
      ko: "7,000개 이상의 섬, 새하얀 모래사장, 청록색 석호, 화려한 산호초, 그리고 따뜻한 필리핀의 환대.",
    },
    avgTempByMonth: [26, 27, 28, 29, 30, 29, 28, 28, 28, 28, 27, 26],
    flightPriceEstimate: "$400–$900",
    bestMonths: [11, 0, 1, 2],
    tags: ["beach", "diving", "islands"],
    currency: "PHP",
    countryCode: "PH",
  },
  {
    id: "india",
    name: "India",
    city: "Delhi / Rajasthan",
    country: "India",
    flag: "🇮🇳",
    description:
      "The Taj Mahal, Rajasthan's golden forts, Holi's riot of colour, Kerala's backwaters, and an overwhelming, unforgettable sensory experience.",
    descriptions: {
      th: "ทัชมาฮาล ป้อมปราการสีทองแห่งรัฐราชสถาน เทศกาลโฮลี ตาล backwaters ของเกรละ และประสบการณ์ทางผัสสะที่ยากจะลืมเลือน",
      es: "El Taj Mahal, los fuertes dorados de Rajastán, el Holi, los remansos de Kerala y una experiencia sensorial abrumadora e inolvidable.",
      zh: "泰姬陵、拉贾斯坦邦的金色堡垒、胡里节、喀拉拉邦的内河水道，以及令人难忘的感官盛宴。",
      ja: "タージ・マハル、ラジャスタンの黄金の砦、ホーリー祭、ケーララのバックウォーター、そして圧倒的な感覚体験。",
      ko: "타지마할, 라자스탄의 황금 요새, 홀리 축제, 케랄라의 수로, 그리고 압도적인 감각 경험.",
    },
    avgTempByMonth: [15, 17, 22, 29, 34, 34, 31, 29, 29, 26, 20, 16],
    flightPriceEstimate: "$450–$1,000",
    bestMonths: [9, 10, 11, 0, 1],
    tags: ["history", "culture", "temples"],
    currency: "INR",
    countryCode: "IN",
  },

  // ── Middle East ───────────────────────────────────────────────────────────
  {
    id: "uae",
    name: "UAE (Dubai)",
    city: "Dubai / Abu Dhabi",
    country: "UAE",
    flag: "🇦🇪",
    description:
      "Record-breaking skyscrapers, desert safaris, luxury shopping, and a Formula 1 race under the night sky.",
    descriptions: {
      th: "ตึกระฟ้าสถิติโลก การท่องทะเลทราย การช้อปปิ้งสุดหรู และการแข่ง F1 ใต้ท้องฟ้ายามค่ำคืน",
      es: "Rascacielos récord, safaris en el desierto, compras de lujo y una carrera de F1 bajo el cielo nocturno.",
      zh: "打破记录的摩天大楼、沙漠徒步、奢华购物，以及夜空下的F1赛车。",
      ja: "記録的な高層ビル、砂漠サファリ、豪華ショッピング、そして夜空の下でのF1レース。",
      ko: "기록적인 마천루, 사막 사파리, 럭셔리 쇼핑, 그리고 야간 F1 레이스.",
    },
    avgTempByMonth: [19, 20, 23, 27, 32, 34, 36, 37, 34, 30, 25, 21],
    flightPriceEstimate: "$400–$900",
    bestMonths: [10, 11, 0, 1, 2],
    tags: ["luxury", "shopping", "desert"],
    currency: "AED",
    countryCode: "AE",
  },
  {
    id: "turkey",
    name: "Turkey",
    city: "Istanbul / Cappadocia",
    country: "Turkey",
    flag: "🇹🇷",
    description:
      "Hot air balloons over Cappadocia's fairy chimneys, the magnificent Hagia Sophia, Turkish baths, and some of the world's finest cuisine.",
    descriptions: {
      th: "บอลลูนลมร้อนเหนือปล่องไฟนางฟ้าของคัปปาโดเกีย ฮาเกียโซเฟียอันยิ่งใหญ่ ห้องอบไอน้ำตุรกี และอาหารสุดยอดระดับโลก",
      es: "Globos de aire caliente sobre las chimeneas de hadas de Capadocia, la magnífica Hagia Sophia, baños turcos y una gastronomía de primer nivel mundial.",
      zh: "热气球飘过卡帕多西亚的仙女烟囱，宏伟的圣索菲亚大教堂，土耳其浴室，以及世界顶级美食。",
      ja: "カッパドキアの奇岩の上を舞う熱気球、壮大なアヤソフィア、ハマム、そして世界トップクラスのグルメ。",
      ko: "카파도키아 요정 굴뚝 위의 열기구, 장엄한 아야소피아, 터키식 목욕탕, 그리고 세계 최고의 요리.",
    },
    avgTempByMonth: [6, 7, 9, 14, 19, 24, 27, 27, 23, 18, 12, 8],
    flightPriceEstimate: "$350–$800",
    bestMonths: [3, 4, 8, 9],
    tags: ["history", "culture", "food"],
    currency: "TRY",
    countryCode: "TR",
  },

  // ── Europe ────────────────────────────────────────────────────────────────
  {
    id: "france",
    name: "France",
    city: "Paris / Provence",
    country: "France",
    flag: "🇫🇷",
    description:
      "The Eiffel Tower, world-class museums, lavender fields, Michelin-starred dining, and the most-visited country on Earth for a reason.",
    descriptions: {
      th: "หอไอเฟล พิพิธภัณฑ์ระดับโลก ทุ่งลาเวนเดอร์ อาหารมิชลิน และประเทศที่นักท่องเที่ยวเยือนมากที่สุดในโลก",
      es: "La Torre Eiffel, museos de clase mundial, campos de lavanda, restaurantes con estrellas Michelin y el país más visitado del mundo por una razón.",
      zh: "埃菲尔铁塔、世界级博物馆、薰衣草田、米其林星级餐厅，以及全球参观人数最多的国家，实至名归。",
      ja: "エッフェル塔、世界クラスの美術館、ラベンダー畑、ミシュランの星付きレストラン、そして世界で最も多くの観光客を迎える国。",
      ko: "에펠탑, 세계적 박물관, 라벤더 밭, 미슐랭 레스토랑, 그리고 세계에서 가장 많은 관광객이 찾는 나라.",
    },
    avgTempByMonth: [5, 6, 9, 13, 17, 21, 23, 23, 19, 15, 9, 6],
    flightPriceEstimate: "$450–$1,000",
    bestMonths: [3, 4, 5, 8, 9],
    tags: ["art", "food", "romance"],
    currency: "EUR",
    countryCode: "FR",
  },
  {
    id: "spain",
    name: "Spain",
    city: "Barcelona / Madrid",
    country: "Spain",
    flag: "🇪🇸",
    description:
      "Gaudí's surreal architecture, flamenco, world-famous tapas, La Tomatina, and long sun-drenched evenings on the Mediterranean.",
    descriptions: {
      th: "สถาปัตยกรรมเหนือจริงของเกาดี ฟลาเมนโก ทาปาสขึ้นชื่อ เทศกาลปาโตมาโต และค่ำคืนยาวนานริมทะเลเมดิเตอร์เรเนียน",
      es: "La surrealista arquitectura de Gaudí, flamenco, las tapas más famosas, la Tomatina y largas noches de verano en el Mediterráneo.",
      zh: "高迪的超现实建筑、弗拉门戈、世界知名的塔帕斯、番茄节，以及漫长的地中海夏夜。",
      ja: "ガウディの超現実的な建築、フラメンコ、名高いタパス、トマティーナ、そしてロングサマーイブニングが続く地中海。",
      ko: "가우디의 초현실적 건축, 플라멩코, 세계적인 타파스, 토마토 축제, 그리고 지중해의 긴 저녁.",
    },
    avgTempByMonth: [10, 11, 14, 17, 21, 26, 29, 29, 26, 21, 14, 11],
    flightPriceEstimate: "$400–$950",
    bestMonths: [3, 4, 5, 8, 9],
    tags: ["art", "food", "beach"],
    currency: "EUR",
    countryCode: "ES",
  },
  {
    id: "germany",
    name: "Germany",
    city: "Berlin / Munich / Rhine",
    country: "Germany",
    flag: "🇩🇪",
    description:
      "Oktoberfest's legendary beer halls, magical Christmas markets, Berlin's cutting-edge art scene, and fairy-tale Bavarian castles.",
    descriptions: {
      th: "งานเบียร์ตำนานออคโทเบอร์เฟสต์ ตลาดคริสมาสต์มหัศจรรย์ ฉากศิลปะแนวหน้าของเบอร์ลิน และปราสาทบาวาเรียในเทพนิยาย",
      es: "Las legendarias cervecerías del Oktoberfest, mágicos mercados navideños, la vanguardista escena artística de Berlín y los castillos de cuento de hadas bávaros.",
      zh: "传奇的慕尼黑啤酒节、神奇的圣诞市集、柏林前沿艺术场景，以及如童话般的巴伐利亚城堡。",
      ja: "伝説のオクトーバーフェスト、魔法のクリスマスマーケット、ベルリンの最先端アートシーン、そしてバイエルンのおとぎ話のような城。",
      ko: "전설적인 옥토버페스트, 마법 같은 크리스마스 마켓, 베를린의 최첨단 예술 씬, 그리고 동화 같은 바이에른 성.",
    },
    avgTempByMonth: [1, 2, 6, 11, 16, 19, 22, 22, 18, 12, 6, 2],
    flightPriceEstimate: "$400–$900",
    bestMonths: [4, 5, 8, 11],
    tags: ["culture", "food", "history"],
    currency: "EUR",
    countryCode: "DE",
  },
  {
    id: "uk",
    name: "United Kingdom",
    city: "London / Edinburgh",
    country: "United Kingdom",
    flag: "🇬🇧",
    description:
      "Buckingham Palace, the Scottish Highlands, the world's best museums (free!), and the Edinburgh Fringe — the world's largest arts festival.",
    descriptions: {
      th: "พระราชวังบักกิงแฮม ที่ราบสูงสกอตแลนด์ พิพิธภัณฑ์ระดับโลก (ฟรี!) และเทศกาลเอดินบะระ — เทศกาลศิลปะที่ใหญ่ที่สุดในโลก",
      es: "El Palacio de Buckingham, las Tierras Altas de Escocia, los mejores museos del mundo (¡gratuitos!) y el Festival de Edimburgo — el mayor festival de artes del mundo.",
      zh: "白金汉宫、苏格兰高地、世界最佳博物馆（免费！），以及爱丁堡艺穗节——全球最大的艺术节。",
      ja: "バッキンガム宮殿、スコットランドのハイランド、世界最高の博物館（無料！）、そしてエディンバラ・フリンジ——世界最大のアートフェスティバル。",
      ko: "버킹엄 궁전, 스코틀랜드 하이랜드, 세계 최고의 박물관(무료!), 그리고 에든버러 프린지 — 세계 최대 예술 축제.",
    },
    avgTempByMonth: [5, 6, 8, 11, 14, 18, 20, 20, 17, 13, 9, 6],
    flightPriceEstimate: "$350–$900",
    bestMonths: [4, 5, 6, 7],
    tags: ["culture", "history", "art"],
    currency: "GBP",
    countryCode: "GB",
  },
  {
    id: "poland",
    name: "Poland",
    city: "Kraków / Warsaw",
    country: "Poland",
    flag: "🇵🇱",
    description:
      "Europe's best-preserved medieval city centre, Europe's most beautiful Christmas market, and outstanding food at a fraction of Western prices.",
    descriptions: {
      th: "ย่านกลางเมืองยุคกลางที่ได้รับการอนุรักษ์ดีที่สุดในยุโรป ตลาดคริสมาสต์ที่สวยที่สุด และอาหารรสเยี่ยมในราคาเพียงเสี้ยวของยุโรปตะวันตก",
      es: "El centro histórico medieval mejor conservado de Europa, el mercado navideño más bonito y gastronomía extraordinaria a una fracción del precio de Europa Occidental.",
      zh: "欧洲保存最完好的中世纪城市中心、最美圣诞市集，以及仅需西欧价格一小部分就能享受的精彩美食。",
      ja: "ヨーロッパで最もよく保存された中世の旧市街、最も美しいクリスマスマーケット、そして西ヨーロッパの何分の一かの価格で楽しめる絶品グルメ。",
      ko: "유럽에서 가장 잘 보존된 중세 도심, 유럽에서 가장 아름다운 크리스마스 마켓, 그리고 서유럽의 일부 가격으로 즐기는 탁월한 음식.",
    },
    avgTempByMonth: [0, 1, 5, 11, 17, 20, 22, 22, 18, 12, 6, 2],
    flightPriceEstimate: "$350–$800",
    bestMonths: [4, 5, 6, 11],
    tags: ["history", "food", "budget"],
    currency: "PLN",
    countryCode: "PL",
  },

  // ── Americas ──────────────────────────────────────────────────────────────
  {
    id: "usa",
    name: "United States",
    city: "New York / LA / National Parks",
    country: "United States",
    flag: "🇺🇸",
    description:
      "New York City's skyline, Yosemite's granite peaks, Route 66, the Grand Canyon, and an unmatched diversity of experiences across 50 states.",
    descriptions: {
      th: "เส้นขอบฟ้านิวยอร์กซิตี้ ยอดเขาแกรนไฮต์ของโยเซมิตี เส้นทาง 66 แกรนด์แคนยอน และความหลากหลายสุดอัศจรรย์ใน 50 รัฐ",
      es: "El skyline de Nueva York, los picos de granito de Yosemite, la Ruta 66, el Gran Cañón y una diversidad de experiencias incomparable en 50 estados.",
      zh: "纽约天际线、优胜美地的花岗岩山峰、66号公路、大峡谷，以及50个州中无与伦比的多元体验。",
      ja: "ニューヨークのスカイライン、ヨセミテの花崗岩の峰々、ルート66、グランドキャニオン、そして50の州にわたる比類なき多様な体験。",
      ko: "뉴욕의 스카이라인, 요세미티의 화강암 봉우리, 루트 66, 그랜드 캐니언, 그리고 50개 주의 비교할 수 없는 다양한 경험.",
    },
    avgTempByMonth: [3, 4, 9, 15, 21, 26, 29, 28, 24, 18, 12, 5],
    flightPriceEstimate: "$300–$800",
    bestMonths: [3, 4, 5, 8, 9],
    tags: ["city", "nature", "road trip"],
    currency: "USD",
    countryCode: "US",
  },
  {
    id: "canada",
    name: "Canada",
    city: "Vancouver / Banff / Quebec",
    country: "Canada",
    flag: "🇨🇦",
    description:
      "Banff's turquoise glacial lakes, Niagara Falls, Quebec City's old-world charm, and some of the world's most breathtaking wilderness.",
    descriptions: {
      th: "ทะเลสาบธารน้ำแข็งสีเทอร์คอยซ์แห่งแบนฟ์ น้ำตกไนแอการา ความงามเก่าของควิเบกซิตี้ และธรรมชาติป่าที่สวยที่สุดในโลก",
      es: "Los turquesas lagos glaciales de Banff, las Cataratas del Niágara, el encanto del viejo mundo de Quebec y algunos de los parajes naturales más impresionantes del mundo.",
      zh: "班夫的碧绿冰川湖、尼亚加拉瀑布、魁北克城的旧世界魅力，以及世界上最令人窒息的荒野。",
      ja: "バンフのターコイズブルーの氷河湖、ナイアガラの滝、ケベックシティの旧世界の魅力、そして世界屈指の息を飲む大自然。",
      ko: "밴프의 청록색 빙하 호수, 나이아가라 폭포, 퀘벡 시티의 올드 월드 매력, 그리고 세계에서 가장 숨막히는 자연.",
    },
    avgTempByMonth: [-5, -3, 2, 9, 15, 19, 22, 22, 17, 10, 4, -2],
    flightPriceEstimate: "$350–$850",
    bestMonths: [6, 7, 8],
    tags: ["nature", "mountains", "wildlife"],
    currency: "CAD",
    countryCode: "CA",
  },

  // ── Oceania ───────────────────────────────────────────────────────────────
  {
    id: "australia",
    name: "Australia",
    city: "Sydney / Great Barrier Reef",
    country: "Australia",
    flag: "🇦🇺",
    description:
      "Sydney Harbour's iconic Opera House, the Great Barrier Reef, Uluru at sunset, and unique wildlife found nowhere else on earth.",
    descriptions: {
      th: "โอเปร่าเฮาส์ซิดนีย์ แนวปะการังเกรทแบร์ริเออร์ พระอาทิตย์ตกเหนือหินอูลูรู และสัตว์ป่าเฉพาะถิ่นที่ไม่มีที่ไหนในโลก",
      es: "La icónica Ópera de Sídney, la Gran Barrera de Coral, Uluru al atardecer y fauna autóctona única en el mundo.",
      zh: "悉尼歌剧院、大堡礁、乌鲁鲁上空的日落，以及全球独一无二的本土野生动物。",
      ja: "シドニー・オペラハウス、グレートバリアリーフ、夕日に染まるウルル、そして世界唯一の固有野生動物。",
      ko: "시드니 오페라 하우스, 그레이트 배리어 리프, 울루루의 일몰, 그리고 세계 어디에도 없는 고유 야생동물.",
    },
    avgTempByMonth: [26, 26, 24, 22, 18, 16, 15, 16, 18, 21, 23, 25],
    flightPriceEstimate: "$700–$1,500",
    bestMonths: [2, 3, 8, 9, 10],
    tags: ["nature", "beach", "wildlife"],
    currency: "AUD",
    countryCode: "AU",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    city: "Queenstown / Fiordland",
    country: "New Zealand",
    flag: "🇳🇿",
    description:
      "Milford Sound's dramatic fjords, Hobbiton's rolling green hills, Queenstown's extreme adventures, and Māori cultural experiences.",
    descriptions: {
      th: "ฟยอร์ดสุดตระการตาของมิลฟอร์ดซาวด์ เนินเขาสีเขียวของฮอบบิตัน การผจญภัยสุดขีดที่ควีนส์ทาวน์ และประสบการณ์วัฒนธรรมเมารี",
      es: "Los dramáticos fiordos de Milford Sound, las ondulantes colinas verdes de Hobbiton, las aventuras extremas de Queenstown y las experiencias culturales maorís.",
      zh: "米尔福德峡湾的壮丽景色、霍比屯的翠绿山丘、皇后镇的极限冒险，以及毛利文化体验。",
      ja: "ミルフォードサウンドの劇的なフィヨルド、ホビトンの緑の丘、クイーンズタウンの極限アドベンチャー、そしてマオリの文化体験。",
      ko: "밀포드 사운드의 극적인 피오르드, 호빗마을의 초록 언덕, 퀸즈타운의 익스트림 어드벤처, 그리고 마오리 문화 체험.",
    },
    avgTempByMonth: [18, 18, 16, 13, 10, 8, 7, 8, 10, 13, 15, 17],
    flightPriceEstimate: "$800–$1,600",
    bestMonths: [11, 0, 1, 2],
    tags: ["nature", "adventure", "hiking"],
    currency: "NZD",
    countryCode: "NZ",
  },
];

export function getWeatherType(temp: number): WeatherType {
  if (temp < 15) return "cool";
  if (temp < 25) return "mild";
  return "warm";
}

export function getDestinationsForMonth(
  monthIndex: number,
  weather: WeatherType
): Destination[] {
  return DESTINATIONS.filter(
    (d) => getWeatherType(d.avgTempByMonth[monthIndex]) === weather
  );
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const WEATHER_CONFIG: Record<
  WeatherType,
  { label: string; icon: string; rangeLabel: string; description: string; color: string }
> = {
  cool: {
    label: "Cool",
    icon: "❄️",
    rangeLabel: "Under 15°C / 59°F",
    description: "Crisp air, fewer crowds, ideal for city exploring",
    color: "blue",
  },
  mild: {
    label: "Mild",
    icon: "🌤️",
    rangeLabel: "15–24°C / 59–75°F",
    description: "Perfect sightseeing weather — not too hot, not too cold",
    color: "green",
  },
  warm: {
    label: "Warm / Hot",
    icon: "☀️",
    rangeLabel: "25°C+ / 77°F+",
    description: "Beach weather, tropical vibes, and long sunny days",
    color: "orange",
  },
};
