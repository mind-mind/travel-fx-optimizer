export type FestivalLocale = "th" | "es" | "zh" | "ja" | "ko";

type FestivalCopyField = Partial<Record<FestivalLocale, string>>;

type FestivalCopy = {
  name?: FestivalCopyField;
  travelTip?: FestivalCopyField;
};

const FESTIVAL_TRANSLATIONS: Record<string, FestivalCopy> = {
  "jp-sakura": {
    name: {
      th: "ซากุระบาน",
      es: "Floración del Cerezo (Sakura)",
      zh: "樱花季",
      ja: "桜シーズン",
      ko: "벚꽃 시즌",
    },
    travelTip: {
      th: "โรงแรมเต็มล่วงหน้าหลายเดือน ควรจองเร็วและเตรียมงบราคาสูงกว่าปกติ 50–100% Japan Meteorological Corporation จะเผยแพร่พยากรณ์ซากุระประจำปีในเดือนมกราคม",
      es: "Los hoteles se agotan con meses de antelación. Reserva pronto y espera precios 50–100% más altos de lo normal. Japan Meteorological Corporation publica el pronóstico anual de floración en enero.",
      zh: "酒店通常会提前数月订满，建议尽早预订，并预期房价会比平时高出 50–100%。日本气象株式会社通常会在 1 月发布当年樱花预测。",
      ja: "ホテルは数か月前に埋まります。早めに予約し、通常より 50〜100% 高い料金を見込んでください。日本気象株式会社は毎年1月に開花予想を発表します。",
      ko: "호텔은 몇 달 전부터 예약이 마감됩니다. 일찍 예약하고 평소보다 50~100% 높은 가격을 예상하세요. 일본기상주식회사는 1월에 연간 개화 예보를 발표합니다.",
    },
  },
  "ch-ski": {
    name: {
      th: "ช่วงพีคฤดูสกี",
      es: "Temporada Alta de Esquí",
      zh: "滑雪旺季",
      ja: "スキーのピークシーズン",
      ko: "스키 성수기",
    },
    travelTip: {
      th: "Zermatt และ Verbier เป็นสกีรีสอร์ตที่แพงที่สุดในยุโรปอยู่แล้ว และจะแพงขึ้นอีกในช่วงพีค ควรจองชาเลต์หรือโรงแรมช่วงคริสต์มาสและปีใหม่ล่วงหน้า 4–6 เดือน ช่วงปิดเทอมเดือนกุมภาพันธ์คนแน่นที่สุด",
      es: "Zermatt y Verbier ya están entre las estaciones de esquí más caras de Europa, y en las semanas pico suben aún más. Reserva chalets u hoteles para Navidad y Año Nuevo con 4–6 meses de antelación. La media temporada escolar de febrero es la más congestionada.",
      zh: "采尔马特和韦尔比耶本来就是欧洲最贵的滑雪胜地之一，旺季价格还会进一步上涨。圣诞和新年期间的小木屋或酒店建议提前 4–6 个月预订。2 月学校假期最拥挤。",
      ja: "ツェルマットとヴェルビエは年間を通してヨーロッパでも特に高額なスキーリゾートで、ピーク週はさらに値上がりします。クリスマスと年末年始のシャレーやホテルは4〜6か月前に予約してください。2月のハーフタームが最も混雑します。",
      ko: "체르마트와 베르비에는 원래도 유럽에서 가장 비싼 스키 리조트 중 하나이며, 성수기 주간에는 더 비싸집니다. 크리스마스와 연말연시 샬레나 호텔은 4~6개월 전에 예약하세요. 2월 하프텀 기간이 가장 붐빕니다.",
    },
  },
  "id-eid": {
    name: {
      th: "อีดิลฟิตรี (เลอบารัน)",
      es: "Eid al-Fitr (Lebaran)",
      zh: "开斋节（Lebaran）",
      ja: "イード・アル＝フィトル（レバラン）",
      ko: "이드 알피트르(르바란)",
    },
    travelTip: {
      th: "ควรจองการเดินทางล่วงหน้า 3–4 สัปดาห์ เพราะรถบัส รถไฟ และเรือเฟอร์รีเต็มเร็วมาก จาการ์ตากลับน่าเที่ยวอย่างคาดไม่ถึงในช่วงเลอบารันเพราะรถหายเกือบหมด แหล่งท่องเที่ยวส่วนใหญ่ในบาหลีและยอกยาการ์ต้ายังเปิดอยู่",
      es: "Reserva el transporte con 3–4 semanas de antelación: autobuses, trenes y ferris se agotan. Yakarta resulta sorprendentemente agradable durante Lebaran porque desaparece el tráfico. La mayoría de los sitios turísticos de Bali y Yogyakarta siguen abiertos.",
      zh: "交通建议提前 3–4 周预订，巴士、火车和渡轮都会售罄。Lebaran 期间的雅加达因为道路空了下来，反而意外地舒服。巴厘岛和日惹的大多数旅游景点仍然开放。",
      ja: "交通機関は3〜4週間前に予約してください。バス、鉄道、フェリーは売り切れます。レバラン中のジャカルタは渋滞が消えるため意外なほど快適です。バリやジョグジャカルタの主要観光地はほとんど営業しています。",
      ko: "교통편은 3~4주 전에 예약하세요. 버스, 기차, 페리는 모두 매진됩니다. 르바란 기간의 자카르타는 교통 체증이 사라져 의외로 쾌적합니다. 발리와 욕야카르타의 대부분 관광지는 계속 운영됩니다.",
    },
  },
  "id-nyepi": {
    name: {
      th: "เนียปี (วันแห่งความเงียบของบาหลี)",
      es: "Nyepi (Día del Silencio de Bali)",
      zh: "宁静日（巴厘岛静默日）",
      ja: "ニュピ（バリ静寂の日）",
      ko: "녜삐(발리 침묵의 날)",
    },
    travelTip: {
      th: "สายการบินยกเลิกทุกเที่ยวบินเข้าออกบาหลีในวันเนียปี ควรเช็กวันที่ให้แน่ใจก่อนจอง คืนก่อนหน้าจะมีขบวนพาเหรดโอกอห์โอกอห์สุดอลังการ เป็นประสบการณ์ที่ไม่เหมือนที่ไหน",
      es: "Las aerolíneas cancelan todos los vuelos de Bali el día de Nyepi; revisa bien las fechas antes de reservar. La noche anterior se celebra el espectacular desfile de monstruos Ogoh-ogoh. Es una experiencia única e inolvidable.",
      zh: "Nyepi 当天所有往返巴厘岛的航班都会取消，预订前务必确认日期。前一晚会举行壮观的 Ogoh-ogoh 妖怪游行，是非常独特且难忘的体验。",
      ja: "ニュピ当日はバリ発着の全便が欠航します。予約前に日付を必ず確認してください。前夜には壮観なオゴオゴのパレードが行われ、忘れられない特別な体験になります。",
      ko: "녜삐 당일에는 발리의 모든 항공편이 취소되므로 예약 전에 날짜를 반드시 확인하세요. 전날 밤에는 화려한 오고오고 퍼레이드가 열리며, 정말 독특하고 잊기 어려운 경험입니다.",
    },
  },
  "mx-easter": {
    name: {
      th: "เซมานาซานตา (สัปดาห์ศักดิ์สิทธิ์ / อีสเตอร์)",
      es: "Semana Santa (Semana Santa / Pascua)",
      zh: "圣周（复活节周）",
      ja: "セマナサンタ（聖週間／イースター）",
      ko: "세마나 산타(성주간/부활절)",
    },
    travelTip: {
      th: "รีสอร์ตชายหาดของเม็กซิโกจะแพงและแน่นที่สุดในช่วง Semana Santa ควรจองล่วงหน้า 6 สัปดาห์ขึ้นไป หากเดินทางเข้าเมืองอย่าง Oaxaca, San Cristóbal หรือ Mérida ในช่วงนี้ จะได้เทศกาลวัฒนธรรมที่นักท่องเที่ยวต่างชาติน้อยกว่า",
      es: "Los resorts de playa de México alcanzan su punto más caro y concurrido durante Semana Santa. Reserva con más de 6 semanas de antelación. Viajar al interior, como Oaxaca, San Cristóbal o Mérida, ofrece festivales culturales con menos turistas extranjeros.",
      zh: "Semana Santa 期间，墨西哥海滨度假区最贵也最拥挤，建议至少提前 6 周预订。如果改去瓦哈卡、圣克里斯托瓦尔或梅里达等内陆城市，会遇到文化活动更多、外国游客更少的氛围。",
      ja: "セマナサンタの時期、メキシコのビーチリゾートは最も高額で混雑します。6週間以上前に予約してください。この週にオアハカ、サン・クリストバル、メリダなど内陸へ行くと、外国人観光客が少ない文化祭を楽しめます。",
      ko: "세마나 산타 기간에는 멕시코 해변 리조트가 가장 비싸고 붐빕니다. 최소 6주 전에 예약하세요. 오악사카, 산크리스토발, 메리다 같은 내륙으로 가면 외국인 관광객이 더 적은 문화 축제를 즐길 수 있습니다.",
    },
  },
  "it-easter": {
    name: {
      th: "อีสเตอร์และสัปดาห์ศักดิ์สิทธิ์ (Settimana Santa)",
      es: "Pascua y Semana Santa (Settimana Santa)",
      zh: "复活节与圣周（Settimana Santa）",
      ja: "イースターと聖週間（セッティマーナ・サンタ）",
      ko: "부활절과 성주간(Settimana Santa)",
    },
    travelTip: {
      th: "หลังอีสเตอร์จะตรงกับช่วงปิดเทอม ทำให้ที่พักในโรมและฟลอเรนซ์เต็มต่อเนื่องราว 2 สัปดาห์ ควรจองล่วงหน้า 8 สัปดาห์ ร้านอาหารหลายแห่งใช้เมนูอีสเตอร์แบบจำกัด ควรจอง Colosseum และ Vatican ล่วงหน้าเพื่อเลี่ยงคิว 2 ชั่วโมง",
      es: "Las vacaciones escolares caen después de Pascua, así que el alojamiento en Roma y Florencia se llena durante 2 semanas. Reserva con 8 semanas de antelación. Los restaurantes ofrecen menús limitados de Pascua. Reserva Coliseo y Vaticano con antelación para evitar colas de 2 horas.",
      zh: "复活节后正逢学校假期，罗马和佛罗伦萨的住宿会连续两周爆满，建议提前 8 周预订。许多餐厅会提供有限的复活节菜单。斗兽场和梵蒂冈最好提前预约，以避开 2 小时排队。",
      ja: "イースター後は学校休暇に入るため、ローマとフィレンツェの宿は2週間ほど埋まります。8週間前の予約がおすすめです。レストランはイースター限定メニューになることが多く、コロッセオとバチカンは2時間待ちを避けるため事前予約が必須です。",
      ko: "부활절 이후 학교 방학이 이어져 로마와 피렌체 숙소가 약 2주간 가득 찹니다. 8주 전에 예약하세요. 식당은 부활절 한정 메뉴만 운영하는 곳이 많고, 콜로세움과 바티칸은 2시간 줄을 피하려면 사전 예약이 필요합니다.",
    },
  },
  "my-hariraya": {
    name: {
      th: "ฮารีรายาอิดิลฟิตรี (อีดิลฟิตรี)",
      es: "Hari Raya Aidilfitri (Eid al-Fitr)",
      zh: "开斋节（Hari Raya Aidilfitri）",
      ja: "ハリラヤ・アイディルフィトリ（イード・アル＝フィトル）",
      ko: "하리 라야 아이딜피트리(이드 알피트르)",
    },
    travelTip: {
      th: "การเดินทางระหว่างเมืองจะเต็มหมด ร้านอาหารเล็ก ๆ ส่วนมากปิดใน 2 วันแรกของอีด แต่ Petronas Towers และห้างใหญ่ยังเปิดอยู่ ถ้ามีโอกาส ลองตอบรับคำชวน open house เพราะชาวมาเลเซียขึ้นชื่อเรื่องการต้อนรับ",
      es: "El transporte interurbano se agota por completo. Muchos restaurantes pequeños cierran durante los primeros 2 días del Eid. Las Torres Petronas y los grandes centros comerciales siguen abiertos. Si puedes, acepta una invitación a un open house: los malayos son famosos por su hospitalidad.",
      zh: "城际交通会全部订满。许多小餐馆在开斋节前两天会关门，但双子塔和大型商场通常仍开放。如果有机会，别错过受邀参加 open house，马来西亚人的热情好客非常有名。",
      ja: "都市間交通は完全に埋まります。小さなレストランの多くはイード初日から2日間ほど休業しますが、ペトロナスツインタワーや主要モールは営業しています。オープンハウスに招かれたらぜひ参加してください。マレーシア人のもてなしは有名です。",
      ko: "도시간 교통편은 완전히 매진됩니다. 작은 식당들은 이드 첫 2일 동안 대부분 문을 닫지만, 페트로나스 타워와 대형 쇼핑몰은 계속 운영됩니다. 오픈 하우스 초대를 받는다면 꼭 가보세요. 말레이시아 사람들의 환대는 정말 유명합니다.",
    },
  },
  "ph-holyweek": {
    name: {
      th: "สัปดาห์ศักดิ์สิทธิ์และอีสเตอร์",
      es: "Semana Santa y Pascua",
      zh: "圣周与复活节",
      ja: "聖週間とイースター",
      ko: "성주간과 부활절",
    },
    travelTip: {
      th: "การเดินทางทุกแบบทั้งเครื่องบิน รถ และเรือจะเต็มล่วงหน้าหลายสัปดาห์ รีสอร์ตชายหาดใน Boracay, Palawan และ Siargao มักเต็มหมด ควรวางแผนและจองอย่างน้อย 6 สัปดาห์ล่วงหน้าหากจะไปทะเล",
      es: "Todo el transporte — aéreo, terrestre y marítimo — se agota con semanas de antelación. Los resorts de Boracay, Palawan y Siargao se llenan por completo. Planifica y reserva con al menos 6 semanas de antelación para viajes de playa.",
      zh: "所有交通方式，包括飞机、陆路和海运，都会提前数周售罄。长滩岛、巴拉望和锡亚高的海滨度假村会全部订满。海岛旅行建议至少提前 6 周规划并预订。",
      ja: "航空・陸路・海路のすべての交通機関が数週間前に売り切れます。ボラカイ、パラワン、シアルガオのビーチリゾートは満室になります。ビーチ旅行は少なくとも6週間前に計画・予約してください。",
      ko: "항공, 육상, 해상 등 모든 교통편이 몇 주 전부터 매진됩니다. 보라카이, 팔라완, 시아르가오의 해변 리조트도 모두 예약이 꽉 찹니다. 해변 여행은 최소 6주 전에 계획하고 예약하세요.",
    },
  },
  "in-holi": {
    name: {
      th: "โฮลี (เทศกาลสี)",
      es: "Holi (Festival de los Colores)",
      zh: "洒红节（色彩节）",
      ja: "ホーリー祭（色彩の祭典）",
      ko: "홀리(색의 축제)",
    },
    travelTip: {
      th: "ปกป้องกล้องและโทรศัพท์ให้ดี เพราะผงสีเข้าทุกที่ ใส่เสื้อผ้าขาวเก่า ๆ เพื่อให้สีเด่นที่สุด เดือนมีนาคมเป็นช่วงดีมากในการเที่ยวเดลีและอัครา อากาศกำลังสบายก่อนเข้าหน้าร้อน",
      es: "Protege tu cámara y tu teléfono: el polvo de color entra en todas partes. Lleva ropa blanca vieja para que los colores resalten. Marzo es un momento excelente para visitar Delhi y Agra, con clima ideal antes del calor del verano.",
      zh: "一定要保护好相机和手机，彩粉会飘得到处都是。穿旧的白衣服最能拍出颜色效果。3 月也是游览德里和阿格拉的好时机，天气正好，还没进入酷暑。",
      ja: "カメラとスマホはしっかり保護してください。色粉はどこにでも入り込みます。色を映えさせるなら古い白い服がおすすめです。3月はデリーやアグラを訪れるのに最適で、夏の猛暑前のちょうど良い気候です。",
      ko: "카메라와 휴대폰을 꼭 보호하세요. 색가루가 정말 어디에나 들어갑니다. 색을 잘 살리려면 오래된 흰옷을 입는 게 좋습니다. 3월은 여름 더위가 오기 전이라 델리와 아그라를 여행하기에 아주 좋은 시기입니다.",
    },
  },
  "ae-winter": {
    name: {
      th: "ช่วงพีคท่องเที่ยว",
      es: "Temporada Turística Alta",
      zh: "旅游旺季",
      ja: "観光ピークシーズン",
      ko: "관광 성수기",
    },
    travelTip: {
      th: "สุดสัปดาห์ F1 Abu Dhabi Grand Prix ทำให้ราคาโรงแรมใน UAE พุ่ง 200–300% ควรจองล่วงหน้า 6 เดือนขึ้นไป จุดชม Burj Khalifa ช่วงปีใหม่ต้องจองในเวลากลางวัน พฤศจิกายนถึงกุมภาพันธ์คือช่วงดีที่สุดแบบไม่ต้องเถียง",
      es: "El fin de semana del F1 Abu Dhabi Grand Prix dispara los precios hoteleros en EAU un 200–300%. Reserva con más de 6 meses de antelación. La zona de observación del Burj Khalifa en Nochevieja requiere reserva durante el día. De noviembre a febrero es, sin discusión, la mejor época para visitar.",
      zh: "阿布扎比 F1 大奖赛周末会让阿联酋酒店价格暴涨 200–300%，建议提前 6 个月以上预订。哈利法塔跨年观景区需要白天提前预约。11 月到 2 月毫无疑问是最佳旅行时间。",
      ja: "F1アブダビGPの週末はUAEのホテル料金が200〜300%跳ね上がります。6か月以上前に予約してください。ブルジュ・ハリファの大晦日観覧エリアは日中の事前予約が必要です。11月〜2月が文句なしのベストシーズンです。",
      ko: "F1 아부다비 그랑프리 주말에는 UAE 호텔 가격이 200~300% 급등합니다. 6개월 이상 전에 예약하세요. 부르즈 칼리파 새해 전야 전망 구역은 낮 시간 사전 예약이 필요합니다. 11월부터 2월까지가 단연 최고의 방문 시기입니다.",
    },
  },
  "tr-ramadan": {
    name: {
      th: "รอมฎอนและอีด (Ramazan Bayramı)",
      es: "Ramadán y Eid (Ramazan Bayramı)",
      zh: "斋月与开斋节（Ramazan Bayramı）",
      ja: "ラマダンとイード（ラマザン・バイラム）",
      ko: "라마단과 이드(Ramazan Bayramı)",
    },
    travelTip: {
      th: "Grand Bazaar และร้านอาหารหลายแห่งในอิสตันบูลอาจลดเวลาทำการช่วงรอมฎอน อีดเป็นวันหยุดครอบครัวสำคัญ หลายธุรกิจปิด 3 วัน เป็นช่วงที่น่าสนใจมากในการสัมผัสวัฒนธรรมของอิสตันบูล",
      es: "El Gran Bazar de Estambul y muchos restaurantes pueden tener horarios reducidos durante Ramadán. El Eid es una importante festividad familiar y muchos negocios cierran 3 días. Es un momento culturalmente fascinante para visitar Estambul.",
      zh: "斋月期间，伊斯坦布尔的大巴扎和不少餐厅可能会缩短营业时间。开斋节是重要的家庭节日，很多商家会停业 3 天。这是体验伊斯坦布尔文化氛围的特别时机。",
      ja: "ラマダン中はイスタンブールのグランドバザールやレストランの営業時間が短くなることがあります。イードは大切な家族の祝日で、多くの店が3日間休業します。イスタンブールを文化的に深く体験するには魅力的な時期です。",
      ko: "라마단 기간에는 이스탄불의 그랜드 바자르와 식당들의 영업시간이 줄어들 수 있습니다. 이드는 중요한 가족 명절이라 많은 상점이 3일간 문을 닫습니다. 이스탄불의 문화를 깊이 체험하기에 아주 흥미로운 시기입니다.",
    },
  },
  "fr-nice-carnival": {
    name: {
      th: "นีซคาร์นิวัล",
      es: "Carnaval de Niza",
      zh: "尼斯狂欢节",
      ja: "ニース・カーニバル",
      ko: "니스 카니발",
    },
    travelTip: {
      th: "นีซในเดือนกุมภาพันธ์อากาศสดใสและอบอุ่นกว่ายุโรปส่วนใหญ่ โรงแรมเริ่มเต็ม ควรจองล่วงหน้า 4–6 สัปดาห์ ตั๋วขบวนพาเหรดใหญ่ขายหมดเร็ว ควรซื้อออนไลน์ล่วงหน้า",
      es: "Niza en febrero suele ser soleada y templada comparada con el resto de Europa. Los hoteles se llenan; reserva con 4–6 semanas de antelación. Las entradas para el gran desfile se agotan rápido: cómpralas online cuanto antes.",
      zh: "2 月的尼斯比欧洲大部分地区更晴朗温和。酒店会很快订满，建议提前 4–6 周预订。大型游行门票也会售罄，最好尽早在线购买。",
      ja: "2月のニースはヨーロッパの他地域よりも晴れて穏やかです。ホテルは埋まりやすいので4〜6週間前に予約してください。大パレードのチケットも売り切れるため、早めにオンライン購入がおすすめです。",
      ko: "2월의 니스는 유럽 다른 지역보다 화창하고 온화합니다. 호텔은 빠르게 예약이 차니 4~6주 전에 예약하세요. 대형 퍼레이드 티켓도 매진되므로 온라인으로 미리 구매하는 것이 좋습니다.",
    },
  },
  "es-semana-santa": {
    name: {
      th: "เซมานาซานตา (สัปดาห์ศักดิ์สิทธิ์)",
      es: "Semana Santa",
      zh: "圣周",
      ja: "セマナサンタ（聖週間）",
      ko: "세마나 산타(성주간)",
    },
    travelTip: {
      th: "เซบียาเต็มหมดในช่วง Semana Santa ควรจองล่วงหน้า 3–4 เดือน มาลากา กรานาดา และบายาโดลิดก็มีขบวนแห่ที่น่าประทับใจมาก หากจะเที่ยวอันดาลูเซียในสัปดาห์นี้ ต้องจองเร็ว",
      es: "Sevilla se llena por completo en Semana Santa; reserva con 3–4 meses de antelación. Málaga, Granada y Valladolid también tienen procesiones impresionantes. Reserva pronto cualquier viaje por Andalucía en esa semana.",
      zh: "塞维利亚在圣周期间会完全订满，建议提前 3–4 个月预订。马拉加、格拉纳达和巴利亚多利德也有非常震撼的游行。如果这一周要去安达卢西亚，一定要提早安排。",
      ja: "セマナサンタの時期、セビリアは完全に満室になります。3〜4か月前に予約してください。マラガ、グラナダ、バリャドリードも見事な行列があります。この週にアンダルシアを旅するなら早期予約が必須です。",
      ko: "세마나 산타 기간에는 세비야 숙소가 완전히 매진되므로 3~4개월 전에 예약하세요. 말라가, 그라나다, 바야돌리드도 인상적인 행렬로 유명합니다. 그 주에 안달루시아를 여행한다면 반드시 일찍 예약해야 합니다.",
    },
  },
  "de-carnival": {
    name: {
      th: "คาร์เนวาล / ฟาชิง",
      es: "Karneval / Fasching",
      zh: "狂欢节（Karneval / Fasching）",
      ja: "カーネヴァル／ファッシング",
      ko: "카르네발 / 파싱",
    },
    travelTip: {
      th: "ที่พักในโคโลญจน์เต็มหมดช่วงสัปดาห์ Rosenmontag ควรจองล่วงหน้า 3 เดือน เส้นทางขบวนพาเหรดริมไรน์เข้าชมฟรี แต่บริการตามปกติหลายอย่างจะถูกรบกวนมาก",
      es: "El alojamiento en Colonia se llena por completo durante la semana de Rosenmontag; reserva con 3 meses de antelación. La ruta del desfile junto al Rin es gratuita. Espera alteraciones importantes en los servicios habituales.",
      zh: "科隆在玫瑰星期一那周住宿会完全订满，建议提前 3 个月预订。莱茵河沿线的游行路线免费，但正常服务会受到明显影响。",
      ja: "ケルンの宿はローゼンモンタークの週に完全に埋まります。3か月前に予約してください。ライン川沿いのパレードルートは無料ですが、通常サービスにはかなりの影響が出ます。",
      ko: "쾰른 숙소는 로젠몬탁 주간에 완전히 매진되므로 3개월 전에 예약하세요. 라인강 퍼레이드 구간은 무료지만 일반 서비스는 크게 차질을 빚습니다.",
    },
  },
  "us-springbreak": {
    name: {
      th: "สปริงเบรก",
      es: "Spring Break",
      zh: "春假季",
      ja: "スプリングブレイク",
      ko: "스프링 브레이크",
    },
    travelTip: {
      th: "ไมอามีและชายหาดฟลอริดาจะแน่นมากในเดือนมีนาคม ตั๋วสวนสนุกอย่าง Disney และ Universal ควรจองล่วงหน้า 4–6 สัปดาห์ ราคาที่พักจะสูงสุดในช่วงสปริงเบรก",
      es: "Miami y las playas de Florida están extremadamente llenas en marzo. Reserva entradas para parques temáticos como Disney y Universal con 4–6 semanas de antelación. Los precios hoteleros alcanzan su pico durante las semanas de spring break.",
      zh: "3 月的迈阿密和佛州海滩会非常拥挤。迪士尼和环球影城等主题乐园门票建议提前 4–6 周预订。酒店价格会在春假周达到高点。",
      ja: "3月のマイアミとフロリダのビーチは非常に混雑します。ディズニーやユニバーサルなどのテーマパークは4〜6週間前に予約してください。ホテル料金はスプリングブレイク期間がピークになります。",
      ko: "3월의 마이애미와 플로리다 해변은 매우 붐빕니다. 디즈니와 유니버설 같은 테마파크 티켓은 4~6주 전에 예약하세요. 호텔 가격은 스프링 브레이크 기간에 최고치로 오릅니다.",
    },
  },
  "au-easter": {
    name: {
      th: "อีสเตอร์ลองวีคเอนด์",
      es: "Fin de Semana Largo de Pascua",
      zh: "复活节长周末",
      ja: "イースターのロングウィークエンド",
      ko: "부활절 연휴",
    },
    travelTip: {
      th: "ที่พักบนเส้น Great Ocean Road เช่น Lorne และ Aireys Inlet ควรจองล่วงหน้า 6–8 สัปดาห์ เพราะเต็มหมดแน่นอน โรงแรมในเมืองเมลเบิร์นกลับมีราคาดีกว่าช่วงอีสเตอร์เพราะคนท้องถิ่นออกนอกเมือง",
      es: "Reserva el alojamiento de Great Ocean Road, como Lorne o Aireys Inlet, con 6–8 semanas de antelación: se agota por completo. Los hoteles del centro de Melbourne suelen ser sorprendentemente asequibles en Pascua porque los locales salen de la ciudad.",
      zh: "大洋路沿线如 Lorne、Aireys Inlet 的住宿建议提前 6–8 周预订，因为会全部售罄。相反，墨尔本市区酒店在复活节期间通常更划算，因为本地人会离城。",
      ja: "グレートオーシャンロード沿いのローヌやエアリーズ・インレットの宿は6〜8週間前に予約してください。完全に埋まります。逆にメルボルン中心部のホテルは、地元の人が街を離れるためイースター期間は意外と手頃です。",
      ko: "그레이트 오션 로드의 론, 에어리즈 인렛 숙소는 6~8주 전에 예약하세요. 완전히 매진됩니다. 반대로 멜버른 시내 호텔은 현지인이 도시를 떠나서 부활절 기간에 의외로 저렴한 편입니다.",
    },
  },
  "nz-easter": {
    name: {
      th: "อีสเตอร์ลองวีคเอนด์",
      es: "Fin de Semana Largo de Pascua",
      zh: "复活节长周末",
      ja: "イースターのロングウィークエンド",
      ko: "부활절 연휴",
    },
    travelTip: {
      th: "ถนน State Highway 1 ทางเหนือของโอ๊คแลนด์ขึ้นชื่อเรื่องรถติดช่วงอีสเตอร์ ควรจองที่พักใน Coromandel ล่วงหน้า 6–8 สัปดาห์ Queenstown ช่วงฤดูใบไม้ร่วงในมีนาคมและเมษายนมีใบไม้สวยมาก และกำลังเป็นฤดูยอดนิยมมากขึ้นเรื่อย ๆ จึงควรจองเร็ว",
      es: "La State Highway 1 al norte de Auckland es famosa por el tráfico de Pascua. Reserva alojamiento en Coromandel con 6–8 semanas de antelación. Queenstown en otoño, entre marzo y abril, luce un follaje espectacular y esta temporada es cada vez más popular, así que conviene reservar pronto.",
      zh: "奥克兰以北的一号公路在复活节期间以堵车著称。科罗曼德住宿建议提前 6–8 周预订。皇后镇在 3 月和 4 月的秋色非常漂亮，这个季节也越来越热门，因此也应尽早预订。",
      ja: "オークランド北部の州道1号線はイースター渋滞で有名です。コロマンデルの宿は6〜8週間前に予約してください。3〜4月の秋のクイーンズタウンは紅葉が見事で、この時期の人気も高まっているため早めの予約が安心です。",
      ko: "오클랜드 북쪽의 1번 국도는 부활절 교통 체증으로 악명이 높습니다. 코로만델 숙소는 6~8주 전에 예약하세요. 3~4월 가을의 퀸스타운은 단풍이 매우 아름답고 점점 더 인기 있는 시즌이라서 역시 일찍 예약하는 편이 좋습니다.",
    },
  },
};

export function getFestivalName(id: string, fallback: string, lang: string): string {
  if (lang === "en") return fallback;
  return FESTIVAL_TRANSLATIONS[id]?.name?.[lang as FestivalLocale] ?? fallback;
}

export function getFestivalTravelTip(id: string, fallback: string, lang: string): string {
  if (lang === "en") return fallback;
  return FESTIVAL_TRANSLATIONS[id]?.travelTip?.[lang as FestivalLocale] ?? fallback;
}