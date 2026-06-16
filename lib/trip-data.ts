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
    title: "도착 미즈노 점심 → 잠깐 근무 → 무한리필 야키니쿠",
    mood: "13시 간사이 도착(캐리어 X) → 미즈노 점심 신고식 → 오후 잠깐 근무 → 19시 무한리필 야키니쿠 + 도톤보리 밤거리",
    summary:
      "MM736 간사이 T2 도착(13:15) → 라피트로 난바 → 미즈노 오코노미야키+생맥주(도착 점심, 가볍게) → (나) 오시고토카페 신사이바시 근무 / (여친) 신사이바시·아메무라 도보 → 리키마루 무한리필 야키니쿠(19:00 예약) → 양조소 맥주 2차·글리코·타코야키(선택) → 걸어서 혼마치 체크인. 미나미는 전부 호텔서 도보권.",
    journal: ""
  },
  {
    day: 2,
    date: "7/3 금",
    title: "우메다 셰어라운지 근무 → 난바 루프탑 디너",
    mood: "낮엔 각자(나=우메다 SHARE LOUNGE 근무 / 여친=우메다·텐진바시 도보), 밤엔 난바 CROUD DECK 루프탑에서 합류 — 느긋한 디너+야경",
    summary:
      "(나) 우메다 SHARE LOUNGE 오전 근무 → 점심 히고바시 합류: 世界一暇な 라멘 + TAKAMURA 와인&커피 → 오후 근무 / (여친) 텐진바시·한큐 디파치카 도보 → 난바 합류 → CROUD DECK 33층 루프탑 디너+칵테일+야경(새벽 2시까지) → 걸어서 귀가.",
    journal: ""
  },
  {
    day: 3,
    date: "7/4 토",
    title: "신세카이 레트로 → 18:15 출국",
    mood: "츠텐카쿠와 쿠시카츠, 구로몬 선물까지 — 15시 반 라피트 전까지 알차게",
    summary:
      "체크아웃(캐리어 없어 가볍게) → 신세카이·츠텐카쿠 레트로 산책 → 쿠시카츠 다루마 점심 → 구로몬 시장 주전부리·선물 → 라피트로 간사이공항 T2 → MM709 18:15 출국. 신세카이는 혼마치서 도보 30분.",
    journal: ""
  }
];

export const categoryLabels: Record<TripCategory, string> = {
  food: "미식",
  coffee: "커피·작업",
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
    time: "13:15",
    title: "간사이공항 T2 도착 (MM736)",
    subtitle: "캐리어 없이 가볍게 — 입국 후 바로 미나미로",
    nameZh: "関西国際空港 (KIX) 第2ターミナル",
    mrt: "T2 → 무료 셔틀 ~10분 → T1·난카이역 → 라피트 β 難波駅 (38분, ¥1,490 / 외국인 할인권 있음)",
    phrase: "すみません、南海電車の乗り場はどこですか？",
    phrasePron: "sumimasen, nankai densha no noriba wa doko desu ka?",
    phraseHint: "난카이 전철 타는 곳이 어디예요?",
    category: "transit",
    lat: 34.4347,
    lng: 135.2441,
    highlights: [
      "MM736 김포(11:25) → 간사이 T2 도착 ~13:15 (정확 시각 e-티켓 확인)",
      "캐리어 없음 — 코인로커·짐 동선 신경 끄고 바로 미나미 직행",
      "피치는 T2 전용 — 입국 후 무료 셔틀로 T1·난카이역 이동 (~10분)",
      "Visit Japan Web 미리 등록 → 입국심사 빠르게",
      "공항에서 ICOCA 충전 + 현금 ¥ 인출 (세븐뱅크 ATM)"
    ],
    prompt: "도착 첫 셀카. 라피트 철인28호 얼굴 닮은 열차 앞에서 한 장.",
    mapsQuery: "Kansai International Airport Terminal 2"
  },
  {
    id: "mizuno-okonomiyaki",
    day: 1,
    date: "7/2 목",
    time: "15:30",
    title: "미즈노 — 도착 점심 + 생맥주 신고식",
    subtitle: "1945년 창업 도톤보리 오코노미야키 — 도착하자마자 철판+생맥주",
    nameZh: "美津の (みづの) 道頓堀",
    mrt: "난바역(なんば駅) 14번 출구 도보 4분 — 라피트 하차 직후",
    phrase: "山芋焼きと生ビールをお願いします。",
    phrasePron: "yamaimo-yaki to nama-bīru o onegai shimasu",
    phraseHint: "야마이모야키랑 생맥주 주세요",
    category: "food",
    lat: 34.6686,
    lng: 135.5031,
    highlights: [
      "도착 직후 점심 — 15시대는 웨이팅 거의 없음 (저녁 줄 회피)",
      "시그니처 야마이모야키 + 생맥주로 오사카 신고식 (마 100% 반죽)",
      "철판 카운터석이면 눈앞에서 구워주는 라이브",
      "⚠️ 저녁 19시 무한리필 야키니쿠 대비 — 야마이모야키 한 판만 나눠 가볍게"
    ],
    prompt: "철판 위 사진 1장 + 도착 첫 생맥주 건배샷.",
    mapsQuery: "Mizuno Okonomiyaki Dotonbori"
  },
  {
    id: "work-d1",
    day: 1,
    date: "7/2 목",
    time: "16:30",
    title: "오후 근무 — 오시고토카페 신사이바시",
    subtitle: "오전반차 → 점심 후 오후 잠깐 업무 (전석 콘센트·Wi-Fi)",
    nameZh: "おしごとカフェ心斎橋 (心斎橋)",
    mrt: "미즈노(도톤보리)서 북쪽으로 도보 8분 / 신사이바시역 도보 1분",
    phrase: "電源とWi-Fiは使えますか？",
    phrasePron: "dengen to Wi-Fi wa tsukaemasu ka?",
    phraseHint: "콘센트랑 Wi-Fi 쓸 수 있나요?",
    category: "coffee",
    lat: 34.6735,
    lng: 135.5012,
    highlights: [
      "전석 콘센트 + Wi-Fi, 종일 최대 ¥1,000 — 짧은 오후 근무에 가성비 甲",
      "여자친구는 이 시간에 신사이바시스지·아메무라 도보 산책",
      "화상회의·통화 길면 호텔 객실 책상(USB·콘센트)도 안정적 대안",
      "대안: Cafe morning box(넓은 책상) / 세루프카페 신사이바시(무인·시간무제한)"
    ],
    prompt: "오늘 처리한 업무 한 줄 + 카페 자리 인증샷.",
    mapsQuery: "おしごとカフェ心斎橋"
  },
  {
    id: "shinsaibashi-amemura",
    day: 1,
    date: "7/2 목",
    time: "16:30",
    title: "신사이바시스지 + 아메리카무라 — 여친 도보 산책",
    subtitle: "내가 근무하는 동안 여친 솔로 코스 (저녁에 합류)",
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
      "아메무라 골목 구경 — 사는 건 없어도 보는 재미",
      "출출하면 아메무라 명물 아이스도그(튀긴 빵 아이스크림)",
      "근무 끝나는 18시쯤 도톤보리 양조소에서 합류 약속"
    ],
    prompt: "아메무라에서 제일 이상하고 웃긴 가게 한 컷.",
    mapsQuery: "Shinsaibashi-suji Shopping Street"
  },
  {
    id: "yakiniku-rikimaru",
    day: 1,
    date: "7/2 목",
    time: "19:00",
    title: "리키마루 — 무한리필 야키니쿠 (목 19:00 예약)",
    subtitle: "난카이 난바점 — 도착 첫날 고기 폭식 신고식",
    nameZh: "焼肉 力丸 南海なんば店 (難波千日前12-28 大阪難波ビル4F)",
    mrt: "신사이바시 카페서 남쪽 도보 12분 / 난바역 3번 출구 도보 2분",
    phrase: "19時に予約した〇〇です。食べ放題でお願いします。",
    phrasePron: "jūku-ji ni yoyaku shita 〇〇 desu. tabehōdai de onegai shimasu",
    phraseHint: "19시에 예약한 ○○입니다. 무한리필로 부탁해요",
    category: "food",
    lat: 34.664953,
    lng: 135.502035,
    highlights: [
      "목 19:00 예약 — 도착(13:15) 후 여유, 비행 지연 버퍼도 OK",
      "무한리필이니 점심 미즈노는 가볍게 → 빈속으로 고기 폭식",
      "근무(~18:30) 끝나고 신사이바시서 난바로 도보 12분 (여친 합류)",
      "냄새 배는 메뉴 — 다음이 캐주얼 도톤보리 밤거리라 딱 (금 루프탑 X)"
    ],
    prompt: "베스트 부위 1픽 + 둘이 먹은 양 기록 (정산).",
    mapsQuery: "焼肉力丸 南海なんば店"
  },
  {
    id: "dotonbori-beer",
    day: 1,
    date: "7/2 목",
    time: "20:30",
    title: "도톤보리 크래프트 비어 양조소 — 양조 생맥주 2차 (선택)",
    subtitle: "야키니쿠 후 오사카 자체 양조 생맥주 한 잔",
    nameZh: "道頓堀クラフトビア醸造所 (なんばCITY / 道頓堀)",
    mrt: "야키니쿠(난바)서 도보 3분 난바CITY 내 / 도톤보리 본점은 글리코 가는 길",
    phrase: "クラフトビールのおすすめを一杯ください。",
    phrasePron: "kurafuto bīru no osusume o ippai kudasai",
    phraseHint: "추천 크래프트 맥주 한 잔 주세요",
    category: "beer",
    lat: 34.6618,
    lng: 135.5013,
    highlights: [
      "오사카 켈쉬·알트·포터 등 자체 양조 생맥주 (¥495~)",
      "야키니쿠로 배부르면 딱 한 잔만 — 2차 개념",
      "평일 17:00~22:00 영업 (15~17시 브레이크 있음)",
      "도톤보리 본점(松竹座 B2)도 가능 — 글리코 가는 길에 더 가까움"
    ],
    prompt: "오늘 마신 양조 맥주 종류 + 첫 모금 표정.",
    mapsQuery: "道頓堀クラフトビア醸造所 なんばCITY"
  },
  {
    id: "takoyaki-dotonbori",
    day: 1,
    date: "7/2 목",
    time: "20:50",
    title: "도톤보리 타코야키 — 후식 한 손",
    subtitle: "쿠쿠루 vs 와나카 vs 아이즈야 — 본고장 첫 타코야키 (후식)",
    nameZh: "たこ焼き くくる / わなか / 会津屋",
    mrt: "도톤보리 거리 — 미즈노에서 도보 2분",
    phrase: "ソースとマヨネーズ抜きでもできますか？",
    phrasePron: "sōsu to mayonēzu nuki demo dekimasu ka?",
    phraseHint: "소스·마요 빼고도 되나요? (원조 아이즈야 스타일)",
    category: "food",
    lat: 34.6688,
    lng: 135.5021,
    highlights: [
      "저녁 직후니 한 팩(6~8개)을 둘이 나눠서",
      "쿠쿠루(문어 큼직)·와나카(반죽 폭신)·아이즈야(소스 없는 원조) 취향 픽",
      "갓 나온 건 속이 용암 — 호호 불어서, 화상 주의",
      "강변 데크에 앉아서 네온 보며 먹기"
    ],
    prompt: "타코야키 가게 어디 골랐는지 + 한입 리액션 영상.",
    mapsQuery: "Takoyaki Kukuru Dotonbori"
  },
  {
    id: "glico-night",
    day: 1,
    date: "7/2 목",
    time: "21:10",
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
    time: "21:25",
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
    id: "uranamba-dinner",
    day: 1,
    date: "7/2 목",
    time: "21:30",
    title: "우라난바 — 이자카야 골목 한잔",
    subtitle: "저녁은 끝났으니 가볍게 — 로컬 골목 2차",
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
      "다찌노미에서 사케 한 잔 + 안주 한 접시면 충분",
      "피곤하면 패스하고 호텔 라운지/편의점 츄하이로",
      "혼마치 복귀는 도보 ~20분 (밤산책)"
    ],
    prompt: "오늘 들어간 가게 이름 + 베스트 안주 한 줄.",
    mapsQuery: "Uranamba Osaka izakaya"
  },
  {
    id: "bar-d1",
    day: 1,
    date: "7/2 목",
    time: "22:30",
    title: "미나미 칵테일 바 — 첫 밤 마무리 (선택)",
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
      "Bar Nayuta / BAR JUNIPER Trinity / 호텔 루프탑 바 후보",
      "취향대로 — 한 명은 위스키, 한 명은 프루티 칵테일",
      "차지(테이블 차지) ¥500~1,000 미리 확인",
      "걸어서 귀가 — 신사이바시→혼마치 12분"
    ],
    prompt: "서로에게 '오늘 최고 순간' 하나씩 말하고 기록.",
    mapsQuery: "Bar Nayuta Osaka"
  },
  {
    id: "hotel-checkin",
    day: 1,
    date: "7/2 목",
    time: "22:45",
    title: "걸어서 귀가 → 그랑벨 호텔 체크인",
    subtitle: "혼마치 베이스캠프 — 캐리어 없어 밤에 느긋하게 입실",
    nameZh: "大阪グランベルホテル (本町・北久宝寺町2-6-7)",
    mrt: "도톤보리·난바에서 북쪽으로 도보 ~20분 (밤산책 겸) / 사카이스지혼마치역 도보 3분",
    phrase: "予約しています。チェックインお願いします。",
    phrasePron: "yoyaku shiteimasu. chekku-in onegai shimasu",
    phraseHint: "예약했어요. 체크인 부탁드려요",
    category: "hotel",
    lat: 34.6818,
    lng: 135.5058,
    highlights: [
      "데이백 하나라 낮에 체크인 안 하고 밤에 입실해도 무방 (호텔이 동선 중간)",
      "낮에 짐 두고 가볍게 다니고 싶으면 미즈노 후 잠깐 들러도 OK",
      "최상층 루프탑 바·대욕장(숙박객 무료)으로 첫날 마무리",
      "신세카이(에비스초)까지 도보 30분 — Day 3 동선도 걸어서 가능"
    ],
    prompt: "베이스캠프 첫인상 한 줄 + 방 뷰 한 컷.",
    mapsQuery: "GRANBELL HOTEL OSAKA"
  },

  // ───────── Day 2 (7/3 금) ─────────
  {
    id: "morning-coffee",
    day: 2,
    date: "7/3 금",
    time: "09:00",
    title: "모닝 커피 — LiLo Coffee Roasters (선택)",
    subtitle: "각자 흩어지기 전 신사이바시 스페셜티 한 잔",
    nameZh: "LiLo Coffee Roasters (心斎橋)",
    mrt: "신사이바시역(心斎橋駅) 7번 출구 도보 3분 (호텔서 도보 12분)",
    phrase: "ハンドドリップでおすすめの豆はどれですか？",
    phrasePron: "hando dorippu de osusume no mame wa dore desu ka?",
    phraseHint: "핸드드립으로 추천하는 원두는 뭐예요?",
    category: "coffee",
    lat: 34.6738,
    lng: 135.4997,
    highlights: [
      "오사카 스페셜티 신 대표 로스터리 — 원두 선물용 구매도",
      "SHARE LOUNGE에 프리드링크 있으니 생략 가능 — 여친 코스로도 OK",
      "대안: Mel Coffee Roasters / % Arabica (혼잡)"
    ],
    prompt: "오늘의 원두 이름 기록 + 컵 들고 한 컷.",
    mapsQuery: "LiLo Coffee Roasters Osaka"
  },
  {
    id: "work-d2",
    day: 2,
    date: "7/3 금",
    time: "10:00",
    title: "우메다 SHARE LOUNGE — 풀데이 근무",
    subtitle: "LUCUA 1100 9F, JR 오사카역 내려다보는 코워킹 라운지",
    nameZh: "SHARE LOUNGE 梅田 蔦屋書店 (LUCUA 1100 9F)",
    mrt: "혼마치/난바서 미도스지선 우메다 — 또는 미도스지 거리 도보 ~35분",
    phrase: "ドロップインで一名、利用できますか？",
    phrasePron: "doroppu-in de ichimei, riyō dekimasu ka?",
    phraseHint: "드롭인으로 한 명 이용 가능할까요?",
    category: "coffee",
    lat: 34.7025,
    lng: 135.4958,
    highlights: [
      "영업 8:30–21:00 — 10–17시 근무 풀커버, 고속 Wi-Fi·콘센트·프리드링크/스낵",
      "요금 소프트드링크 60분 ¥1,100 + 30분 ¥550 (앱 결제 10%↓) — 1일 정액 플랜 있는지 현장 확인",
      "절경석(오사카역 뷰)·개인부스 — 화상회의는 부스/조용한 자리로",
      "점심엔 히고바시 라멘+TAKAMURA 합류(요쓰바시선 2정거장) 후 오후 블록 복귀",
      "여친은 이 시간 텐진바시 먹방·한큐 디파치카 도보 / 비싸면 대안: 우메다 코워킹 ~¥2,200/일"
    ],
    prompt: "오늘 끝낸 업무 + 창밖 오사카역 뷰 한 컷.",
    mapsQuery: "SHARE LOUNGE 梅田 蔦屋書店 LUCUA 1100"
  },
  {
    id: "tenjinbashi-gourmet",
    day: 2,
    date: "7/3 금",
    time: "10:30",
    title: "텐진바시스지 상점가 — 여친 먹방 산책",
    subtitle: "일본에서 제일 긴 상점가(2.6km), 군것질 천국 (여친 솔로/선택)",
    nameZh: "天神橋筋商店街",
    mrt: "우메다권에서 사카이스지선 오기마치역(扇町駅) 등 — SHARE LOUNGE서 가까운 북쪽",
    phrase: "一番人気はどれですか？",
    phrasePron: "ichiban ninki wa dore desu ka?",
    phraseHint: "제일 인기 있는 게 뭐예요?",
    category: "food",
    lat: 34.7049,
    lng: 135.5113,
    highlights: [
      "나카무라야 고로케 — 한 개 ¥100대, 갓 튀긴 걸로",
      "지붕 덮인 아케이드 — 한여름에도 시원하게 걷기",
      "단고·센베이·교자 등 사 먹으며 남→북으로 슬슬",
      "여친 솔로 코스 — 점심에 우메다서 합류 가능"
    ],
    prompt: "여친이 고른 군것질 베스트 1 + 가격 (정산).",
    mapsQuery: "Tenjinbashisuji Shopping Street"
  },
  {
    id: "osaka-castle",
    day: 2,
    date: "7/3 금",
    time: "10:40",
    title: "오사카성 (후보) — 가벼운 외관 산책",
    subtitle: "먹방 테마면 패스 OK — 가면 해자+외관만 가볍게",
    nameZh: "大阪城天守閣 · 西の丸庭園",
    mrt: "다니마치욘초메역(谷町四丁目駅) 1-B 출구 도보 15분",
    phrase: "天守閣のチケットを二枚ください。",
    phrasePron: "tenshukaku no chiketto o nimai kudasai",
    phraseHint: "천수각 티켓 두 장 주세요",
    category: "sight",
    lat: 34.6873,
    lng: 135.5262,
    highlights: [
      "테마는 먹방·노는 거 — 갈 거면 입장 말고 해자·외관 30분만",
      "니시노마루 정원(¥200) 해자 건너 뷰가 사진은 최고",
      "7월 한낮 폭염 — 컨디션 안 좋으면 미련 없이 패스",
      "텐진바시 먹방이 더 끌리면 그쪽에 시간 몰아주기"
    ],
    prompt: "해자 + 천수각 배경 사진. 더위 체감 한 줄.",
    mapsQuery: "Osaka Castle Nishinomaru Garden"
  },
  {
    id: "ramen-sekaiichi",
    day: 2,
    date: "7/3 금",
    time: "12:45",
    title: "세상에서 가장 한가한 라멘 — 점심 합류",
    subtitle: "이름과 달리 행렬 필수, 나카노시마의 도시형 라멘바",
    nameZh: "世界一暇なラーメン屋 (中之島ダイビル 2F)",
    mrt: "히고바시역(肥後橋駅)·와타나베바시역 도보 3분 — 우메다서 요쓰바시선 2정거장/도보 15분",
    phrase: "おすすめのラーメンを二つお願いします。",
    phrasePron: "osusume no rāmen o futatsu onegai shimasu",
    phraseHint: "추천 라멘 두 개 주세요",
    category: "food",
    lat: 34.6932,
    lng: 135.4922,
    highlights: [
      "'세상에서 제일 한가한'은 반어 — 실제론 오사카 인기 라멘바 (행렬 필수)",
      "인기 라멘집 운영사(人類みな麺類 계열) 도시형 라멘 — 5종 + 마제소바",
      "근무 오전 블록 마치고 12시대 합류 — 줄 감안해 일찍",
      "라멘 후 도보 5분 TAKAMURA로 커피 디저트"
    ],
    prompt: "오늘 고른 라멘 한 컷 + 국물 첫 모금 평점.",
    mapsQuery: "世界一暇なラーメン屋 中之島"
  },
  {
    id: "takamura-coffee",
    day: 2,
    date: "7/3 금",
    time: "14:00",
    title: "TAKAMURA Wine & Coffee — 스페셜티 커피·와인",
    subtitle: "660㎡ 창고형 공간, 와인 3800종 + 자가배전 커피",
    nameZh: "TAKAMURA Wine & Coffee Roasters (西区江戸堀2-2-18)",
    mrt: "라멘서 도보 5분 / 히고바시역 도보 10분 — 호텔(혼마치)서도 도보 15분",
    phrase: "ハンドドリップのおすすめを一杯ください。",
    phrasePron: "hando dorippu no osusume o ippai kudasai",
    phraseHint: "핸드드립 추천 한 잔 주세요",
    category: "coffee",
    lat: 34.6880,
    lng: 135.4930,
    highlights: [
      "거대 창고형 카페 — 자가배전 스페셜티 커피 + 와인 3800종 구경",
      "원두·와인 선물용 쇼핑도 (영업 11:00–19:30, 수요일 휴무 → 금 영업)",
      "오후 근무를 여기서 이어가도 OK (히고바시→난바 요쓰바시선 직통 7분)",
      "느긋하게 — 저녁 CROUD DECK 전 커피 타임"
    ],
    prompt: "오늘의 원두/와인 한 컷 + 커피 평.",
    mapsQuery: "TAKAMURA Wine & Coffee Roasters"
  },
  {
    id: "umeda-shopping",
    day: 2,
    date: "7/3 금",
    time: "14:30",
    title: "우메다 — 한큐 디파치카 (여친 코스)",
    subtitle: "백화점 지하 식품관 구경 + 디저트 한 입 (여친 솔로/선택)",
    nameZh: "阪急うめだ本店 デパ地下 · 茶屋町",
    mrt: "우메다역(梅田駅) — 한큐/지하철/JR 오사카역 전부 연결",
    phrase: "一つだけでも買えますか？",
    phrasePron: "hitotsu dake demo kaemasu ka?",
    phraseHint: "하나만 사도 되나요?",
    category: "food",
    lat: 34.7026,
    lng: 135.4985,
    highlights: [
      "한큐 우메다 본점 디파치카 — 일본 최고 수준 식품관 구경 자체가 투어",
      "바통도르·갓 구운 치즈케이크(리쿠로 오지상) 등 디저트 한 입씩",
      "여친 솔로 코스 — SHARE LOUNGE 바로 근처라 합류도 쉬움",
      "저녁 야키니쿠 역산해서 과식 금지"
    ],
    prompt: "디파치카에서 제일 충격적이었던 음식 한 컷.",
    mapsQuery: "Hankyu Umeda Main Store"
  },
  {
    id: "umeda-sky-garden",
    day: 2,
    date: "7/3 금",
    time: "15:30",
    title: "우메다 공중정원 — 주간뷰 (선택)",
    subtitle: "야경은 밤 CROUD DECK로 대체 — 여친이 낮에 들르는 옵션",
    nameZh: "梅田スカイビル 空中庭園展望台",
    mrt: "오사카역(大阪駅) 중앙북출구 도보 10분 (지하도 경유) — SHARE LOUNGE서 도보권",
    phrase: "展望台のチケットを二枚お願いします。",
    phrasePron: "tenbōdai no chiketto o nimai onegai shimasu",
    phraseHint: "전망대 티켓 두 장 주세요",
    category: "sight",
    lat: 34.7053,
    lng: 135.4900,
    highlights: [
      "야경 하이라이트는 밤에 난바 CROUD DECK 루프탑으로 — 여기는 선택",
      "여친이 우메다 도보 코스 중 주간뷰로 들르기 좋음 (¥2,000/인)",
      "맑은 날 어제 못 본 일몰 보고 싶으면 18:45 입장으로 재배치도 가능",
      "옥상 스카이워크 360° — 시간 남을 때만"
    ],
    prompt: "주간 스카이라인 한 컷 (밤 CROUD DECK와 비교용).",
    mapsQuery: "Umeda Sky Building Kuchu Teien Observatory"
  },
  {
    id: "hep-five",
    day: 2,
    date: "7/3 금",
    time: "16:30",
    title: "헵파이브 — 빨간 관람차 (여친/합류)",
    subtitle: "우메다 한복판 옥상 위 빨간 바퀴",
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
      "근무 마치고 17시쯤 잠깐 같이 타고 난바로 출발도 OK",
      "맑으면 멀리 항구까지 보임"
    ],
    prompt: "곤돌라 안 셀카 + 그 순간 튼 노래 제목 기록.",
    mapsQuery: "HEP FIVE Ferris Wheel"
  },
  {
    id: "croud-deck",
    day: 2,
    date: "7/3 금",
    time: "18:30",
    title: "CROUD DECK — 루프탑 디너 + 야경 (금요일 메인)",
    subtitle: "센타라그랜드 33F 지상 130m 루프탑 — 근무 후 느긋한 디너·칵테일·야경",
    nameZh: "クルードデッキ / センタラグランドホテル大阪 33F (難波中2-11-50)",
    mrt: "우메다→난바 미도스지선 8분 → 난바역 도보 4분 (난바파크스 남측)",
    phrase: "夜景の見えるテラス席を予約した〇〇です。",
    phrasePron: "yakei no mieru terasu-seki o yoyaku shita 〇〇 desu",
    phraseHint: "야경 보이는 테라스석 예약한 ○○입니다",
    category: "whisky",
    lat: 34.6600,
    lng: 135.5008,
    highlights: [
      "금요일 저녁 메인 — 일 끝나고 고기 연기 없이 산뜻하게 디너+칵테일",
      "지상 130m 옥외 테라스에서 오사카 야경 + 그릴·와인·칵테일 (17:30–익일 2:00)",
      "우메다 공중정원 야경을 이걸로 대체 — 난바 도보권이라 교통 0",
      "테라스 야경석은 인기 — OZmall/一休에서 미리 예약 권장",
      "끝나고 걸어서 귀가 — 난바→혼마치 ~20분 밤산책"
    ],
    prompt: "루프탑 야경 배경 커플샷 — 이 여행의 밤 대표컷.",
    mapsQuery: "CRUDO DECK Centara Grand Hotel Osaka"
  },

  // ───────── Day 3 (7/4 토) ─────────
  {
    id: "checkout-d3",
    day: 3,
    date: "7/4 토",
    time: "09:30",
    title: "체크아웃 — 가볍게 출발",
    subtitle: "캐리어 없어 짐 동선 걱정 X — 몸 가볍게 마지막 반나절",
    nameZh: "チェックアウト (大阪グランベルホテル)",
    mrt: "호텔 → 신세카이는 도보 30분(or 사카이스지혼마치→에비스초 직통 8분)",
    phrase: "チェックアウトお願いします。",
    phrasePron: "chekku-auto onegai shimasu",
    phraseHint: "체크아웃 부탁드려요",
    category: "hotel",
    lat: 34.6818,
    lng: 135.5058,
    highlights: [
      "10시 전 체크아웃 — 데이백 하나라 짐 보관도 불필요",
      "여권·지갑·보조배터리만 챙기기",
      "오늘은 신세카이 쿠시카츠 → 구로몬 — 아침 가볍게"
    ],
    prompt: "빠뜨린 것 없는지 서로 크로스체크.",
    mapsQuery: "GRANBELL HOTEL OSAKA"
  },
  {
    id: "shinsekai-tsutenkaku",
    day: 3,
    date: "7/4 토",
    time: "10:20",
    title: "신세카이 — 츠텐카쿠 레트로 산책",
    subtitle: "쇼와 감성 그대로, 빌리켄 발바닥 만지기",
    nameZh: "新世界 · 通天閣",
    mrt: "호텔서 도보 30분(밤산책 겸) / 에비스초역(恵美須町駅) 3번 출구 도보 3분",
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
    id: "kuromon-market",
    day: 3,
    date: "7/4 토",
    time: "13:00",
    title: "구로몬 시장 — 마지막 먹방",
    subtitle: "오사카의 부엌 — 디저트 배에 남은 자리 채우기",
    nameZh: "黒門市場",
    mrt: "신세카이서 도보 ~20분 / 닛폰바시역 10번 출구 도보 2분",
    phrase: "これを二つください。",
    phrasePron: "kore o futatsu kudasai",
    phraseHint: "이거 두 개 주세요",
    category: "food",
    lat: 34.6657,
    lng: 135.5063,
    highlights: [
      "쿠시카츠 점심 직후니 디저트 위주 — 멜론·복숭아 주스, 컷과일",
      "참치·우니 꼬치는 둘이 하나씩만 — 배보다 추억",
      "이 여행 마지막 한 입 — 제일 아쉬운 걸로 고르기",
      "14:30 전엔 출발 — 라피트 역산"
    ],
    prompt: "제일 맛있었던 한 입 + 가격 기록 (정산용).",
    mapsQuery: "Kuromon Ichiba Market"
  },
  {
    id: "harukas-300",
    day: 3,
    date: "7/4 토",
    time: "14:00",
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
      "지상 300m — 낮 뷰는 여기, 밤 뷰는 어제 CROUD DECK 루프탑으로 완성",
      "입장 ¥2,000/인 — 시간 빠듯하면 과감히 스킵",
      "16층 무료 정원 테라스만 들러도 충분히 좋음",
      "여기서 바로 텐노지역 → 난바 복귀 동선 깔끔"
    ],
    prompt: "어제 밤 CROUD DECK vs 오늘 낮 하루카스 — 한 줄 비교.",
    mapsQuery: "Harukas 300 Observatory Abeno"
  },
  {
    id: "luggage-rapit",
    day: 3,
    date: "7/4 토",
    time: "14:50",
    title: "라피트로 공항 이동",
    subtitle: "난바 → 라피트 38분 (짐 가벼움)",
    nameZh: "なんば駅 → 関西空港 (ラピート)",
    mrt: "난카이 난바역 2F 라피트 지정석 — 캐리어 없어 환승 가뿐",
    phrase: "関西空港行きのラピートはこのホームですか？",
    phrasePron: "kansai kūkō yuki no rapīto wa kono hōmu desu ka?",
    phraseHint: "간사이공항행 라피트 이 승강장 맞아요?",
    category: "transit",
    lat: 34.6643,
    lng: 135.5023,
    highlights: [
      "15:30 전후 라피트 탑승 목표 → 16:10경 KIX T1 → 셔틀로 T2 (~10분)",
      "라피트 지정석 미리 예매해두면 마음 편함",
      "ICOCA 잔액은 편의점에서 털기",
      "데이백 하나라 코인로커·짐 픽업 불필요"
    ],
    prompt: "차창 밖 마지막 오사카 풍경 한 컷.",
    mapsQuery: "Nankai Namba Station Rapit"
  },
  {
    id: "kix-departure",
    day: 3,
    date: "7/4 토",
    time: "16:30",
    title: "간사이공항 T2 — MM709 18:15 출국",
    subtitle: "체크인 → 보안 → 게이트, 여행 회고",
    nameZh: "関西国際空港 第2ターミナル 出発",
    mrt: "난카이 간사이공항역(T1) → 무료 셔틀 ~10분 → T2",
    phrase: "搭乗ゲートは何番ですか？",
    phrasePron: "tōjō gēto wa nanban desu ka?",
    phraseHint: "탑승 게이트 몇 번이에요?",
    category: "transit",
    lat: 34.4347,
    lng: 135.2441,
    highlights: [
      "MM709 18:15 출발 — 피치 체크인 마감 17:25 (출발 50분 전)",
      "T2는 면세·식당이 단출 — 쇼핑·식사는 시내/T1에서 미리",
      "기내식 불포함 — 탑승 전 간단히 먹거나 간식 챙기기",
      "비행 중 둘이 사진 고르며 베스트 10 선정"
    ],
    prompt: "여행 총평 한 줄씩 — 다음 여행지 후보까지 정하기.",
    mapsQuery: "Kansai International Airport Terminal 2"
  }
];

export const essentials = [
  "7/2 김포공항 10:00 도착 목표 (MM736 11:25 출발 — 체크인 마감 10:35)",
  "캐리어 없음 — 데이백 하나로 가볍게, 코인로커·짐 보관 신경 X",
  "목(7/2)=오전반차·오후 잠깐 근무 / 금(7/3)=우메다 SHARE LOUNGE 풀데이 근무",
  "혼마치 호텔 기준 미나미는 전부 도보권 — 대중교통은 우메다↔난바 정도만",
  "목 19:00 리키마루 무한리필 야키니쿠(난카이 난바점) 예약 / 금 저녁은 CROUD DECK 루프탑 디너+야경",
  "피치항공은 간사이 T2 — 갈 때·올 때 T1↔T2 무료 셔틀 ~10분 역산",
  "미즈노(저녁)·키지·다루마 모두 웨이팅 명소 — 피크 30분 전 도착",
  "7월 오사카 = 한여름 (30℃+, 습함) — 오전 야외, 오후 실내(근무 카페) 동선",
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
    durationMinutes: 90,
    alternatives: ["공항 리무진 버스 → 난바 OCAT", "공항급행+사카이스지선 (텐가차야 환승, 호텔 직통)"],
    flexTip: "T2 입국·셔틀 포함 90분 잡기 — 캐리어 없어 동선 가뿐, 바로 신사이바시로.",
    riskLevel: "medium",
    riskNote: "T2 ↔ 난카이역(T1) 셔틀 시간 누락 주의"
  },
  "work-d1": {
    priority: "must",
    durationMinutes: 120,
    alternatives: ["Cafe morning box (넓은 책상)", "세루프카페 신사이바시 (무인·시간무제한)", "호텔 객실 책상"],
    flexTip: "오전반차라 오후 2시간 집중 — 통화 길면 객실 책상으로. 여친은 신사이바시 도보.",
    openingHours: "오시고토카페 — 영업시간 현장 확인",
    riskLevel: "low"
  },
  "shinsaibashi-amemura": {
    priority: "optional",
    durationMinutes: 120,
    alternatives: ["난바파크스 (옥상정원)", "오렌지스트리트 (호리에)"],
    flexTip: "여친 솔로 코스 — 내 근무 끝나는 17시쯤 호텔/도톤보리에서 합류."
  },
  "hotel-checkin": {
    priority: "must",
    durationMinutes: 30,
    alternatives: ["미즈노 점심 후 잠깐 들러 가방 두고 가볍게", "밤에 한 번에 입실"],
    flexTip: "캐리어 없어 밤 입실 OK — 호텔이 동선 중간이라 아무 때나 들러도 됨."
  },
  "mizuno-okonomiyaki": {
    priority: "must",
    durationMinutes: 80,
    alternatives: ["치보 도톤보리 본점", "오코노미야키 산평", "후쿠타로 (난바)"],
    flexTip: "도착 점심(15시대)이라 웨이팅 거의 없음 — 야마이모야키+생맥주로 신고식.",
    riskLevel: "low",
    riskNote: "오후 시간대라 저녁 피크 줄 회피"
  },
  "takoyaki-dotonbori": {
    priority: "optional",
    durationMinutes: 25,
    alternatives: ["와나카 센니치마에 본점", "아이즈야 난바점 (소스 없는 원조)"],
    flexTip: "양조소에서 배부르면 패스 — 후식으로 6~8개 한 팩만 나눠서."
  },
  "dotonbori-beer": {
    priority: "optional",
    durationMinutes: 40,
    alternatives: ["도톤보리 본점(松竹座 B2)", "우라난바 다찌노미", "스프링밸리 등 비어바"],
    flexTip: "야키니쿠 후 2차 — 한 잔만. 무한리필로 배부르면 미련 없이 패스.",
    openingHours: "평일 17:00–22:00 (15~17시 브레이크)",
    riskLevel: "low"
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
  "uranamba-dinner": {
    priority: "optional",
    durationMinutes: 60,
    alternatives: ["호텔 루프탑 바", "편의점 츄하이 + 호텔"],
    flexTip: "2차 개념 — 첫날 무리 금지, 컨디션 보고 한 곳만."
  },
  "bar-d1": {
    priority: "optional",
    durationMinutes: 70,
    alternatives: ["호텔 루프탑 바", "편의점 츄하이 + 호텔 창가"],
    flexTip: "첫날 무리 금지 — 내일 밤 CROUD DECK 루프탑이 있으니 가볍게."
  },

  "morning-coffee": {
    priority: "optional",
    durationMinutes: 30,
    alternatives: ["SHARE LOUNGE 프리드링크로 대체", "호텔 조식"],
    flexTip: "각자 흩어지기 전 한 잔 — 생략하고 바로 우메다 근무 출발도 OK."
  },
  "work-d2": {
    priority: "must",
    durationMinutes: 420,
    alternatives: ["우메다 코워킹 드롭인 (~¥2,200/일)", "TSUTAYA 이노게이트 오사카 SHARE LOUNGE"],
    flexTip: "10–17시 근무 앵커 — 1일 정액 플랜 있는지 확인(시간제 7시간이면 ~¥7,700). 점심엔 키지 합류 가능.",
    openingHours: "08:30–21:00",
    bookingStatus: "앱 예약 권장(2주 전~15분 전) / 드롭인 가능",
    riskLevel: "low"
  },
  "tenjinbashi-gourmet": {
    priority: "optional",
    durationMinutes: 90,
    alternatives: ["한큐 디파치카로 통합", "여친 신사이바시 쇼핑"],
    flexTip: "여친 솔로 먹방 — 남쪽에서 북으로, 점심 키지 역산해 배 70%만."
  },
  "osaka-castle": {
    priority: "backup",
    durationMinutes: 40,
    alternatives: ["텐진바시스지 먹방에 시간 몰아주기", "니시노마루 정원 뷰만 30분"],
    flexTip: "노는 게 메인이라 후보 — 가더라도 외관 산책만, 폭염이면 패스.",
    riskLevel: "medium",
    riskNote: "7월 폭염"
  },
  "ramen-sekaiichi": {
    priority: "must",
    durationMinutes: 60,
    alternatives: ["人類みな麺類 (본점)", "키지 모단야키 (우메다 스카이빌딩)"],
    flexTip: "꼭 가고 싶은 곳 — 행렬 필수라 12시대 일찍. 오전 근무 마치고 우메다서 요쓰바시선 2정거장.",
    riskLevel: "medium",
    riskNote: "이름과 달리 인기점 — 점심 피크 웨이팅"
  },
  "takamura-coffee": {
    priority: "must",
    durationMinutes: 60,
    alternatives: ["LiLo Coffee (신사이바시)", "Mel Coffee Roasters"],
    flexTip: "꼭 가고 싶은 곳 — 라멘서 도보 5분. 11:00–19:30, 수요일 휴무(금 영업). 오후 근무 이어가도 OK.",
    openingHours: "11:00–19:30 (수요일 휴무)",
    riskLevel: "low"
  },
  "umeda-shopping": {
    priority: "optional",
    durationMinutes: 90,
    alternatives: ["루쿠아 지하 식품관", "리쿠로 오지상 치즈케이크 본점 (난바)"],
    flexTip: "여친 코스 — SHARE LOUNGE 근처라 합류 쉬움. 저녁 야키니쿠 역산해 디저트만."
  },
  "umeda-sky-garden": {
    priority: "optional",
    durationMinutes: 60,
    alternatives: ["밤 CROUD DECK 루프탑으로 야경 통합", "헵파이브 관람차"],
    flexTip: "야경은 밤 난바 CROUD DECK로 대체 → 여기는 여친 주간뷰 선택. 일몰 보고 싶으면 18:45로 재배치.",
    openingHours: "09:30–22:30 (최종입장 22:00)",
    bookingStatus: "선택 — 갈 거면 온라인 예매"
  },
  "hep-five": {
    priority: "optional",
    durationMinutes: 40,
    alternatives: ["밤 CROUD DECK 루프탑으로 통합"],
    flexTip: "근무 마치고 17시쯤 잠깐 같이 타고 난바로 — 비 오면 실내 대안.",
    bookingStatus: "현장 발권"
  },
  "yakiniku-rikimaru": {
    priority: "must",
    durationMinutes: 90,
    alternatives: ["근처 난바 야키니쿠로 변경", "우라난바 이자카야"],
    flexTip: "목 19:00 예약 — 도착 첫날 저녁. 근무 ~18:30 종료 후 신사이바시→난바 도보 12분. 미즈노 점심은 가볍게.",
    openingHours: "목 16:00–익일 0:00",
    bookingStatus: "예약 완료 (목 19:00)",
    riskLevel: "low"
  },
  "croud-deck": {
    priority: "must",
    durationMinutes: 120,
    alternatives: ["心斎橋 LIME (수족관 다이닝 바, 귀갓길)", "난바 야키니쿠 외 그릴/다이닝"],
    flexTip: "금요일 저녁 메인 — 근무 후 디너+칵테일+야경. 테라스 야경석 미리 예약. 끝나고 걸어서 귀가.",
    openingHours: "17:30–익일 2:00",
    bookingStatus: "테라스석 예약 권장",
    riskLevel: "medium",
    riskNote: "주말 인기 — 테라스석 만석 가능"
  },

  "checkout-d3": {
    priority: "must",
    durationMinutes: 20,
    alternatives: ["체크아웃만 — 짐 보관 불필요(데이백)"],
    flexTip: "10시 전 체크아웃 — 신세카이 더워지기 전 도착(도보 30분)."
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
  "kuromon-market": {
    priority: "optional",
    durationMinutes: 60,
    alternatives: ["센니치마에 도구야스지 (주방거리)", "난바워크 지하상가"],
    flexTip: "14:30 전 출발 엄수 — 빠듯하면 스킵하고 바로 라피트로."
  },
  "harukas-300": {
    priority: "backup",
    durationMinutes: 60,
    alternatives: ["16층 무료 테라스만", "구로몬 시장에 시간 더 쓰기"],
    flexTip: "구로몬과 양자택일 — 둘 다 하면 라피트가 빠듯. 야경은 어제 CROUD DECK로 충분.",
    bookingStatus: "당일권 가능"
  },
  "luggage-rapit": {
    priority: "must",
    durationMinutes: 80,
    alternatives: ["공항 리무진 버스 (난바 OCAT)", "공항급행+사카이스지선 (텐가차야 환승)"],
    flexTip: "18:15 출국 = 15:30 라피트가 마지노선 — 지정석 예매해두기.",
    riskLevel: "medium",
    riskNote: "T1→T2 셔틀 ~10분 추가 소요"
  },
  "kix-departure": {
    priority: "must",
    durationMinutes: 105,
    alternatives: [],
    flexTip: "절대 스킵 불가. 피치 체크인 마감 17:25 (출발 50분 전) — 16:30 T2 도착 목표."
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
      "장마 끝물 소나기 가능 — 아케이드(신사이바시스지)·지하상가·헵파이브 관람차·하루카스 등 실내 동선으로 스왑. 근무 카페·CROUD DECK는 실내라 영향 적음."
  },
  {
    id: "hot",
    title: "너무 더운 날",
    description: "야외(오사카성·신세카이)는 오전으로 몰고, 한낮은 백화점·근무 카페·전망대 실내로 피신."
  },
  {
    id: "tired",
    title: "피곤한 날",
    description: "선택/후보 일정을 숨기고 호텔 30분 낮잠 — 밤 일정(도톤보리·CROUD DECK 루프탑)이 이 여행의 핵심이니 밤에 베팅."
  },
  {
    id: "usj",
    title: "USJ가 끌리는 날",
    description:
      "근무 없는 토요일은 출국이라 어려움 — 가려면 Day 2 근무를 조정해야 함. 익스프레스 패스 없이는 한여름 대기 헬, 7시대 도착 권장."
  }
];
