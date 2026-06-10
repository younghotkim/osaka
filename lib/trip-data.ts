export type TripCategory =
  | "food"
  | "coffee"
  | "beer"
  | "whisky"
  | "sight"
  | "shopping"
  | "transit"
  | "hotel";

export type TripPriority = "must" | "optional" | "backup";

export type TripStop = {
  id: string;
  day: number;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  /** Japanese (kanji/kana) display name — historically named nameZh because the app was first built for Taipei. */
  nameZh: string;
  /** Subway / JR line guidance — historically named mrt. */
  mrt: string;
  phrase: string;
  /** Romaji pronunciation for `phrase`. */
  phrasePron?: string;
  /** Korean meaning of `phrase`. */
  phraseHint?: string;
  category: TripCategory;
  lat: number;
  lng: number;
  highlights: string[];
  prompt: string;
  mapsQuery: string;
};

export type StopPlanMeta = {
  priority: TripPriority;
  durationMinutes: number;
  alternatives: string[];
  flexTip: string;
  openingHours?: string;
  bookingStatus?: string;
  riskLevel?: "low" | "medium" | "high";
  riskNote?: string;
};

export type TripDay = {
  day: number;
  date: string;
  title: string;
  mood: string;
  summary: string;
  journal: string;
};

export const tripDays: TripDay[] = [
  {
    day: 1,
    date: "7/2 목",
    title: "도착 → 도톤보리 첫날 밤",
    mood: "간사이 도착 → 미나미 베이스캠프 → 첫 밤은 도톤보리 강변에서",
    summary:
      "간사이공항 도착 → 라피트로 난바 → 호텔 짐 맡기기 → 미즈노 오코노미야키 → 구로몬 시장 주전부리 → 신사이바시·아메무라 산책 → 우라난바 이자카야 저녁 → 글리코 사인 앞 커플 사진 → 도톤보리 관람차 → 칵테일 한 잔.",
    journal: ""
  },
  {
    day: 2,
    date: "7/3 금",
    title: "오사카성 → 우메다 → 공중정원 선셋",
    mood: "낮엔 성과 정원, 밤엔 하늘 위에서 — 가장 로맨틱한 하루",
    summary:
      "모닝 스페셜티 커피 → 오사카성 천수각·니시노마루 정원 → 키지 오코노미야키 점심 → 우메다·차야마치 쇼핑 → 헵파이브 빨간 관람차 → 타키미코지 저녁 → 우메다 스카이빌딩 공중정원 일몰·야경.",
    journal: ""
  },
  {
    day: 3,
    date: "7/4 토",
    title: "신세카이 레트로 → 출국",
    mood: "츠텐카쿠 아래 쿠시카츠로 마무리, 해 지기 전 공항으로",
    summary:
      "체크아웃·짐 맡기기 → 신세카이·츠텐카쿠 레트로 산책 → 쿠시카츠 다루마 점심 → 하루카스 300 전망대(선택) → 짐 픽업 → 라피트로 간사이공항 → 저녁 출국.",
    journal: ""
  }
];

export const categoryLabels: Record<TripCategory, string> = {
  food: "미식",
  coffee: "커피",
  beer: "사케·맥주",
  whisky: "바·칵테일",
  sight: "관광",
  shopping: "쇼핑",
  transit: "이동",
  hotel: "체크인"
};

export const categoryColors: Record<TripCategory, string> = {
  food: "#e8432d",     // 道頓堀 glico-orange red — 쿠이다오레의 도시
  coffee: "#8a5a36",   // 焙煎 roast brown
  beer: "#e8a020",     // 提灯 chōchin lantern gold
  whisky: "#a3275f",   // ネオン magenta — 미나미 밤거리
  sight: "#2e8b8b",    // 大阪城 turquoise-green roof tiles
  shopping: "#e75480", // 戎橋 neon pink
  transit: "#3d4a68",  // 御堂筋線 night indigo
  hotel: "#d4356c"     // 커플 베이스캠프 — warm rose
};

export const tripStops: TripStop[] = [
  // ───────── Day 1 (7/2 목) ─────────
  {
    id: "kix-arrival",
    day: 1,
    date: "7/2 목",
    time: "10:30",
    title: "간사이공항 도착 (KIX)",
    subtitle: "T1 입국 → 난카이 라피트 → 난바",
    nameZh: "関西国際空港 (KIX) 第1ターミナル",
    mrt: "난카이공항선 라피트 β → 難波駅 (38분, 편도 ¥1,490 / 외국인 할인권 있음)",
    phrase: "すみません、南海電車の乗り場はどこですか？",
    phrasePron: "sumimasen, nankai densha no noriba wa doko desu ka?",
    phraseHint: "난카이 전철 타는 곳이 어디예요?",
    category: "transit",
    lat: 34.4347,
    lng: 135.2441,
    highlights: [
      "항공편 확정되면 시간 수정 (앱에서 편집)",
      "Visit Japan Web 미리 등록 → 입국심사 빠르게",
      "라피트 지정석 — 창가 나란히 앉기, 외국인 할인 티켓(¥1,300대) 체크",
      "공항에서 ICOCA 충전 + 현금 ¥ 인출 (세븐뱅크 ATM)"
    ],
    prompt: "도착 첫 셀카. 라피트 철인28호 얼굴 닮은 열차 앞에서 한 장.",
    mapsQuery: "Kansai International Airport Terminal 1"
  },
  {
    id: "hotel-checkin",
    day: 1,
    date: "7/2 목",
    time: "12:00",
    title: "크로스호텔 오사카 — 짐 맡기기",
    subtitle: "도톤보리 도보 1분, 미나미 베이스캠프",
    nameZh: "クロスホテル大阪 (心斎橋・道頓堀)",
    mrt: "난바역(なんば駅) 14번 출구 도보 3분 / 도톤보리 에비스바시 도보 1분",
    phrase: "チェックインの前に荷物を預かってもらえますか？",
    phrasePron: "chekku-in no mae ni nimotsu o azukatte moraemasu ka?",
    phraseHint: "체크인 전에 짐 맡아주실 수 있나요?",
    category: "hotel",
    lat: 34.6695,
    lng: 135.5009,
    highlights: [
      "글리코 사인까지 도보 1분 — 밤 산책 최적 입지",
      "체크인 15:00 — 일단 짐만 맡기고 점심으로",
      "예약 확정되면 호텔명/위치 앱에서 수정 (지도에서 핀 끌어서 이동)"
    ],
    prompt: "베이스캠프 첫인상 한 줄. 방에서 도톤보리 보이는지.",
    mapsQuery: "Cross Hotel Osaka"
  },
  {
    id: "mizuno-okonomiyaki",
    day: 1,
    date: "7/2 목",
    time: "12:40",
    title: "미즈노 — 오코노미야키 점심",
    subtitle: "1945년 창업, 도톤보리 오코노미야키의 정석",
    nameZh: "美津の (みづの) 道頓堀",
    mrt: "난바역(なんば駅) 14번 출구 도보 4분",
    phrase: "山芋焼きを一つお願いします。",
    phrasePron: "yamaimo-yaki o hitotsu onegai shimasu",
    phraseHint: "야마이모야키(마 반죽) 하나 주세요",
    category: "food",
    lat: 34.6686,
    lng: 135.5031,
    highlights: [
      "시그니처 야마이모야키 — 밀가루 대신 마 100% 반죽",
      "철판 카운터석이면 눈앞에서 구워주는 라이브",
      "웨이팅 30분+ 흔함 — 12시 전 도착이 베스트",
      "둘이 야마이모야키 + 믹스야키 나눠 먹기"
    ],
    prompt: "철판 위 사진 1장 + 야마이모 vs 믹스 승자 기록.",
    mapsQuery: "Mizuno Okonomiyaki Dotonbori"
  },
  {
    id: "kuromon-market",
    day: 1,
    date: "7/2 목",
    time: "14:30",
    title: "구로몬 시장 — 주전부리 투어",
    subtitle: "오사카의 부엌, 길거리 해산물·과일 디저트",
    nameZh: "黒門市場",
    mrt: "닛폰바시역(日本橋駅) 10번 출구 도보 2분",
    phrase: "これを二つください。",
    phrasePron: "kore o futatsu kudasai",
    phraseHint: "이거 두 개 주세요",
    category: "food",
    lat: 34.6657,
    lng: 135.5063,
    highlights: [
      "참치·우니·관자 꼬치 — 점심 직후니 한두 개만",
      "여름 한정 — 차가운 멜론·복숭아 주스 / 컷과일",
      "와규 꼬치는 비싼 집 말고 줄 선 집으로",
      "16시 이후엔 닫는 가게 많음 — 오후 일찍 방문"
    ],
    prompt: "제일 맛있었던 한 입 + 가격 기록 (정산용).",
    mapsQuery: "Kuromon Ichiba Market"
  },
  {
    id: "shinsaibashi-amemura",
    day: 1,
    date: "7/2 목",
    time: "16:00",
    title: "신사이바시스지 + 아메리카무라",
    subtitle: "아케이드 쇼핑 & 빈티지 골목 산책",
    nameZh: "心斎橋筋商店街 · アメリカ村",
    mrt: "신사이바시역(心斎橋駅) 6번 출구 — 아케이드 바로 연결",
    phrase: "試着してもいいですか？",
    phrasePron: "shichaku shite mo ii desu ka?",
    phraseHint: "입어봐도 되나요?",
    category: "shopping",
    lat: 34.6724,
    lng: 135.5010,
    highlights: [
      "신사이바시스지 — 지붕 있는 아케이드라 더위·비 걱정 없음",
      "아메무라 — 빈티지샵·레코드·삼각공원 골목",
      "커플 양말/폰케이스 같은 시시한 커플템 하나 사기",
      "드러그스토어 쇼핑은 마지막 날 말고 오늘 가볍게 정찰만"
    ],
    prompt: "아메무라에서 제일 이상하고 웃긴 가게 한 컷.",
    mapsQuery: "Shinsaibashi-suji Shopping Street"
  },
  {
    id: "uranamba-dinner",
    day: 1,
    date: "7/2 목",
    time: "18:30",
    title: "우라난바 — 이자카야 골목 저녁",
    subtitle: "로컬 분위기 골목에서 사케 + 안주",
    nameZh: "裏なんば (ウラなんば) 居酒屋横丁",
    mrt: "난바역(なんば駅) / 닛폰바시역(日本橋駅) 사이 골목",
    phrase: "とりあえず生二つと、おすすめを二品お願いします。",
    phrasePron: "toriaezu nama futatsu to, osusume o nihin onegai shimasu",
    phraseHint: "일단 생맥주 둘, 추천 안주 두 개 주세요",
    category: "beer",
    lat: 34.6646,
    lng: 135.5046,
    highlights: [
      "관광객보다 로컬이 많은 골목 — 진짜 오사카의 밤",
      "다찌노미·스시·교자·스미비야키 가게 골라 들어가기",
      "한 곳에서 길게 말고 두 곳 가볍게 호핑",
      "내일 아침 여유 있으니 부담 없이"
    ],
    prompt: "오늘 들어간 가게 이름 + 베스트 안주 한 줄.",
    mapsQuery: "Uranamba Osaka izakaya"
  },
  {
    id: "glico-night",
    day: 1,
    date: "7/2 목",
    time: "20:30",
    title: "도톤보리 글리코 사인 — 커플 사진",
    subtitle: "에비스바시 위에서, 오사카에 온 증명샷",
    nameZh: "道頓堀 グリコサイン · 戎橋",
    mrt: "난바역(なんば駅) 14번 출구 도보 3분",
    phrase: "写真を撮ってもらえますか？",
    phrasePron: "shashin o totte moraemasu ka?",
    phraseHint: "사진 좀 찍어주시겠어요?",
    category: "sight",
    lat: 34.6687,
    lng: 135.5013,
    highlights: [
      "글리코 러너 포즈 — 둘 다 한 손씩 들고 같이",
      "에비스바시 위는 인파 — 강변 데크로 내려가면 한산",
      "톤보리 리버크루즈(20분, ¥1,500) 야간 탑승도 후보",
      "간판 불빛이 강물에 반사되는 사진은 다리 동쪽 데크가 베스트"
    ],
    prompt: "글리코 앞 커플 사진 — 이 여행의 대표컷.",
    mapsQuery: "Glico Sign Ebisubashi Dotonbori"
  },
  {
    id: "ferris-don-quijote",
    day: 1,
    date: "7/2 목",
    time: "21:30",
    title: "돈키호테 에비스타워 관람차 (선택)",
    subtitle: "도톤보리 강 위를 도는 타원형 관람차",
    nameZh: "ドン・キホーテ道頓堀店 観覧車「えびすタワー」",
    mrt: "글리코 사인에서 강변 따라 도보 3분",
    phrase: "観覧車のチケットはどこで買えますか？",
    phrasePron: "kanransha no chiketto wa doko de kaemasu ka?",
    phraseHint: "관람차 티켓 어디서 사요?",
    category: "sight",
    lat: 34.6689,
    lng: 135.5026,
    highlights: [
      "1바퀴 15분 — 도톤보리 밤거리를 위에서 내려다보기",
      "¥600/인 — 돈키 쇼핑이랑 묶어서",
      "피곤하면 패스하고 강변 산책으로 대체"
    ],
    prompt: "관람차에서 내려다본 밤거리 한 컷.",
    mapsQuery: "Don Quijote Dotonbori Ferris Wheel"
  },
  {
    id: "bar-d1",
    day: 1,
    date: "7/2 목",
    time: "22:30",
    title: "미나미 칵테일 바 — 첫 밤 마무리",
    subtitle: "신사이바시·난바 권 조용한 바 한 잔",
    nameZh: "BAR — Minami Cocktail Bar (心斎橋 / 難波)",
    mrt: "호텔 도보권 (신사이바시·난바)",
    phrase: "甘めのカクテルをお願いします。",
    phrasePron: "amame no kakuteru o onegai shimasu",
    phraseHint: "달달한 칵테일로 부탁해요",
    category: "whisky",
    lat: 34.6713,
    lng: 135.5000,
    highlights: [
      "Bar Nayuta / BAR JUNIPER Trinity / 호텔 바 후보",
      "취향대로 — 한 명은 위스키, 한 명은 프루티 칵테일",
      "차지(테이블 차지) ¥500~1,000 미리 확인",
      "피곤하면 편의점 츄하이 + 호텔 창가도 낭만"
    ],
    prompt: "서로에게 '오늘 최고 순간' 하나씩 말하고 기록.",
    mapsQuery: "Bar Nayuta Osaka"
  },

  // ───────── Day 2 (7/3 금) ─────────
  {
    id: "morning-coffee",
    day: 2,
    date: "7/3 금",
    time: "09:00",
    title: "모닝 커피 — LiLo Coffee Roasters",
    subtitle: "신사이바시 스페셜티 로스터리에서 느긋한 시작",
    nameZh: "LiLo Coffee Roasters (心斎橋)",
    mrt: "신사이바시역(心斎橋駅) 7번 출구 도보 3분",
    phrase: "ハンドドリップでおすすめの豆はどれですか？",
    phrasePron: "hando dorippu de osusume no mame wa dore desu ka?",
    phraseHint: "핸드드립으로 추천하는 원두는 뭐예요?",
    category: "coffee",
    lat: 34.6738,
    lng: 135.4997,
    highlights: [
      "오사카 스페셜티 신 대표 로스터리 — 원두 선물용 구매도",
      "아침 일찍은 한산 — 창가 스탠딩",
      "대안: Mel Coffee Roasters / % Arabica (혼잡)"
    ],
    prompt: "오늘의 원두 이름 기록 + 컵 들고 한 컷.",
    mapsQuery: "LiLo Coffee Roasters Osaka"
  },
  {
    id: "osaka-castle",
    day: 2,
    date: "7/3 금",
    time: "10:30",
    title: "오사카성 — 천수각 & 니시노마루 정원",
    subtitle: "해자 위 천수각, 오사카의 상징",
    nameZh: "大阪城天守閣 · 西の丸庭園",
    mrt: "다니마치욘초메역(谷町四丁目駅) 1-B 출구 도보 15분",
    phrase: "天守閣のチケットを二枚ください。",
    phrasePron: "tenshukaku no chiketto o nimai kudasai",
    phraseHint: "천수각 티켓 두 장 주세요",
    category: "sight",
    lat: 34.6873,
    lng: 135.5262,
    highlights: [
      "천수각 8F 전망대 — 입장 ¥600 (줄 길면 외관+정원만도 충분)",
      "니시노마루 정원(¥200) — 해자 건너 천수각 뷰가 베스트 포토스팟",
      "7월 한낮 더위 주의 — 오전에 끝내고 실내로",
      "고자부네 뱃놀이(해자 보트)도 후보"
    ],
    prompt: "해자 + 천수각 배경 커플 사진. 더위 체감 한 줄.",
    mapsQuery: "Osaka Castle Nishinomaru Garden"
  },
  {
    id: "kiji-okonomiyaki",
    day: 2,
    date: "7/3 금",
    time: "13:00",
    title: "키지 — 모단야키 점심",
    subtitle: "우메다 스카이빌딩 타키미코지의 전설 철판",
    nameZh: "きじ 滝見小路店 (梅田スカイビル)",
    mrt: "오사카역(大阪駅)/우메다역 도보 10분 — 스카이빌딩 지하 1F 타키미코지",
    phrase: "モダン焼きを二つお願いします。",
    phrasePron: "modan-yaki o futatsu onegai shimasu",
    phraseHint: "모단야키 두 개 주세요",
    category: "food",
    lat: 34.7052,
    lng: 135.4898,
    highlights: [
      "모단야키(면 들어간 오코노미야키)가 시그니처",
      "쇼와 거리를 재현한 타키미코지 골목 자체가 포토스팟",
      "줄 서는 집 — 13시 전후 피크 피하기",
      "밤에 공중정원 올 거라 위치 미리 봐두기"
    ],
    prompt: "어제 미즈노 vs 오늘 키지 — 오코노미야키 최종 승자.",
    mapsQuery: "Kiji Okonomiyaki Takimikoji Umeda Sky Building"
  },
  {
    id: "umeda-shopping",
    day: 2,
    date: "7/3 금",
    time: "14:30",
    title: "우메다 — 그랜드프론트 · 차야마치",
    subtitle: "백화점 디파치카부터 NU차야마치까지",
    nameZh: "梅田 グランフロント · 茶屋町 · 阪急うめだ",
    mrt: "우메다역(梅田駅) — 한큐/지하철/JR 오사카역 전부 연결",
    phrase: "免税カウンターはどこですか？",
    phrasePron: "menzei kauntā wa doko desu ka?",
    phraseHint: "면세 카운터 어디예요?",
    category: "shopping",
    lat: 34.7037,
    lng: 135.4960,
    highlights: [
      "한큐 우메다 본점 디파치카 — 선물 과자(바통도르 등) 사냥",
      "그랜드프론트·루쿠아 — 한국에 없는 브랜드 위주로",
      "차야마치 골목 — 잡화·소품샵 데이트 코스",
      "지하미로 길찾기 주의 — 구글맵보다 표지판 따라가기"
    ],
    prompt: "서로에게 줄 작은 선물 하나씩 몰래 사기 (저녁에 교환).",
    mapsQuery: "Grand Front Osaka"
  },
  {
    id: "hep-five",
    day: 2,
    date: "7/3 금",
    time: "16:30",
    title: "헵파이브 — 빨간 관람차",
    subtitle: "우메다 한복판 옥상 위 빨간 바퀴, 커플 정석",
    nameZh: "HEP FIVE 観覧車",
    mrt: "우메다역(梅田駅) 도보 4분",
    phrase: "二人で一つのゴンドラに乗れますか？",
    phrasePron: "futari de hitotsu no gondora ni noremasu ka?",
    phraseHint: "둘이 곤돌라 하나에 탈 수 있죠?",
    category: "sight",
    lat: 34.7035,
    lng: 135.5008,
    highlights: [
      "1바퀴 15분, ¥800/인 — 곤돌라 안 블루투스 스피커로 둘만의 플레이리스트",
      "맑으면 멀리 항구까지 보임",
      "쇼핑 동선 중간 환기용으로 딱"
    ],
    prompt: "곤돌라 안 셀카 + 그 순간 튼 노래 제목 기록.",
    mapsQuery: "HEP FIVE Ferris Wheel"
  },
  {
    id: "takimikoji-dinner",
    day: 2,
    date: "7/3 금",
    time: "18:00",
    title: "타키미코지 — 쇼와 골목 저녁",
    subtitle: "공중정원 가기 전, 지하 레트로 골목에서 저녁",
    nameZh: "滝見小路 (梅田スカイビルB1) 食堂街",
    mrt: "우메다 스카이빌딩 지하 1F",
    phrase: "二人ですが、席はありますか？",
    phrasePron: "futari desu ga, seki wa arimasu ka?",
    phraseHint: "두 명인데 자리 있어요?",
    category: "food",
    lat: 34.7052,
    lng: 135.4898,
    highlights: [
      "쇼와 시대 골목 세트 같은 식당가 — 분위기가 절반",
      "쿠시카츠·돈가스·교자·카레 등 가게 골라 들어가기",
      "공중정원 일몰 시간(7월 ~19:15) 역산해서 가볍게",
      "점심 키지가 부담스러웠으면 여기서 가볍게 국물+밥"
    ],
    prompt: "골목 레트로 간판 앞에서 필름 카메라 무드 한 컷.",
    mapsQuery: "Takimikoji Alley Umeda Sky Building"
  },
  {
    id: "umeda-sky-garden",
    day: 2,
    date: "7/3 금",
    time: "19:00",
    title: "우메다 스카이빌딩 — 공중정원 일몰·야경",
    subtitle: "지상 173m 옥상 전망대, 이 여행의 하이라이트",
    nameZh: "梅田スカイビル 空中庭園展望台",
    mrt: "오사카역(大阪駅) 중앙북출구 도보 10분 (지하도 경유)",
    phrase: "展望台のチケットを二枚お願いします。",
    phrasePron: "tenbōdai no chiketto o nimai onegai shimasu",
    phraseHint: "전망대 티켓 두 장 주세요",
    category: "sight",
    lat: 34.7053,
    lng: 135.4900,
    highlights: [
      "입장 ¥2,000/인 — 온라인 예매하면 줄 스킵",
      "7월 일몰 약 19:15 — 18:45쯤 올라가서 매직아워 통째로",
      "옥상 스카이워크는 유리 없이 뚫린 360° — 바람 맞으며 야경",
      "'츠무구' 커플 자물쇠 / 발밑에 빛나는 루미 갤러리",
      "야경 본 뒤 미나미 복귀 — 미도스지선 우메다→난바 8분"
    ],
    prompt: "매직아워 스카이라인 + 실루엣 커플샷. 오늘의 한 줄 일기.",
    mapsQuery: "Umeda Sky Building Kuchu Teien Observatory"
  },
  {
    id: "bar-d2",
    day: 2,
    date: "7/3 금",
    time: "21:30",
    title: "도톤보리 강변 — 밤 산책 + 한 잔",
    subtitle: "호텔 복귀 후 강변 데크 야경 마무리",
    nameZh: "とんぼりリバーウォーク",
    mrt: "난바역(なんば駅) — 호텔 도보권",
    phrase: "持ち帰りできますか？",
    phrasePron: "mochikaeri dekimasu ka?",
    phraseHint: "포장 되나요?",
    category: "whisky",
    lat: 34.6692,
    lng: 135.5005,
    highlights: [
      "금요일 밤 도톤보리 — 가장 화려한 시간",
      "크래프트 비어 바 / 강변 테라스 좌석 노리기",
      "어제 못 간 바 후보 소진하기",
      "내일 아침 체크아웃 — 짐 미리 80% 싸두기"
    ],
    prompt: "우메다 야경 vs 도톤보리 밤거리 — 어느 밤이 더 좋았는지.",
    mapsQuery: "Tombori River Walk Dotonbori"
  },

  // ───────── Day 3 (7/4 토) ─────────
  {
    id: "checkout-d3",
    day: 3,
    date: "7/4 토",
    time: "09:30",
    title: "체크아웃 + 짐 맡기기",
    subtitle: "짐은 호텔에 — 몸 가볍게 마지막 반나절",
    nameZh: "チェックアウト · 荷物預かり",
    mrt: "호텔 프런트",
    phrase: "夕方まで荷物を預かってもらえますか？",
    phrasePron: "yūgata made nimotsu o azukatte moraemasu ka?",
    phraseHint: "저녁까지 짐 맡아주실 수 있나요?",
    category: "hotel",
    lat: 34.6695,
    lng: 135.5009,
    highlights: [
      "10시 전 체크아웃 — 짐은 프런트에 (보통 무료)",
      "여권·지갑·보조배터리만 데이백에",
      "면세 쇼핑백은 캐리어 맨 위 (공항 검사 대비)"
    ],
    prompt: "캐리어 무게 어림 + 빠뜨린 것 없는지 서로 크로스체크.",
    mapsQuery: "Cross Hotel Osaka"
  },
  {
    id: "shinsekai-tsutenkaku",
    day: 3,
    date: "7/4 토",
    time: "10:30",
    title: "신세카이 — 츠텐카쿠 레트로 산책",
    subtitle: "쇼와 감성 그대로, 빌리켄 발바닥 만지기",
    nameZh: "新世界 · 通天閣",
    mrt: "도부츠엔마에역(動物園前駅) 1번 출구 도보 7분 / 에비스초역(恵美須町駅) 3번 출구 도보 3분",
    phrase: "ビリケンさんはどこですか？",
    phrasePron: "biriken-san wa doko desu ka?",
    phraseHint: "빌리켄 상은 어디 있어요?",
    category: "sight",
    lat: 34.6525,
    lng: 135.5063,
    highlights: [
      "츠텐카쿠 전망대(¥1,200) or 아래에서 레트로 간판 사진만",
      "복고 간판 거리 — 진자야(神社) 골목까지 한 바퀴",
      "빌리켄 발바닥 만지면 행운 — 둘이 같이",
      "스마트볼 오락실에서 옛날 게임 한 판"
    ],
    prompt: "제일 촌스럽고 사랑스러운 간판 아래에서 한 컷.",
    mapsQuery: "Tsutenkaku Shinsekai"
  },
  {
    id: "kushikatsu-daruma",
    day: 3,
    date: "7/4 토",
    time: "11:40",
    title: "쿠시카츠 다루마 본점 — 마지막 점심",
    subtitle: "신세카이 원조 쿠시카츠, '소스 두 번 찍기 금지'",
    nameZh: "串かつだるま 新世界総本店",
    mrt: "츠텐카쿠에서 도보 2분",
    phrase: "ソースの二度漬けは禁止ですよね？",
    phrasePron: "sōsu no nidozuke wa kinshi desu yo ne?",
    phraseHint: "소스 두 번 찍기 금지 맞죠? (점원이 웃어줌)",
    category: "food",
    lat: 34.6519,
    lng: 135.5064,
    highlights: [
      "원조 본점 — 소스는 처음 한 번만, 추가는 양배추로 떠서",
      "소고기·새우·아스파라·치즈 기본 코스",
      "토요일 점심 — 11:30 오픈 직후 입장 노리기",
      "본점 줄 길면 신세카이 안 분점들로"
    ],
    prompt: "꼬치 영수증 사진 (정산) + 베스트 꼬치 1픽.",
    mapsQuery: "Kushikatsu Daruma Shinsekai Honten"
  },
  {
    id: "harukas-300",
    day: 3,
    date: "7/4 토",
    time: "13:30",
    title: "하루카스 300 전망대 (선택)",
    subtitle: "일본 최고층 빌딩에서 낮의 오사카 한눈에",
    nameZh: "あべのハルカス展望台「ハルカス300」",
    mrt: "텐노지역(天王寺駅) 직결 — 신세카이에서 도보 12분",
    phrase: "当日券はまだありますか？",
    phrasePron: "tōjitsuken wa mada arimasu ka?",
    phraseHint: "당일권 아직 있어요?",
    category: "sight",
    lat: 34.6459,
    lng: 135.5133,
    highlights: [
      "지상 300m — 낮 뷰는 여기, 밤 뷰는 어제 공중정원으로 완성",
      "입장 ¥2,000/인 — 시간 빠듯하면 과감히 스킵",
      "16층 무료 정원 테라스만 들러도 충분히 좋음",
      "여기서 바로 텐노지역 → 난바 복귀 동선 깔끔"
    ],
    prompt: "어제 밤 공중정원 vs 오늘 낮 하루카스 — 한 줄 비교.",
    mapsQuery: "Harukas 300 Observatory Abeno"
  },
  {
    id: "luggage-rapit",
    day: 3,
    date: "7/4 토",
    time: "15:30",
    title: "짐 픽업 → 라피트로 공항 이동",
    subtitle: "난바역 → 간사이공항 38분",
    nameZh: "なんば駅 → 関西空港 (ラピート)",
    mrt: "난카이 난바역 2F 개찰 — 라피트 지정석",
    phrase: "関西空港行きのラピートはこのホームですか？",
    phrasePron: "kansai kūkō yuki no rapīto wa kono hōmu desu ka?",
    phraseHint: "간사이공항행 라피트 이 승강장 맞아요?",
    category: "transit",
    lat: 34.6643,
    lng: 135.5023,
    highlights: [
      "호텔 짐 픽업 → 난카이 난바역 도보 6분",
      "라피트 지정석 미리 예매해두면 마음 편함",
      "출발 시간 = 비행기 3시간 전 역산해서 조정",
      "ICOCA 잔액은 편의점에서 털기"
    ],
    prompt: "차창 밖 마지막 오사카 풍경 한 컷.",
    mapsQuery: "Nankai Namba Station Rapit"
  },
  {
    id: "kix-departure",
    day: 3,
    date: "7/4 토",
    time: "17:00",
    title: "간사이공항 — 저녁 출국",
    subtitle: "체크인 → 면세 → 게이트, 여행 회고",
    nameZh: "関西国際空港 出発",
    mrt: "난카이 간사이공항역 → T1 직결",
    phrase: "搭乗ゲートは何番ですか？",
    phrasePron: "tōjō gēto wa nanban desu ka?",
    phraseHint: "탑승 게이트 몇 번이에요?",
    category: "transit",
    lat: 34.4347,
    lng: 135.2441,
    highlights: [
      "항공편 확정되면 시간 수정 — 출발 2시간 전 체크인",
      "면세점: 로이스·바통도르·위스키 마지막 픽업",
      "551호라이 돼지만두 공항점 — 기내 냄새 주의, 포장은 선물용만",
      "비행 중 둘이 사진 고르며 베스트 10 선정"
    ],
    prompt: "여행 총평 한 줄씩 — 다음 여행지 후보까지 정하기.",
    mapsQuery: "Kansai International Airport Departures"
  }
];

export const essentials = [
  "항공편 확정되면 Day 1 도착 / Day 3 출국 스톱 시간 수정",
  "우메다 공중정원 입장권 온라인 예매 (줄 스킵, 일몰 19:15 기준 18:45 입장)",
  "미즈노·키지·다루마 모두 웨이팅 명소 — 피크 30분 전 도착",
  "7월 오사카 = 한여름 (30℃+, 습함) — 오전 야외, 오후 실내 동선",
  "야외 일정(오사카성·신세카이)은 더위 보고 순서 스왑 OK",
  "Visit Japan Web 사전 등록 (7/2 도착 전)"
];

export const priorityLabels: Record<TripPriority, string> = {
  must: "필수",
  optional: "선택",
  backup: "후보"
};

export const stopPlanMeta: Record<string, StopPlanMeta> = {
  "kix-arrival": {
    priority: "must",
    durationMinutes: 60,
    alternatives: ["공항 리무진 버스 → 난바 OCAT", "JR 하루카 → 텐노지 경유"],
    flexTip: "입국 줄이 길면 라피트 다음 편으로 — 지정석은 현장 변경 가능."
  },
  "hotel-checkin": {
    priority: "must",
    durationMinutes: 30,
    alternatives: ["역 코인로커에 짐 넣고 바로 점심"],
    flexTip: "12시 전 도착하면 짐만 맡기고 미즈노 줄부터 서기."
  },
  "mizuno-okonomiyaki": {
    priority: "must",
    durationMinutes: 70,
    alternatives: ["치보 도톤보리 본점", "오코노미야키 산평", "후쿠타로 (난바)"],
    flexTip: "웨이팅 45분 넘으면 치보로 스위치 — 맛 차이보다 시간이 아까움.",
    riskLevel: "medium",
    riskNote: "평일 점심도 웨이팅 30분+ 흔함"
  },
  "kuromon-market": {
    priority: "optional",
    durationMinutes: 60,
    alternatives: ["센니치마에 도구야스지 (주방거리)", "난바워크 지하상가"],
    flexTip: "점심 배부르면 과일주스+한 입만. 16시 전엔 도착해야 활기 있음."
  },
  "shinsaibashi-amemura": {
    priority: "optional",
    durationMinutes: 100,
    alternatives: ["난바파크스 (옥상정원)", "오렌지스트리트 (호리에)"],
    flexTip: "더우면 아케이드 안으로만. 호리에 카페 골목까지 가면 +30분."
  },
  "uranamba-dinner": {
    priority: "must",
    durationMinutes: 90,
    alternatives: ["도톤보리 카니도라쿠 (게 요리)", "야키니쿠 — 츠루하시 이동 (지하철 10분)"],
    flexTip: "금~토 저녁 인기 가게는 만석 — 18시 초입 진입이 안전.",
    riskLevel: "medium",
    riskNote: "인기 다찌노미는 줄·만석 잦음"
  },
  "glico-night": {
    priority: "must",
    durationMinutes: 40,
    alternatives: ["톤보리 리버크루즈 야간 탑승"],
    flexTip: "에비스바시 위 인파 심하면 강변 데크에서 — 사진은 데크가 더 잘 나옴."
  },
  "ferris-don-quijote": {
    priority: "optional",
    durationMinutes: 30,
    alternatives: ["돈키호테 쇼핑만", "강변 산책"],
    flexTip: "운휴일 있음 — 당일 돌아가는지 확인하고 줄 길면 패스."
  },
  "bar-d1": {
    priority: "optional",
    durationMinutes: 70,
    alternatives: ["호텔 바", "편의점 츄하이 + 호텔"],
    flexTip: "첫날 무리 금지 — 내일 공중정원이 메인이니 컨디션 우선."
  },

  "morning-coffee": {
    priority: "optional",
    durationMinutes: 40,
    alternatives: ["Mel Coffee Roasters", "호텔 조식"],
    flexTip: "오사카성 더위 피하려면 카페 짧게 끊고 10시 전 출발."
  },
  "osaka-castle": {
    priority: "must",
    durationMinutes: 120,
    alternatives: ["천수각 입장 생략하고 니시노마루 정원만", "고자부네 뱃놀이"],
    flexTip: "한여름 한낮 — 물·모자 필수. 천수각 줄 30분+면 정원 뷰로 만족.",
    riskLevel: "medium",
    riskNote: "7월 폭염 + 천수각 입장 줄"
  },
  "kiji-okonomiyaki": {
    priority: "must",
    durationMinutes: 60,
    alternatives: ["한큐 디파치카 식당가", "신우메다쇼쿠도가이 (가이드 골목)"],
    flexTip: "13시 피크 — 12:30 전 도착하거나 14시 이후로 미루기.",
    riskLevel: "medium",
    riskNote: "줄 서는 노포 — 회전은 빠른 편"
  },
  "umeda-shopping": {
    priority: "optional",
    durationMinutes: 110,
    alternatives: ["루쿠아/루쿠아 이레", "NU차야마치"],
    flexTip: "지하 미로에서 길 잃으면 일단 지상으로. 쇼핑 짐은 호텔 말고 코인로커."
  },
  "hep-five": {
    priority: "must",
    durationMinutes: 40,
    alternatives: ["공중정원에서 야경으로 통합"],
    flexTip: "비 오면 관람차가 실내 대안으로 더 좋음 — 순서 자유롭게.",
    bookingStatus: "현장 발권"
  },
  "takimikoji-dinner": {
    priority: "optional",
    durationMinutes: 60,
    alternatives: ["우메다 한큐 디파치카 포장 → 공중정원 후 호텔", "차야마치 레스토랑"],
    flexTip: "일몰 시간 역산 — 18:45 전망대 입장이면 17:50 입점."
  },
  "umeda-sky-garden": {
    priority: "must",
    durationMinutes: 90,
    alternatives: ["헵파이브 야간 탑승", "하루카스 300 야간으로 대체"],
    flexTip: "흐리면 매직아워 없음 — 일기예보 보고 Day 3 하루카스와 스왑 고려.",
    openingHours: "09:30–22:30 (최종입장 22:00)",
    bookingStatus: "온라인 예매 권장",
    riskLevel: "medium",
    riskNote: "주말·일몰 시간대 매표 줄 김"
  },
  "bar-d2": {
    priority: "optional",
    durationMinutes: 60,
    alternatives: ["호텔 바", "도톤보리 크래프트 비어 바"],
    flexTip: "내일 체크아웃 — 1잔으로 가볍게, 짐 80% 싸두기."
  },

  "checkout-d3": {
    priority: "must",
    durationMinutes: 30,
    alternatives: ["난바역 코인로커 (호텔이 짐 보관 안 되면)"],
    flexTip: "10시 전 체크아웃 — 신세카이 더워지기 전에 도착."
  },
  "shinsekai-tsutenkaku": {
    priority: "must",
    durationMinutes: 80,
    alternatives: ["덴덴타운 (전자상가·피규어)", "텐노지 동물원"],
    flexTip: "전망대는 선택 — 거리 자체가 볼거리. 더우면 다루마 먼저.",
    riskLevel: "low"
  },
  "kushikatsu-daruma": {
    priority: "must",
    durationMinutes: 60,
    alternatives: ["야에카츠 (신세카이)", "텐구 (신세카이)"],
    flexTip: "본점 줄 길면 분점 — 맛 거의 동일. 11:30 오픈 직후가 골든타임.",
    riskLevel: "medium",
    riskNote: "토요일 점심 웨이팅"
  },
  "harukas-300": {
    priority: "optional",
    durationMinutes: 80,
    alternatives: ["16층 무료 테라스만", "신사이바시 마지막 쇼핑"],
    flexTip: "시간·체력 빠듯하면 스킵 1순위. 어제 공중정원으로 야경은 이미 충분.",
    bookingStatus: "당일권 가능"
  },
  "luggage-rapit": {
    priority: "must",
    durationMinutes: 70,
    alternatives: ["공항 리무진 버스 (난바 OCAT)", "JR 하루카 (텐노지에서)"],
    flexTip: "비행기 3시간 전 난바 출발이 안전 — 라피트 지정석 예매."
  },
  "kix-departure": {
    priority: "must",
    durationMinutes: 150,
    alternatives: [],
    flexTip: "절대 스킵 불가. 면세 쇼핑 시간 포함 2.5시간 잡기."
  }
};

export function getStopPlan(stopId: string): StopPlanMeta {
  return (
    stopPlanMeta[stopId] ?? {
      priority: "optional",
      durationMinutes: 60,
      alternatives: ["근처 카페 휴식", "다음 일정으로 바로 이동"],
      flexTip: "현장 컨디션에 따라 체류 시간을 조정.",
      openingHours: "",
      bookingStatus: "",
      riskLevel: "low",
      riskNote: ""
    }
  );
}

export const flexModes = [
  {
    id: "rain",
    title: "비 오는 날",
    description:
      "장마 끝물 소나기 가능 — 아케이드(신사이바시스지)·지하상가·헵파이브 관람차·하루카스 등 실내 동선으로 스왑. 공중정원은 맑은 날로."
  },
  {
    id: "hot",
    title: "너무 더운 날",
    description: "야외(오사카성·신세카이)는 오전으로 몰고, 한낮은 백화점·카페·전망대 실내로 피신."
  },
  {
    id: "tired",
    title: "피곤한 날",
    description: "선택/후보 일정을 숨기고 호텔 30분 낮잠 — 밤 일정(도톤보리·공중정원 야경)이 이 여행의 핵심이니 밤에 베팅."
  },
  {
    id: "usj",
    title: "USJ가 끌리는 날",
    description:
      "Day 2를 통째로 유니버설 스튜디오로 교체 가능 — 익스프레스 패스 없이는 한여름 대기 헬, 가려면 7시대 도착 권장."
  }
];
