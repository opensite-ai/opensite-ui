# Color Refactoring Implementation Plan

## Overview

Systematic refactoring of all blocks in `components/blocks/*` to ensure dynamic color compatibility with Section background variants.

---

## Block Categories Analysis

### Total Categories: 30

1. **about** (21 blocks)
2. **article** (7 blocks)
3. **background-pattern-hero** (42 blocks)
4. **banner** (10 blocks)
5. **blog** (13 blocks)
6. **carousel** (13 blocks)
7. **case-studies-list** (4 blocks)
8. **case-study-detail** (3 blocks)
9. **comparison** (10 blocks)
10. **contact** (34 blocks)
11. **cta** (27 blocks)
12. **faq** (17 blocks)
13. **features** (27 blocks)
14. **footers** (20 blocks)
15. **gallery** (16 blocks)
16. **hero** (72+ blocks)
17. **industries** (4 blocks)
18. **link-page** (5 blocks)
19. **list** (6 blocks)
20. **logos** (11 blocks)
21. **navbars** (18 blocks)
22. **offer-modal** (3 blocks)
23. **pricing** (28 blocks)
24. **process** (9 blocks)
25. **project-detail** (22 blocks)
26. **project-list** (28 blocks)
27. **resource-detail** (3 blocks)
28. **resource-list** (5 blocks)
29. **reviews** (23 blocks)
30. **service-detail** (7 blocks)
31. **services-list** (27 blocks)
32. **stats** (12 blocks)
33. **team** (23 blocks)
34. **timeline** (14 blocks)

**Estimated Total Blocks: ~550+**

---

## Subagent Deployment Strategy

### Phase 1: High-Impact Categories (Parallel Execution)

Deploy 6 subagents simultaneously for categories with most blocks:

1. **Subagent: hero-refactor** - Hero blocks (72+ blocks)
2. **Subagent: contact-refactor** - Contact blocks (34 blocks)
3. **Subagent: pricing-refactor** - Pricing blocks (28 blocks)
4. **Subagent: project-list-refactor** - Project list blocks (28 blocks)
5. **Subagent: cta-refactor** - CTA blocks (27 blocks)
6. **Subagent: features-refactor** - Features blocks (27 blocks)

### Phase 2: Medium-Impact Categories (Parallel Execution)

Deploy 6 subagents for medium-sized categories:

7. **Subagent: services-list-refactor** - Services list blocks (27 blocks)
8. **Subagent: reviews-refactor** - Reviews/testimonials blocks (23 blocks)
9. **Subagent: team-refactor** - Team blocks (23 blocks)
10. **Subagent: project-detail-refactor** - Project detail blocks (22 blocks)
11. **Subagent: about-refactor** - About blocks (21 blocks)
12. **Subagent: footers-refactor** - Footer blocks (20 blocks)

### Phase 3: Specialized Categories (Parallel Execution)

Deploy 6 subagents for specialized categories:

13. **Subagent: navbars-refactor** - Navbar blocks (18 blocks)
14. **Subagent: faq-refactor** - FAQ blocks (17 blocks)
15. **Subagent: gallery-refactor** - Gallery blocks (16 blocks)
16. **Subagent: timeline-refactor** - Timeline blocks (14 blocks)
17. **Subagent: blog-refactor** - Blog blocks (13 blocks)
18. **Subagent: carousel-refactor** - Carousel blocks (13 blocks)

### Phase 4: Remaining Categories (Parallel Execution)

Deploy 6 subagents for remaining categories:

19. **Subagent: stats-refactor** - Stats blocks (12 blocks)
20. **Subagent: logos-refactor** - Logos blocks (11 blocks)
21. **Subagent: banner-refactor** - Banner blocks (10 blocks)
22. **Subagent: comparison-refactor** - Comparison blocks (10 blocks)
23. **Subagent: process-refactor** - Process blocks (9 blocks)
24. **Subagent: article-refactor** - Article blocks (7 blocks)

### Phase 5: Small Categories (Parallel Execution)

Deploy final subagents for small categories:

25. **Subagent: service-detail-refactor** - Service detail blocks (7 blocks)
26. **Subagent: list-refactor** - List blocks (6 blocks)
27. **Subagent: link-page-refactor** - Link page blocks (5 blocks)
28. **Subagent: resource-list-refactor** - Resource list blocks (5 blocks)
29. **Subagent: industries-refactor** - Industries blocks (4 blocks)
30. **Subagent: case-studies-list-refactor** - Case studies list blocks (4 blocks)

### Phase 6: Final Categories

31. **Subagent: case-study-detail-refactor** - Case study detail blocks (3 blocks)
32. **Subagent: offer-modal-refactor** - Offer modal blocks (3 blocks)
33. **Subagent: resource-detail-refactor** - Resource detail blocks (3 blocks)

**Note**: Background-pattern-hero blocks (42) are likely already optimized as they're pattern-focused, not color-focused. Will audit separately.

---

## Subagent Instructions Template

Each subagent will receive:

```markdown
# Task: Refactor [CATEGORY] Blocks for Dynamic Color Compatibility

## Objective
Refactor all blocks in `components/blocks/[CATEGORY]/` to ensure dynamic color compatibility with Section background variants.

## Reference Documents
1. Read `components/blocks/COLOR_REFACTOR_DECISION_MATRIX.md` for decision rules
2. Follow patterns from Section component in `components/ui/section.tsx`

## Process for Each Block

1. **Analyze**: Identify all color-related CSS classes
2. **Apply Decision Matrix**:
   - Remove absolute colors (text-black, bg-black, text-white, bg-white)
   - Evaluate semantic tokens (text-foreground, text-muted-foreground, etc.)
   - Keep functional colors (text-destructive, text-primary for emphasis)
3. **Refactor**: Update the block file
4. **Document**: Note any exceptions or special cases

## Specific Patterns to Address

### Remove These:
- `text-black`, `bg-black`
- `text-white`, `bg-white`
- `text-gray-*`, `bg-gray-*`
- Redundant `text-foreground` on elements inside Section

### Evaluate These:
- `text-foreground` - Remove if inside Section, keep if needed for explicit theming
- `bg-muted` - Keep for cards/elevation, remove if redundant
- `text-muted-foreground` - Keep for hierarchy

### Keep These:
- `text-primary` - Brand accent
- `text-destructive` - Error states
- `border-border` - Standard borders
- Opacity modifiers (e.g., `bg-foreground/60`)

## Output Format

For each block refactored, provide:
1. Block name
2. Changes made (list of removed/modified classes)
3. Any exceptions or special cases
4. Confirmation that block was tested mentally against all Section backgrounds

## Blocks to Refactor
[LIST OF BLOCKS IN CATEGORY]
```

---

## Success Criteria

- ✅ All blocks work with all 9 Section background variants
- ✅ No black text on dark backgrounds
- ✅ No white text on light backgrounds  
- ✅ Text hierarchy preserved (headings, body, muted)
- ✅ Brand accents (primary color) still visible
- ✅ No hardcoded absolute colors except where documented

---

## Timeline Estimate

- **Phase 1**: 6 subagents × ~30 blocks each = ~180 blocks (2-3 hours)
- **Phase 2**: 6 subagents × ~20 blocks each = ~120 blocks (1-2 hours)
- **Phase 3**: 6 subagents × ~15 blocks each = ~90 blocks (1-2 hours)
- **Phase 4**: 6 subagents × ~10 blocks each = ~60 blocks (1 hour)
- **Phase 5**: 6 subagents × ~5 blocks each = ~30 blocks (30 min)
- **Phase 6**: 3 subagents × ~3 blocks each = ~9 blocks (15 min)

**Total Estimated Time**: 6-9 hours with parallel execution

---

## Validation Strategy

After all refactoring:

1. Run type checking: `pnpm type-check`
2. Run tests: `pnpm test`
3. Build: `pnpm build`
4. Manual spot-check: Test 5-10 blocks from each category with different backgrounds

