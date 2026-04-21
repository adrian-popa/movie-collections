# AI Collaboration Notes

## [Entry 1] NgRx Actions Scaffold

**Prompt:** Generate NgRx action files for movies and 
collections features using createActionGroup with specific 
events and props as described.

**AI Output:** ~40 lines per file. Correct use of 
createActionGroup and props<>(). However, no-props actions 
used the deprecated `() => ({})` syntax instead of 
`emptyProps()`.

**My Changes:** Replaced `() => ({})` with `emptyProps()` 
in both `movies.actions.ts` and `collections.actions.ts`. 
Added missing `emptyProps` to imports.

**Why:** `() => ({})` is the old NgRx syntax, removed in 
NgRx 17+. Would have caused a runtime error. This is 
exactly the kind of outdated pattern AI tools reproduce 
from older training data that a senior developer must 
catch.

---

## [Entry 2] Collections Effects — saveCollections$

**Prompt:** Generate CollectionsEffects with a 
loadCollections$ effect reading from localStorage and a 
saveCollections$ effect writing to localStorage after 
every mutation action.

**AI Output:** Correct overall structure. Used 
`concatLatestFrom` from `@ngrx/operators` correctly. 
However: (1) imported operators from `rxjs/operators` 
instead of `rxjs` (deprecated path in RxJS 7+), (2) 
used `[_, collections]` destructuring instead of 
`[, collections]`, (3) no try/catch around 
`localStorage.setItem`.

**My Changes:** Fixed imports to `rxjs` directly. 
Changed destructuring to `[, collections]`. Wrapped 
localStorage write in try/catch to handle private 
browsing and quota exceeded scenarios silently.

**Why:** RxJS 7 deprecated the `rxjs/operators` path. 
localStorage can throw in private browsing mode — 
a silent catch is appropriate here since persistence 
is a convenience feature, not a critical one. The 
unhandled error would have killed the effect stream.

---

## [Entry 3] SearchBarComponent Debounce

**Prompt:** Fix SearchBarComponent to use a Subject with 
debounceTime(300), distinctUntilChanged, and 
takeUntilDestroyed() instead of dispatching on every 
keystroke.

**AI Output:** Copilot ignored the requirement entirely 
on first attempt and returned the original version with 
double dispatch on every keystroke — no debounce, no 
Subject, no cleanup.

**My Changes:** Rewrote the component manually. Used a 
`Subject<string>` piped through `debounceTime(300)`, 
`distinctUntilChanged()`, and `takeUntilDestroyed()`. 
Moved the subscription to the constructor to satisfy 
the injection context requirement of 
`takeUntilDestroyed()`. Added empty query guard to 
dispatch `clearSearch` instead of `searchMovies`.

**Why:** Dispatching on every keystroke means an API 
call per character typed — unacceptable UX and wasteful 
on the TMDB rate limit (40 req/10s). `takeUntilDestroyed` 
is the Angular 21 idiomatic way to manage subscriptions, 
replacing manual `ngOnDestroy` + `Subscription` cleanup. 
The constructor placement is required — 
`takeUntilDestroyed()` must be called in an injection 
context.

---

## [Entry 4] Cross-Slice Selector — selectMoviesByCollectionId

**Prompt:** Generate selectors for collections feature 
including a selector that returns full Movie objects for 
a given collection.

**AI Output:** Used the deprecated NgRx props pattern: 
`createSelector(..., (state, props: { id: string }) => ...)`. 
Also incorrectly annotated the state parameter type 
manually as `ReturnType<typeof selectItems>`.

**My Changes:** Rewrote both parameterised selectors as 
selector factories — functions that take an `id: string` 
and return a `createSelector(...)` call. Removed the 
redundant manual type annotation since createSelector 
infers types from input selectors.

**Why:** The props-based selector API was deprecated in 
NgRx 15 and removed in NgRx 17. The factory pattern is 
the current standard and produces properly memoized, 
type-safe selectors. The manual type annotation was 
redundant noise that could cause type mismatches.

---

## [Entry 5] Environment Configuration Pattern

**Prompt:** N/A — architectural decision made without AI.

**AI Output:** N/A

**My Changes:** Created `environment.template.ts` as a 
committed reference file with placeholder values. Added 
real `environment.ts` to `.gitignore` pattern but 
included it in this submission for reviewer convenience.

**Why:** In production, secrets are injected via CI/CD 
pipeline secret stores (GitHub Actions secrets, 
AWS Secrets Manager etc.) and never committed to source 
control. The template documents the expected shape and 
setup steps for new developers. Deviating from the 
gitignore pattern here is a deliberate, documented 
trade-off for reviewer experience — not ignorance of 
the practice.