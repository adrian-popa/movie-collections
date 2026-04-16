# AI Usage Notes

This document explains how AI tools were used during the implementation of this coding challenge.

The project was completed using an **AI-assisted development workflow**, where AI tools were used as engineering assistants to accelerate development, while all architectural decisions, validation, and final implementations were performed by the developer.

---

# AI Tools Used

The following tools were used during development:

- Claude (Sonnet 4.6)
- GitHub Copilot (GPT-4.1)
- AI-assisted IDE suggestions

These tools were used to assist with coding, debugging, and documentation, similar to how engineers might use technical documentation, StackOverflow, or reference implementations.

---

# Development Workflow

The challenge was implemented using an **assisted coding approach**.

This means that AI tools were used to:

- propose possible code implementations
- suggest refactoring improvements
- identify potential bugs
- help structure documentation
- accelerate repetitive coding tasks

All generated suggestions were:

1. **reviewed manually**
2. **validated for correctness**
3. **tested locally**
4. **rewritten or adjusted when necessary**

No code was included without understanding its behavior.

---

# AI-Assisted Areas

AI tools were used in several areas of the project:

## Architecture & Project Structure

AI assisted in exploring possible architectural approaches, including:

- organizing the project using a **feature-based Angular structure**
- structuring **NgRx state management**
- separating concerns between `core`, `features`, and `shared` modules

Final architectural decisions were reviewed and adjusted to ensure they follow common Angular best practices.

---

## State Management Implementation

AI suggestions were used when implementing parts of the NgRx setup, including:

- actions
- reducers
- selectors
- effects

The developer reviewed each implementation to ensure it follows NgRx conventions and maintains predictable state flow.

---

## Bug Fixing & Debugging

AI tools were occasionally used as a debugging assistant when addressing issues such as:

- TypeScript errors
- test runner configuration
- testing framework differences (Vitest vs Jasmine)
- store interaction patterns

Suggested solutions were verified and adapted before being applied.

---

## Refactoring & Code Quality

AI suggestions helped improve:

- naming clarity
- code readability
- minor refactoring opportunities
- reducing boilerplate in repetitive sections

The final code was manually reviewed to maintain consistency.

---

## Documentation

AI was used to help structure and refine documentation such as:

- `README.md`
- `ARCHITECTURE.md`
- this document

All documentation was reviewed and edited to accurately reflect the actual implementation.

---

# Development Constraints

This coding challenge was completed in **under approximately three hours**.

AI-assisted development was intentionally used to:

- reduce repetitive work
- accelerate iteration
- allow focus on architecture and correctness

This reflects a **modern software engineering workflow**, where AI tools are used to improve productivity while maintaining human oversight and responsibility for the final result.

---

# Verification

The final implementation was validated by:

- manual code review
- local testing
- unit tests
- verifying application behavior

All AI-assisted contributions were evaluated before being included in the final solution.

---

# Summary

AI tools were used as **development accelerators**, not as autonomous code generators.

The developer remained responsible for:

- architecture decisions
- implementation validation
- testing
- final code quality

This workflow reflects a realistic modern engineering process where AI tools assist developers but do not replace engineering judgment.