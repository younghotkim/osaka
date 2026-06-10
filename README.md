# Y&S Osaka Trip Diary

2026.7.2(목)–7.4(토) 오사카 2박 3일 — 영하 & 소현 둘만의 여행 앱.
후쿠오카 Trip Diary를 베이스로 오사카 분위기(食い倒れ·도톤보리 강변 색감)와 지도 화면 편집 기능을 더해 개선한 버전입니다.

## 실행

```bash
npm install --cache /tmp/npm-cache
npm run dev
```

## Google Maps 설정

1. `.env.example`을 참고해서 `.env.local`을 만듭니다.
2. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`에 Google Maps JavaScript API 키를 넣습니다.
3. 개발 서버를 다시 시작합니다.

API 키가 없어도 일정, 기록장, 내보내기/가져오기는 동작하고 지도 영역에는 안내가 표시됩니다.

## Supabase 셋업 — 후쿠오카와 같은 프로젝트 재사용

후쿠오카 앱이 쓰는 Supabase 프로젝트를 **그대로 재사용**합니다. 테이블만 `osaka_*` 접두사로
따로 만들기 때문에 기존 `trip_*` 데이터는 건드리지 않습니다.

1. **스키마 실행** — Supabase Dashboard → `SQL Editor → New query`에 `supabase/init.sql` 전체 붙여넣고 `Run`
   - `osaka_memories` / `osaka_days` / `osaka_stops` / `osaka_stop_plans` / `osaka_essentials`
     / `osaka_expenses` / `osaka_vault` / `osaka_travelers` / `osaka_packing` 테이블
   - `osaka-photos` Storage 버킷 + public read 정책
   - idempotent — 재실행해도 안전 (모두 `if not exists` / `on conflict`)

2. **로컬 env 설정** — `.env.local`은 후쿠오카 것을 복사한 뒤 한 줄만 변경:
   ```bash
   SUPABASE_URL=https://xxxxx.supabase.co        # 동일
   SUPABASE_SERVICE_ROLE_KEY=eyJ...              # 동일
   TRIP_ID=osaka-2026                            # ← 변경
   ```

3. **dev 서버 재시작** — env 변경은 hot-reload되지 않습니다.

브라우저는 `/api/*` 서버 라우트만 호출하고, Service Role Key는 서버에서만 사용됩니다.
Supabase 미설정 시에도 메모는 localStorage에 저장되어 동작합니다 (사진 업로드와 일정 편집 영구 저장만 비활성).

## 후쿠오카 버전 대비 개선점

- **지도에서 바로 일정 편집** — 지도 편집 모드에서 핀을 길게 끌어 위치 수정,
  빈 곳 탭으로 새 스톱 추가, 인포윈도우에서 바로 수정 진입
- **Day별 지도 필터** — 날짜별 동선만 골라 보기
- 오사카 선셋-로즈 테마 — 도톤보리 강변·글리코 사인 색감 (커플 여행 무드)
- 같은 Supabase DB에 `osaka_*` 테이블로 분리 운영 (후쿠오카 기록 보존)
- 7월 한여름 기준 준비물 프리셋 / 더위·우천 플렉스 모드

## 포함된 기능 (후쿠오카 버전 승계)

- 날짜별 여행 타임라인 + Google Maps 마커·동선
- 장소별 방문 체크, 별점(영하/소현), 코멘트 스레드, 사진 업로드
- 필수/선택/후보 일정, 체류 시간, 대체 장소, 현장 조정 팁
- 지출 기록 + 영하/소현 분담 정산, JPY→KRW 실시간 환산
- 예약/문서 보관함 (항공·숙소·eSIM·보험, 파일 첨부, 카운트다운)
- 항공편 실시간 상태 (AviationStack, 키 설정 시)
- 준비물 체크리스트 (오사카 7월 프리셋)
- 오사카 현지 정보 — 긴급 연락처·돈·교통·비상 일본어
- "오늘" 모드 근처 추천 (Places API)
- 번역기 + 음성 인식 (OpenAI 키 설정 시)
- 여행 후 회고(Recap) 모드 + 인쇄용 페이지
- Supabase 서버 저장, 미설정 시 localStorage fallback
