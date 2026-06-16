# Graph Report - osaka  (2026-06-15)

## Corpus Check
- 79 files · ~51,913 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 552 nodes · 1089 edges · 35 communities (29 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bdd80eec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 33|Community 33]]

## God Nodes (most connected - your core abstractions)
1. `isSupabaseConfigured()` - 26 edges
2. `createSupabaseServerClient()` - 26 edges
3. `useItineraryContext()` - 16 edges
4. `compilerOptions` - 16 edges
5. `useConfirm()` - 14 edges
6. `TripStop` - 12 edges
7. `POST()` - 9 edges
8. `TodayMode()` - 9 edges
9. `getStopMemory()` - 9 edges
10. `POST()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `rowToEntry()` --calls--> `normalizeExpenseEntry()`  [EXTRACTED]
  app/api/expenses/route.ts → lib/expense-ledger.ts
- `rowToMemory()` --calls--> `normalizeMemory()`  [EXTRACTED]
  app/api/memories/route.ts → lib/memory-types.ts
- `POST()` --calls--> `createSupabaseServerClient()`  [EXTRACTED]
  app/api/memories/route.ts → lib/supabase-server.ts
- `POST()` --calls--> `isSupabaseConfigured()`  [EXTRACTED]
  app/api/memories/route.ts → lib/supabase-server.ts
- `PUT()` --calls--> `createSupabaseServerClient()`  [EXTRACTED]
  app/api/memories/route.ts → lib/supabase-server.ts

## Import Cycles
- None detected.

## Communities (35 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (58): MemoriesShell(), CommentThread(), TwdKrwLabel(), useTwdToKrw(), GpsAutoStatus(), categoryIcon(), useItineraryContext(), catEmoji (+50 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (37): DELETE(), entryToRow(), GET(), POST(), PUT(), rowToEntry(), DELETE(), GET() (+29 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (32): StopForm, FullRemote, asCategory(), asPriority(), DayRow, dayToRow(), EssentialItem, EssentialRow (+24 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (24): daysBetween(), DepartureWidget(), Mode, ReadinessRow, VjwState, expiryStatus(), fmtDate(), maskPassportNo() (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (15): langLabel, Mode, modeMeta, modeOrder, Pair, Persisted, PhotoResult, Props (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (10): AltPhrasing, detectLang(), Direction, LangCode, sharedContext, toneExamples, toneInstruction, toneOrder (+2 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (15): CombinedSync, combinedSyncMeta, dayIsoDates, isoDayMap, MemoryView, modeIcons, modeLabels, PlanView (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (21): dependencies, lucide-react, next, react, react-dom, @supabase/supabase-js, devDependencies, @types/node (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (17): NextStopEta(), DayWeatherBadge(), OSAKA, useDailyForecast(), useWeatherForecast(), WeatherBar(), DailyWeather, DirectionsResult (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (17): PackingList(), CATEGORIES, emptyPackItem(), newPackId(), normalizePackItem(), OWNERS, PackBook, PackCategory (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (17): buildReplySystemPrompt(), buildReplyUserMessage(), isReplySuggestion(), ReplyRequest, ReplyResponse, ReplySuggestion, sharedContext, toneInstruction (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (17): buildSuggestSystemPrompt(), buildSuggestUserMessage(), isSuggestion(), sharedContext, Suggestion, SuggestRequest, SuggestResponse, toneInstruction (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (12): metadata, viewport, ConfirmCtx, ConfirmOptions, ConfirmProvider(), Context, PendingRequest, GateState (+4 more)

### Community 14 - "Community 14"
Cohesion: 0.19
Nodes (14): FlightStatusBadge(), AviationFlight, AviationLeg, cache, GET(), leg(), mapState(), FlightLeg (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (17): ItineraryContext, ItineraryProvider(), ItineraryValue, dayRouteColors, GoogleBounds, GoogleInfoWindow, GoogleLatLng, GoogleMap (+9 more)

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (12): emptyVaultItem(), KINDS, newVaultId(), normalizeVaultItem(), OWNERS, STATUSES, VaultKind, vaultKindLabels (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.29
Nodes (8): PhotoBlock, PhotoScene, PhotoTranslateResponse, normalize(), OpenAIResponse, parseJsonLoose(), POST(), SYSTEM_PROMPT

### Community 18 - "Community 18"
Cohesion: 0.18
Nodes (14): OsakaInfo(), InfoCard, InfoLine, osakaInfoCards, osakaPhrases, Phrase, ensureVoices(), LANG_TAG (+6 more)

### Community 19 - "Community 19"
Cohesion: 0.25
Nodes (8): combineSync(), HomeShell(), minutesFromTimeString(), pickCurrentStop(), todayIso(), useExpenses(), usePacking(), useTravelers()

### Community 20 - "Community 20"
Cohesion: 0.29
Nodes (11): buildSystemPrompt(), buildUserMessage(), isDirection(), cache, cacheKey(), dedupKey(), normalize(), OpenAIResponse (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.32
Nodes (5): PhotoUploader(), TakoyakiSpinner(), compressImage(), CompressOptions, DEFAULTS

### Community 22 - "Community 22"
Cohesion: 0.29
Nodes (6): Google Maps 설정, Supabase 셋업 — 후쿠오카와 같은 프로젝트 재사용, Y&S Osaka Trip Diary, 실행, 포함된 기능 (후쿠오카 버전 승계), 후쿠오카 버전 대비 개선점

### Community 23 - "Community 23"
Cohesion: 0.33
Nodes (6): PlanShell(), VaultMode(), useConfirm(), LedgerMode(), StopEditor(), getPlan()

### Community 24 - "Community 24"
Cohesion: 0.33
Nodes (4): CATEGORIES, NearbyPlace, NearbyPlaces(), NearbyResponse

### Community 25 - "Community 25"
Cohesion: 0.33
Nodes (3): ALLOWED_TYPES, cache, GPlace

### Community 26 - "Community 26"
Cohesion: 0.40
Nodes (4): VaultBook, VaultItem, useVault(), VaultSyncStatus

## Knowledge Gaps
- **160 isolated node(s):** `GoogleDirectionsResponse`, `ErApiResponse`, `cache`, `AviationLeg`, `AviationFlight` (+155 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ttsSupported()` connect `Community 18` to `Community 4`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `speak()` connect `Community 18` to `Community 4`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `OsakaInfo()` connect `Community 18` to `Community 6`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `GoogleDirectionsResponse`, `ErApiResponse`, `cache` to the rest of the system?**
  _160 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0654490106544901 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09435707678075855 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08456659619450317 - nodes in this community are weakly interconnected._