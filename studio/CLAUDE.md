# Sanity Schema Best Practices

## 1. Core Philosophy: Data > Presentation

Model **what things are**, not **what they look like**.

- ❌ **Bad:** `bigHeroText`, `redButton`, `threeColumnRow`, `color`, `fontSize`
- ✅ **Good:** `heroStatement`, `callToAction`, `featuresSection`, `status`, `role`

**The test:** "If we redesigned the site, would this field name still make sense?"

- `threeColumnLayout` → ❌ Fails (what if we go to 2 columns?)
- `features` → ✅ Passes (features are features regardless of layout)

## 2. Strict Definition Syntax

Always use the helper functions from `sanity` for type safety and autocompletion.

- **ALWAYS** use `defineType` for the root export.
- **ALWAYS** use `defineField` for fields.
- **ALWAYS** use `defineArrayMember` for items inside arrays.

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        // ALWAYS use defineArrayMember for array items
        defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] }),
      ],
    }),
  ],
});
```

## 3. Shared Fields Pattern

Export arrays of fields to reuse common patterns (e.g., SEO, standard page headers).

```typescript
// src/schemaTypes/shared/seoFields.ts
export const seoFields = [
  defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
  defineField({ name: 'seoDesc', type: 'text', title: 'SEO Description' }),
];

// Usage
defineType({
  name: 'page',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    ...seoFields, // Spread shared fields
  ],
});
```

## 4. Field Patterns

### A. Array Keys (`_key`)

Every item in a Sanity array automatically gets a `_key` property. This is **critical** for:

- React reconciliation (use as `key` prop)
- Visual Editing overlays (click-to-edit)
- Portable Text rendering

**Schema:** Sanity auto-generates `_key` for array items. You don't define it.

**Frontend:** Always use `_key` as React's `key`:

```typescript
// ✅ Correct
{items.map((item) => <Component key={item._key} {...item} />)}

// ❌ Wrong - index keys break Visual Editing
{items.map((item, i) => <Component key={i} {...item} />)}
```

**Querying:** Always include `_key` in array projections:

```groq
*[_type == "page"][0]{
  pageBuilder[]{
    _key,  // Always include _key in queries
    _type,
    ...
  }
}
```

### B. Icons

Always assign an icon from `@sanity/icons` to documents and objects. This improves the Studio UX significantly. Browse all icons at [icons.sanity.build](https://icons.sanity.build/all).

| Content Type   | Icon               |
| -------------- | ------------------ |
| Article, Post  | `DocumentTextIcon` |
| Author, Person | `UserIcon`         |
| Category, Tag  | `TagIcon`          |
| Settings       | `CogIcon`          |
| Page           | `DocumentIcon`     |
| Image block    | `ImageIcon`        |
| Video block    | `PlayIcon`         |
| FAQ            | `HelpCircleIcon`   |
| Link           | `LinkIcon`         |

### C. Boolean vs. List

Avoid boolean fields for binary states that might expand later.

- **Prefer:** `options.list` with "radio" layout.

```typescript
defineField({
  name: 'status',
  type: 'string',
  options: {
    list: [
      { title: 'Draft', value: 'draft' },
      { title: 'Published', value: 'published' },
    ],
    layout: 'radio',
  },
});
```

### D. The "Toggle" Pattern (Conditional Fields)

Use a radio/boolean field to toggle visibility of other fields (often grouped in fieldsets).

```typescript
(defineField({
  name: 'linkType',
  type: 'string',
  options: { list: ['internal', 'external'], layout: 'radio' },
}),
  defineField({
    name: 'internalLink',
    type: 'reference',
    hidden: ({ parent }) => parent?.linkType !== 'internal',
  }),
  defineField({
    name: 'externalUrl',
    type: 'url',
    hidden: ({ parent }) => parent?.linkType !== 'external',
  }));
```

## 5. References vs Nested Objects

A **critical modeling decision**: when to use `reference` vs embedding an `object`.

### Use References When:

- Content is **reusable** across documents (authors, categories, products)
- Content needs its **own editing interface** in Studio
- You need to query/filter by the related content independently
- Multiple documents should share the **same instance** (update once, reflect everywhere)

```typescript
// ✅ Author is reusable and independently editable
defineField({
  name: 'author',
  type: 'reference',
  to: [{ type: 'author' }],
});
```

### Use Nested Objects When:

- Content is **specific to this document** (not shared)
- Content doesn't make sense on its own (address, SEO metadata)
- You want \*_simpler editing_//\* (all fields in one place)
- You need the data to be **copied** not linked

```typescript
// ✅ SEO is document-specific, not shared
defineField({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
  ],
});
```

### Quick Decision Matrix

| Scenario                  | Use                                   |
| ------------------------- | ------------------------------------- |
| Blog post author          | `reference` (reusable)                |
| Product category          | `reference` (shared taxonomy)         |
| Page SEO fields           | `object` (page-specific)              |
| Hero section content      | `object` (page-specific)              |
| Team member on About page | `reference` (might be used elsewhere) |
| Call-to-action button     | `object` (usually page-specific)      |

### Querying Differences

```groq
// Reference requires expansion
*[_type == "post"]{ author->{ name, bio } }

// Object is already inline
*[_type == "post"]{ seo { title, description } }
```

## 6. Safe Schema Updates (The Deprecation Pattern)

**NEVER** delete a field that contains production data. It will cause data loss or Studio crashes. Instead, follow the **ReadOnly -> Hidden -> Deprecated** lifecycle.

### The Pattern

1.  **`deprecated`**: Adds a visual warning and reason.
2.  **`readOnly: true`**: Prevents new edits but keeps data visible.
3.  **`hidden`**: Hides it from _new_ documents (where value is undefined).
4.  **`initialValue: undefined`**: Ensures new documents don't get this field.

```typescript
defineField({
  name: 'oldTitle', // The field you want to remove
  title: 'Article Title (Deprecated)',
  type: 'string',
  deprecated: {
    reason: 'Use the new "seoTitle" field instead. This will be removed in v2.',
  },
  readOnly: true,
  hidden: ({ value }) => value === undefined,
  initialValue: undefined,
});
```

### Migration Workflow

**Phase 1: Deprecate** — Apply the deprecation pattern above. Deploy.

**Phase 2: Migrate** — Update frontend to use new fields (with `coalesce()` fallbacks). Create a migration:

```typescript
// migrations/rename-oldTitle-to-newTitle/index.ts
import { defineMigration, at, setIfMissing, unset } from 'sanity/migrate';

export default defineMigration({
  title: 'Rename oldTitle to newTitle',
  documentTypes: ['article'],
  filter: 'defined(oldTitle) && !defined(newTitle)',
  migrate: {
    document(doc) {
      if (!doc.oldTitle || doc.newTitle) return;
      return [
        at('newTitle', setIfMissing(doc.oldTitle)),
        at('oldTitle', unset()),
      ];
    },
  },
});
```

```bash
# Dry run first (default)
sanity migration run rename-oldTitle-to-newTitle

# Execute when ready
sanity migration run rename-oldTitle-to-newTitle --no-dry-run
```

**Phase 3: Remove** — Once `oldTitle` is undefined for all documents, delete the field definition.

## 7. Validation Patterns

Beyond `rule.required()`, Sanity offers powerful validation options.

### Common Patterns

```typescript
// Email validation
defineField({
  name: 'email',
  type: 'string',
  validation: rule => rule.email().required(),
});

// URL validation (with custom message)
defineField({
  name: 'website',
  type: 'url',
  validation: rule =>
    rule
      .uri({
        scheme: ['http', 'https'],
      })
      .error('Must be a valid URL starting with http:// or https://'),
});

// Length constraints
defineField({
  name: 'excerpt',
  type: 'text',
  validation: rule =>
    rule.max(200).warning('Keep it under 200 characters for best SEO'),
});

// Regex pattern
defineField({
  name: 'slug',
  type: 'slug',
  validation: rule =>
    rule.required().custom(slug => {
      if (!slug?.current) return 'Required';
      if (!/^[a-z0-9-]+$/.test(slug.current)) {
        return 'Slug must be lowercase with hyphens only';
      }
      return true;
    }),
});
```

### Cross-Field Validation

```typescript
defineField({
  name: 'endDate',
  type: 'datetime',
  validation: rule =>
    rule.custom((endDate, context) => {
      const startDate = context.document?.startDate;
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        return 'End date must be after start date';
      }
      return true;
    }),
});
```

### Array Validation

```typescript
defineField({
  name: 'tags',
  type: 'array',
  of: [{ type: 'string' }],
  validation: rule =>
    rule
      .min(1)
      .error('Add at least one tag')
      .max(10)
      .warning('Too many tags may hurt SEO')
      .unique(),
});
```

### Async Validation (Uniqueness Check)

```typescript
defineField({
  name: 'slug',
  type: 'slug',
  validation: rule =>
    rule.required().custom(async (slug, context) => {
      if (!slug?.current) return true;

      const client = context.getClient({ apiVersion: '2026-02-01' });
      const id = context.document?._id?.replace(/^drafts\./, '');

      const existing = await client.fetch(
        `count(*[_type == "post" && slug.current == $slug && _id != $id])`,
        { slug: slug.current, id },
      );

      return existing === 0 || 'Slug already exists';
    }),
});
```

---

# GROQ Query Maintenance & Best Practices

## 1. Query Definition & Imports

### The `defineQuery` Function

**ALWAYS** wrap GROQ queries in `defineQuery` for TypeGen support. The import location depends on your framework:

```typescript
// Framework-agnostic (Remix, SvelteKit, Astro, vanilla)
import { defineQuery } from 'groq';

// Next.js (re-exported for convenience)
import { defineQuery } from 'next-sanity';
```

### Syntax Highlighting

For VS Code syntax highlighting, either:

1. Use the `groq` tagged template (recommended): `groq\`...\``
2. Or prefix with `/* groq */` comment when using `defineQuery`

```typescript
import { defineQuery } from 'groq';

// ✅ Option A: groq tag (provides highlighting automatically)
import groq from 'groq';
const QUERY = defineQuery(groq`*[_type == "post"]`);

// ✅ Option B: Comment prefix (for plain template literals)
const QUERY = defineQuery(/* groq */ `*[_type == "post"]`);

// ✅ Also valid: Just defineQuery (TypeGen works, but no editor highlighting)
const QUERY = defineQuery(`*[_type == "post"]`);
```

## 2. Query Fragments

Use string interpolation to reuse query logic and keep queries maintainable.

```typescript
// src/sanity/fragments/image.ts
export const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt
`;

// src/sanity/queries/post.ts
import { defineQuery } from 'groq';
import { imageFragment } from '../fragments/image';

export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post"][0] {
    title,
    mainImage {
      ${imageFragment}
    }
  }
`);
```

## 3. Expansion Patterns (Page Builder)

When building a Page Builder query, expand all potential component types.

**Best Practice:** Use a `pageFields` fragment or similar strategy to keep the main query clean.

```typescript
const pageBuilderExpansion = /* groq */ `
  pageBuilder[] {
    ...,
    _type == "hero" => {
      ...,
      cta[] { link, label }
    },
    _type == "gallery" => {
      images[] { ${imageFragment} }
    }
  }
`;
```

## 4. Maintenance Workflow

When you add a new field or component to the Schema:

1.  **Update the Query:** Add the new field/expansion to the relevant GROQ query immediately.
2.  **Run TypeGen:** If you have `typegen.enabled: true` in `sanity.cli.ts`, types regenerate automatically during `sanity dev`/`sanity build`. Otherwise, run `npm run typegen` manually.
3.  **Verify:** Ensure the new field is available in the generated types.

## 5. Common Patterns

### Ordering

```groq
// Single field
*[_type == "post"] | order(publishedAt desc)

// Multiple fields (tiebreaker)
*[_type == "post"] | order(featured desc, publishedAt desc)

// ⚠️ Order BEFORE slice, not after!
*[_type == "post"] | order(publishedAt desc)[0...10]  // ✅ Correct
*[_type == "post"][0...10] | order(publishedAt desc)  // ❌ Wrong order
```

### Slice Notation

```groq
*[_type == "post"][0]       // Single document (object, not array)
*[_type == "post"][0...5]   // First 5 (exclusive) ← Most common
*[_type == "post"][$start...$end]  // Pagination with params
```

### Default Values with `coalesce()`

```groq
*[_type == "page"]{
  "title": coalesce(seoTitle, title, "Untitled"),
  "image": coalesce(ogImage, mainImage, defaultImage)
}
```

### Conditionals with `select()`

```groq
*[_type == "product"]{
  title,
  "badge": select(
    stock == 0 => "Out of Stock",
    stock < 5 => "Low Stock",
    "In Stock"
  )
}
```

### Aggregation with `count()`

```groq
// Total count
count(*[_type == "post" && defined(slug.current)])

// Count per document
*[_type == "category"]{
  title,
  "postCount": count(*[_type == "post" && references(^._id)])
}
```

### Reverse References

```groq
*[_type == "author"]{
  name,
  "posts": *[_type == "post" && references(^._id)]{ title, slug }
}
```

### Array Filtering

```groq
*[_type == "movie"]{
  title,
  "mainCast": castMembers[role == "lead"]->{name}
}

// Check if value exists in array
*[_type == "post" && "tech" in categories[]->slug.current]
```

### Special Variables

```groq
// ^ = parent document (in nested queries)
*[_type == "author"]{
  name,
  "posts": *[_type == "post" && author._ref == ^._id]
}

// @ = current item (in array operations)
*[_type == "post"]{
  "tagCount": count(tags[@ != null])
}
```

## 6. Performance Rules

### Optimizable vs Non-Optimizable Filters

GROQ uses indexes for **optimizable** filters. Non-optimizable filters scan ALL documents.

| Pattern                 | Optimizable | Example                          |
| ----------------------- | ----------- | -------------------------------- |
| `_type == "x"`          | ✅ Yes      | `*[_type == "post"]`             |
| `_id == "x"`            | ✅ Yes      | `*[_id == "abc123"]`             |
| `slug.current == $slug` | ✅ Yes      | `*[slug.current == "hello"]`     |
| `defined(field)`        | ✅ Yes      | `*[defined(publishedAt)]`        |
| `references($id)`       | ✅ Yes      | `*[references("author-123")]`    |
| `field->attr == x`      | ❌ No       | Resolves reference for every doc |
| `fieldA < fieldB`       | ❌ No       | Compares two attributes          |

**Fix non-optimizable filters by stacking:**

```groq
// Stack optimizable filters FIRST to reduce search space
*[_type == "product" && defined(salePrice) && salePrice < displayPrice]
```

### Avoid Joins in Filters

Reference resolution (`->`) in filters is expensive. Use `_ref` instead:

```groq
// ❌ Slow: Resolves reference for every document
*[_type == "post" && author->name == "Bob Woodward"]

// ✅ Fast: Direct _ref comparison
*[_type == "post" && author._ref == "author-bob-woodward-id"]
```

**When you need dynamic lookups** (don't know the ID upfront):

```groq
// Two-step approach:
// 1. Get the reference ID first
*[_type == "author" && name == "Bob Woodward"][0]._id

// 2. Use that ID in your main query
*[_type == "post" && author._ref == $authorId]

// Or use a subquery (still better than -> in filter):
*[_type == "post" && author._ref in *[_type == "author" && name == "Bob Woodward"]._id]
```

### Merge Repeated Reference Resolutions

Each `->` is a subquery. Don't repeat it:

```groq
// ❌ Slow: Two separate subqueries
*[_type == "category"]{
  "parentTitle": parent->title,
  "parentSlug": parent->slug.current
}

// ✅ Fast: Single subquery, merged
*[_type == "category"]{
  ...(parent->{ "parentTitle": title, "parentSlug": slug.current })
}
```

### Cursor-Based Pagination (Not Deep Slicing)

Deep slices are slow because all skipped docs must be sorted first.

```groq
// ❌ Slow: Must sort and skip 10,000 docs
*[_type == "article"] | order(_id)[10000...10020]

// ✅ Fast: Cursor-based, only fetches 20
*[_type == "article" && _id > $lastId] | order(_id)[0...20]
```

**For custom sort orders**, include the sort field in the cursor:

```groq
// Compound cursor: publishedAt + _id for deterministic pagination
*[_type == "article" && (
  publishedAt < $lastDate ||
  (publishedAt == $lastDate && _id > $lastId)
)] | order(publishedAt desc, _id)[0...20]
```

### Always Project Fields

Always use projections to return only the fields your application needs. Fetching entire documents wastes bandwidth and processing time.

```groq
// ❌ Returns ALL fields including unused ones, metadata, revisions
*[_type == "post"]

// ✅ Only fetch what the component needs
*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}
```

Apply projections at every level, including nested references:

```groq
*[_type == "post"]{
  title,
  author->{ name, "avatar": image.asset->url },
  categories[]->{ title, "slug": slug.current }
}
```

Use conditional projections for different contexts:

```groq
*[_type == "post"]{
  title,
  slug,
  // Only include body for single post view
  $includeBody == true => { body }
}
```

### Don't Filter/Sort on Projected Values

Computed attributes can't use indexes:

```groq
// ❌ Not optimizable (computed attribute)
*[_type == "person"]{
  "fullName": firstName + " " + lastName
} | order(fullName)

// ✅ Optimizable (original attribute)
*[_type == "person"] | order(firstName, lastName)
```

### Quick Checklist

| Rule                                | Why                                           |
| ----------------------------------- | --------------------------------------------- |
| Always project `{ fields }`         | Reduces data returned                         |
| Use `defined()` checks              | Filters use indexes                           |
| Use `$params` not interpolation     | Prevents query manipulation + enables caching |
| Order BEFORE slice                  | `order()[0...N]` not `[0...N] order()`        |
| Use `_ref` not `->field` in filters | Avoids expensive joins                        |
| Merge repeated `->` calls           | Single subquery vs many                       |
| Cursor pagination for deep pages    | Avoids sorting entire dataset                 |

## 7. API Version Best Practices

Always use dated versions (`YYYY-MM-DD`) for consistent behavior:

```typescript
const client = createClient({
  apiVersion: '2026-02-01', // Use current date for new projects
});
```

- **New projects:** Use current date (e.g., `2026-02-01`)
- **Existing projects:** Keep current version unless you need new features
- Dated versions lock behavior; `v1` or `vX` may change unexpectedly

---

# Next.js & Sanity Integration Rules

## 1. Architecture Patterns

### Option A: Embedded Studio (Recommended)

**Best for:** Most Next.js projects. Unified deployment, simpler setup.

The Studio lives inside your Next.js app at `/app/studio/[[...tool]]/page.tsx`.

- **Config:** `sanity.config.ts` lives in the project root.
- See `project-structure.md` rule for detailed structure.

### Option B: Monorepo (Alternative)

**Best for:** Separation of concerns, multiple frontends, or strict dependency isolation.

The Studio and Next.js app live in separate folders:

```
apps/
├── studio/     # Sanity Studio (standalone)
└── web/        # Next.js frontend
```

- **Config:** Add your Next.js app URL to **CORS Origins** in Sanity project settings.
- See `project-structure.md` rule for detailed structure.

## 2. Data Fetching (Live Content API)

We use `defineLive` (next-sanity v11+) to enable real-time content updates and Visual Editing automatically.

### Setup (`src/sanity/lib/live.ts`)

```typescript
import { defineLive } from 'next-sanity';
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2026-02-01',
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
```

### Rendering (`src/app/layout.tsx`)

You **must** render `<SanityLive />` in the root layout to enable real-time updates.

```typescript
import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
```

## 3. Caching & Revalidation

### Prefer Live Content API (Default)

**Use `defineLive` by default.** It handles fetching, caching, and invalidation automatically. Only implement manual caching when you need fine-grained control.

### When to Use Manual Caching

| Scenario                                 | Approach                        |
| ---------------------------------------- | ------------------------------- |
| Real-time updates, Visual Editing        | `defineLive` (default)          |
| Static marketing pages, rarely updated   | Time-based revalidation         |
| Blog posts, products with frequent edits | Tag-based revalidation          |
| Critical accuracy (stock levels, prices) | Path-based + short revalidation |

### Debugging: Enable Fetch Logging

See every fetch with cache HIT/MISS status:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

Console output shows cache status:

```text
GET /posts 200 in 39ms
 │ GET https://...apicdn.sanity.io/... 200 in 5ms (cache hit)
```

### Sanity CDN vs API

| Setting         | Speed  | Freshness            | Use When                         |
| --------------- | ------ | -------------------- | -------------------------------- |
| `useCdn: true`  | Fast   | May have brief delay | Default for all runtime fetches  |
| `useCdn: false` | Slower | Guaranteed fresh     | `generateStaticParams`, webhooks |

Override per-request:

```typescript
// For static generation, use API directly
export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch(SLUGS_QUERY);
  return slugs;
}
```

### Manual `sanityFetch` Helper (Advanced)

For manual caching control, create a wrapper:

```typescript
// src/sanity/lib/client.ts
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
```

### Time-Based Revalidation

Simple and predictable. Good for content that changes infrequently.

```typescript
const posts = await sanityFetch({
  query: POSTS_QUERY,
  revalidate: 3600, // Revalidate every hour
});
```

**The "Typo Problem":** With time-based only, content authors may wait up to an hour to see changes. Use webhooks for instant updates.

### Path-Based Revalidation

Surgically revalidate specific routes when documents change.

**1. Create API Route:**

```typescript
// src/app/api/revalidate/path/route.ts
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = { path?: string };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // Add delay to allow CDN to update
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }
    if (!body?.path) {
      return new Response('Missing path', { status: 400 });
    }

    revalidatePath(body.path);
    return NextResponse.json({ revalidated: body.path });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
```

**2. Create GROQ-Powered Webhook:**

- URL: `https://yoursite.com/api/revalidate/path`
- Filter: `_type in ["post"]`
- Projection: `{ "path": "/posts/" + slug.current }`
- Add `SANITY_REVALIDATE_SECRET` to webhook and `.env.local`

### Tag-Based Revalidation

"Update once, revalidate everywhere" — best for referenced content.

**1. Tag Your Queries:**

```typescript
// Posts index - revalidate when ANY post, author, or category changes
const posts = await sanityFetch({
  query: POSTS_QUERY,
  tags: ['post', 'author', 'category'],
});

// Individual post - more granular, includes slug-specific tag
const post = await sanityFetch({
  query: POST_QUERY,
  params,
  tags: [`post:${params.slug}`, 'author', 'category'],
});
```

**2. Create API Route:**

```typescript
// src/app/api/revalidate/tag/route.ts
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type WebhookPayload = { tags: string[] };

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }
    if (!Array.isArray(body?.tags) || !body.tags.length) {
      return new Response('Missing tags', { status: 400 });
    }

    body.tags.forEach(tag => revalidateTag(tag));
    return NextResponse.json({ revalidated: body.tags });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
```

**3. Create GROQ-Powered Webhook:**

- URL: `https://yoursite.com/api/revalidate/tag`
- Filter: `_type in ["post", "author", "category"]`
- Projection: `{ "tags": [_type, _type + ":" + slug.current] }`

### Stale Data After Webhook?

Webhooks fire _before_ Sanity CDN updates. If you see stale data:

1. **Add delay** — Pass `true` as third arg to `parseBody`
2. **Or bypass CDN** — Set `useCdn: false` in client config (use sparingly)

## 4. Visual Editing (Stega) & Clean Data

Visual Editing injects invisible characters into strings to enable click-to-edit.

### A. The Golden Rule of Stega

If a string field controls logic (alignment, colors, IDs), you **must** clean it before comparing.

```typescript
import { stegaClean } from "@sanity/client/stega";

export function Layout({ align }: { align: string }) {
  // ❌ Bad: Will fail in Edit Mode due to invisible chars
  // if (align === 'center') ...

  // ✅ Good: Clean the value first
  const cleanAlign = stegaClean(align);
  return <div className={cleanAlign === 'center' ? 'mx-auto' : ''} />
}
```

### B. Metadata & SEO (Critical)

**Never** let Stega characters leak into `<head>` tags. Always set `stega: false` for metadata fetching.

```typescript
export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({
    query: SEO_QUERY,
    params: await params,
    stega: false, // 👈 Critical for SEO
  });
  return { title: data?.title };
}
```

### C. Static Params

When generating static params, fetch only published content and disable stega.

```typescript
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: SLUGS_QUERY,
    perspective: 'published', // 👈 No drafts
    stega: false,
  });
  return data;
}
```

## 5. Setup: Embedded Studio

Mount the Studio on a Next.js route.

**`src/app/studio/[[...tool]]/page.tsx`:**

```typescript
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

## 6. Setup: Draft Mode

Enable Presentation Tool and Visual Editing by setting up a draft mode route.

**`src/app/api/draft-mode/enable/route.ts`:**

```typescript
import { client } from '@/sanity/lib/client';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { token } from '@/sanity/lib/token'; // Helper to get token

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
```

## 7. Error Handling

Use `notFound()` for missing documents. Common errors:

| Error              | Cause                 | Solution                           |
| ------------------ | --------------------- | ---------------------------------- |
| 401 Unauthorized   | Invalid/missing token | Check `SANITY_API_READ_TOKEN`      |
| 403 Forbidden      | CORS not configured   | Add URL to CORS origins            |
| Query syntax error | Invalid GROQ          | Test in Vision plugin first        |
| Empty result       | Wrong filter/params   | Log params, check `_type` spelling |

```typescript
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: Props) {
  const { data } = await sanityFetch({ query: POST_QUERY, params: await params })
  if (!data) notFound()
  return <Post data={data} />
}
```

## 8. Presentation Queries (`usePresentationQuery`)

For faster live editing in the Presentation Tool, use `usePresentationQuery` to fetch only the specific block being edited, rather than re-rendering the entire page.

### Why Use This

- **Without:** Editing a hero title re-fetches the whole page, re-renders all blocks
- **With:** Only the hero block re-fetches and re-renders

This is especially valuable for pages with many Page Builder blocks or complex Portable Text.

### Basic Pattern

```typescript
'use client'
import { usePresentationQuery } from 'next-sanity/hooks'
import { HERO_PRESENTATION_QUERY } from '@/sanity/lib/queries'

type HeroProps = {
  _key: string
  documentId: string
  title: string
  subtitle?: string
  // ... other initial props from page query
}

export function Hero({ _key, documentId, title, subtitle, ...rest }: HeroProps) {
  // Fetch block-specific data for faster updates in Presentation Tool
  const { data } = usePresentationQuery({
    query: HERO_PRESENTATION_QUERY,
    params: { documentId, blockKey: _key },
  })

  // Use presentation data if available, fallback to initial server props
  const blockData = data?.heroBlock || { title, subtitle, ...rest }

  return (
    <section>
      <h1>{blockData.title}</h1>
      {blockData.subtitle && <p>{blockData.subtitle}</p>}
    </section>
  )
}
```

### The Presentation Query

Create a query that targets the specific block by `_key`:

```typescript
// queries.ts
export const HERO_PRESENTATION_QUERY = defineQuery(`
  *[_id == $documentId][0]{
    _id,
    _type,
    "heroBlock": pageBuilder[_key == $blockKey && _type == "hero"][0]{
      title,
      subtitle,
      image,
      theme,
      // Include all fields the component needs
    }
  }
`);
```

### Passing Document Context

Your PageBuilder component needs to pass `documentId` to each block:

```typescript
export function PageBuilder({ content, documentId }: { content: Block[]; documentId: string }) {
  return (
    <main>
      {content.map((block) => {
        switch (block._type) {
          case "hero":
            return <Hero key={block._key} documentId={documentId} {...block} />
          // ... other blocks
        }
      })}
    </main>
  )
}
```

### For Portable Text Blocks

The same pattern works for custom blocks inside Portable Text:

```typescript
export const PTE_IMAGE_PRESENTATION_QUERY = defineQuery(`
  *[_id == $documentId][0]{
    "pteImageBlock": body[_key == $blockKey && _type == "pteImage"][0]{
      image,
      caption,
      alt
    }
  }
`);
```

**See also:** `visual-editing.md` for the conceptual overview and `page-builder.md` for full Page Builder patterns.

## 9. Pagination Pattern

For listing pages with many entries, use offset-based pagination with a count query.

### Queries

```typescript
// Paginated listing
export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)]
  | order(date desc) [$start...$end] {
    _id, title, "slug": slug.current, date
  }
`);

// Total count for pagination UI
export const ARTICLES_COUNT_QUERY = defineQuery(`
  count(*[_type == "article" && defined(slug.current)])
`);
```

### Listing Page

```typescript
const ENTRIES_PER_PAGE = 10;

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1");
  const start = (page - 1) * ENTRIES_PER_PAGE;
  const end = start + ENTRIES_PER_PAGE;

  const [{ data: articles }, { data: total }] = await Promise.all([
    sanityFetch({ query: ARTICLES_QUERY, params: { start, end } }),
    sanityFetch({ query: ARTICLES_COUNT_QUERY })
  ]);

  const totalPages = Math.ceil(total / ENTRIES_PER_PAGE);

  return (
    <main>
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
      <Pagination current={page} total={totalPages} />
    </main>
  );
}
```

---

# Sanity TypeGen Rules

## 1. The Workflow

Sanity TypeGen generates TypeScript types from your schema and GROQ queries. Types can be generated automatically or manually.

### Automatic (Recommended)

Enable in `sanity.cli.ts` — types regenerate during `sanity dev` and `sanity build`:

```typescript
// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  typegen: {
    enabled: true,
  },
});
```

### Manual

Run the extract + generate cycle whenever schema or queries change:

1.  **Extract:** Converts your Schema (TS/JS) into a static JSON representation.
2.  **Generate:** Scans your codebase for GROQ queries and generates TypeScript types.

```bash
npx sanity schema extract && npx sanity typegen generate
```

### Watch Mode (for separate frontends)

If your frontend is in a separate repo from the Studio, use watch mode:

```bash
npx sanity typegen generate --watch
```

## 2. The "Update Types" Pattern

For manual workflows, implement a single script:

**package.json:**

```json
"scripts": {
  "typegen": "sanity schema extract && sanity typegen generate"
}
```

### Git Strategy for Generated Files

**Option A: Commit generated types (Recommended for most teams)**

- Types available immediately after `git pull`
- CI/CD doesn't need to run typegen
- Can cause merge conflicts

**Option B: Generate in CI (Recommended for larger teams)**
Add to `../.gitignore`:

```gitignore
# Sanity TypeGen (generated)
sanity.types.ts
schema.json
```

Then ensure CI runs typegen before build:

```yaml
# Example GitHub Actions
- run: npm run typegen
- run: npm run build
```

## 3. Configuration (`sanity.cli.ts`)

> **Note:** `sanity-typegen.json` is deprecated. Move your configuration to `sanity.cli.ts`.

```typescript
// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  typegen: {
    enabled: true, // Auto-generate during sanity dev/build
    path: './src/**/*.{ts,tsx,js,jsx,astro,svelte,vue}', // Glob to find queries
    schema: 'schema.json', // Schema file from extract
    generates: './sanity.types.ts', // Output file
    overloadClientMethods: true, // Auto-type client.fetch() calls
  },
});
```

### Project Structure Examples

**Single Repo / Embedded Studio (most common):**
Use defaults — no extra config needed.

**Monorepo** (Studio in `apps/studio`, Frontend in `apps/web`):

```typescript
export default defineCliConfig({
  typegen: {
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
  },
});
```

**Separate Repos:**
Use `--watch` mode in your frontend: `sanity typegen generate --watch`

## 4. Usage in Code

### Automatic Type Inference (Recommended)

With `overloadClientMethods: true` (default), `client.fetch()` automatically returns typed results when you use `defineQuery`:

```typescript
import { defineQuery } from "groq";
import { createClient } from "@sanity/client";

const client = createClient({...});

const POSTS_QUERY = defineQuery(`*[_type == "post"]{ title, slug }`);

// Return type is automatically inferred — no manual type import needed!
const posts = await client.fetch(POSTS_QUERY);
```

### Manual Type Import (Alternative)

You can also import generated types directly:

```typescript
import { defineQuery } from "groq";
// Next.js re-exports defineQuery for convenience:
// import { defineQuery } from "next-sanity";

const AUTHOR_QUERY = defineQuery(`*[_type == "author" && slug.current == $slug][0]{ name, bio }`);

import type { AUTHOR_QUERYResult } from "@/sanity.types";

export default function Author({ data }: { data: AUTHOR_QUERYResult }) {
  return <h1>{data.name}</h1>
}
```

### Required Fields

Use `--enforce-required-fields` during extraction to translate `validation: rule => rule.required()` into non-optional types:

```bash
npx sanity schema extract --enforce-required-fields
npx sanity typegen generate
```

> **Warning:** If you use draft previews, fields may still be `undefined` even with required validation, since drafts can be in an invalid state.

### Type Utilities

TypeGen provides utilities for working with complex types:

```typescript
import type { Get, FilterByType } from 'sanity';
import type { Page, PageBuilder } from './sanity.types';

// Extract deeply nested type (up to 20 levels)
type HeroSection = Get<Page, 'sections', number, 'hero'>;

// Filter specific types from unions using _type discriminator
type HeroBlock = FilterByType<PageBuilder, 'hero'>;
```

### Unique Query Names

All queries must have unique variable names. Duplicate names across files will cause TypeGen to silently overwrite types. Use descriptive, scoped names:

```typescript
// Unique names
const POSTS_INDEX_QUERY = defineQuery(`*[_type == "post"]{ title }`);
const POST_DETAIL_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`,
);

// Duplicate names will conflict
const QUERY = defineQuery(`*[_type == "post"]`); // file-a.ts
const QUERY = defineQuery(`*[_type == "author"]`); // file-b.ts — overwrites!
```

### Supported Query Formats

Queries must be assigned to a variable using `groq` or `defineQuery`:

```typescript
// Works — groq template tag
const query = groq`*[_type == "post"]`;

// Works — defineQuery
const query = defineQuery(`*[_type == "post"]`);

// Won't work — inline query
await client.fetch(groq`*[_type == "post"]`);
```

### Supported File Types

TypeGen parses queries from: `.ts`, `.tsx`, `.js`, `.jsx`, `.astro`, `.svelte`, `.vue`

### tsconfig Requirements

Ensure `sanity.types.ts` is included in your `tsconfig.json`'s `include` array. If your config restricts includes (e.g., `["src/**/*"]`) and the types file is at the project root, TypeScript won't pick up the generated types:

```json
{
  "include": ["src/**/*", "sanity.types.ts"]
}
```

### Skipping Individual Queries

Add `@sanity-typegen-ignore` in a comment before a query to skip type generation:

```typescript
// @sanity-typegen-ignore
const debugQuery = groq`*[_type == "debug"]`;
```

---

# Sanity Visual Editing Rules

## 1. Concepts

### Presentation Tool

The Studio plugin (`sanity/presentation`) that renders your front-end application inside an iframe in the Studio. It enables the "Edit" overlay and bidirectional navigation.

### Content Source Maps (Stega)

Invisible characters embedded in strings that tell the Presentation Tool which field in which document the content comes from.

- **Mechanism:** Sanity encodes document ID, field path, and dataset info into string values.
- **Result:** Click-to-edit functionality in the preview.

### Loaders

Framework-agnostic or specific libraries that handle:

1.  Fetching data (production vs. preview).
2.  Subscribing to real-time updates (Live Content API).
3.  Encoding Stega strings (if not handled by the Content Lake automatically).

## 2. The Golden Rule of Stega (Clean Data)

When Visual Editing is enabled, string fields will contain invisible characters. You **MUST** clean them before using the value for logic.

| Scenario                             | Clean? | Why                   |
| ------------------------------------ | ------ | --------------------- |
| Comparing strings (`if (x === 'y')`) | ✅ Yes | Stega breaks equality |
| Using as object keys                 | ✅ Yes | Keys won't match      |
| Using as HTML IDs                    | ✅ Yes | Invalid characters    |
| Passing to third-party libraries     | ✅ Yes | May validate input    |
| Rendering text (`<h1>{title}</h1>`)  | ❌ No  | Breaks click-to-edit  |
| Passing to `<PortableText />`        | ❌ No  | Handles internally    |
| Passing to image helpers             | ❌ No  | Handles internally    |

```typescript
import { stegaClean } from "@sanity/client/stega";

export function Layout({ align }: { align: string }) {
  // Good: Clean before comparison
  const cleanAlign = stegaClean(align);
  return <div className={cleanAlign === 'center' ? 'mx-auto' : ''} />
}
```

## 3. Token Handling (Security)

Store your read token in a dedicated file that throws if missing:

```typescript
// src/sanity/lib/token.ts
export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}
```

**Never** expose tokens in client bundles. Pass to `defineLive` for server/browser use only when Draft Mode is enabled.

## 4. Setup: Presentation Tool

**File:** `sanity.config.ts`

```typescript
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { resolve } from '@/sanity/presentation/resolve';

export default defineConfig({
  // ...
  plugins: [
    presentationTool({
      resolve, // Document locations (see below)
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
});
```

### Document Locations

Show where documents appear in the front-end — enables quick navigation between Structure and Presentation tools.

```typescript
// src/sanity/presentation/resolve.ts
import {
  defineLocations,
  PresentationPluginOptions,
} from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: doc => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/posts/${doc?.slug}` },
          { title: 'Posts index', href: `/posts` },
        ],
      }),
    }),
    // Add more document types as needed
  },
};
```

## 5. Visual Editing Overlays

Render `<VisualEditing />` in Draft Mode for click-to-edit overlays.

**Next.js (App Router):**

```typescript
// layout.tsx
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { DisableDraftMode } from '@/components/disable-draft-mode'

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  )
}
```

### Disable Draft Mode Button

Useful for content authors to exit preview and see published content:

```typescript
// src/components/disable-draft-mode.tsx
'use client'
import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()
  // Only show outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') return null

  return (
    <a href="/api/draft-mode/disable" className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2">
      Disable Draft Mode
    </a>
  )
}
```

**Remix/Svelte:** See framework-specific rules for `useLiveMode` and `enableVisualEditing` patterns.

## 6. SEO & Metadata (Critical)

**NEVER** allow Stega strings in `<head>` tags (Title, Description, Canonical URLs). It destroys SEO rankings and looks broken in search results.

- **Next.js:** Set `stega: false` in `generateMetadata`.
- **General:** Explicitly clean fields used in `<title>` or `<meta>`.

```typescript
// Next.js Example — disable stega at fetch level
export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({
    query: SEO_QUERY,
    stega: false, // Critical
  });
  return { title: data.title };
}
```

**Alternative:** If you can't disable stega at the fetch level, clean explicitly:

```typescript
import { stegaClean } from '@sanity/client/stega';

export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({ query: PAGE_QUERY });
  return {
    title: stegaClean(data.title),
    description: stegaClean(data.description),
    openGraph: { url: stegaClean(data.canonicalUrl) },
  };
}
```

## 7. Drag-and-Drop Reordering (Advanced)

For arrays (e.g., "Related Posts"), enable drag-and-drop in the preview using `data-sanity` attributes and `useOptimistic`:

```typescript
import { createDataAttribute } from 'next-sanity'
import { useOptimistic } from 'next-sanity/hooks'

// Add data-sanity to array container
<ul data-sanity={createDataAttribute({ id: documentId, type: 'post', path: 'relatedPosts' }).toString()}>
  {items.map((item) => (
    <li key={item._key} data-sanity={createDataAttribute({
      id: documentId, type: 'post', path: `relatedPosts[_key=="${item._key}"]`
    }).toString()}>
      {item.title}
    </li>
  ))}
</ul>
```

**Key requirements:**

- Query must include `_key` for array items
- Use `useOptimistic` hook for instant UI updates during mutations

## 8. Optimistic Updates for Faster Editing

By default, editing a field in the Presentation Tool triggers a full page re-render. For pages with many components, this can feel sluggish. **Presentation queries** solve this by fetching only the specific block being edited.

### The Concept

Instead of:

1. User edits a field -> Full page query re-runs -> All components re-render

You get:

1. User edits a field -> Block-specific query runs -> Only that component re-renders

### How It Works

1. **Create a targeted query** that fetches just the block data using `_key`:

```groq
*[_id == $documentId][0]{
  "heroBlock": pageBuilder[_key == $blockKey && _type == "hero"][0]{
    title, subtitle, image
  }
}
```

2. **Use a presentation query hook** in your component (e.g., `usePresentationQuery` in Next.js)

3. **Fall back to initial props** when not in presentation mode

This pattern works for both Page Builder blocks (`pageBuilder[]`) and Portable Text blocks (`body[]`).

**See framework-specific rules for implementation:**

- Next.js: `nextjs.md` (Section 9)
- Page Builder: `page-builder.md` (Section 5)
- Portable Text: `portable-text.md` (Section 7)

## 9. Framework Specifics

| Framework   | Loader Package          | Key Components                                               |
| :---------- | :---------------------- | :----------------------------------------------------------- |
| **Next.js** | `next-sanity`           | `<VisualEditing />`, `defineLive`, `usePresentationQuery`    |
| **Remix**   | `@sanity/react-loader`  | `createQueryStore`, `useLiveMode`, `enableVisualEditing`     |
| **Svelte**  | `@sanity/svelte-loader` | `createRequestHandler`, `useLiveMode`, `enableVisualEditing` |
| **Nuxt**    | `@nuxtjs/sanity`        | Automatic via module config (`visualEditing: {}`)            |
| **Astro**   | `@sanity/astro`         | `sanity({ useCdn: false, stega: true })`                     |

---

# Sanity Studio Structure Rules

## 1. Setup

Custom structure is defined in `sanity.config.ts` using the `structureTool`.

```typescript
import { structureTool } from 'sanity/structure';
import { structure } from './src/structure';

export default defineConfig({
  // ...
  plugins: [structureTool({ structure })],
});
```

## 2. Structure Definition

**Location:** `src/structure/index.ts`

Use a function that receives `S` (StructureBuilder).

```typescript
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = S =>
  S.list().title('Content').items([
    // ... items
  ]);
```

## 3. Organization Principles

1.  **Singletons First:** Place critical site-wide settings (Global Settings, Homepage) at the top.
2.  **Dividers:** Use `S.divider()` to visually separate logical groups.
3.  **Filtered Lists:** Always exclude Singleton documents from generic `documentTypeList` items to avoid duplication.

## 4. Singleton Pattern (Critical)

**Singletons are enforced via Structure, NOT schema options.** There is no `singleton: true` schema option.

### How Singletons Work

1. Use `S.document().documentId('fixed-id')` to lock the document to a specific ID.
2. Filter the type from generic lists to prevent duplicate entries.

### Singleton Helper Function

```typescript
// Helper to create singleton list items
function createSingleton(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon?: ComponentType,
) {
  return S.listItem().title(title).icon(icon).child(
    S.document()
      .schemaType(typeName)
      .documentId(typeName) // Fixed ID = singleton
      .title(title),
  );
}

// Usage
createSingleton(S, 'settings', 'Site Settings', CogIcon);
```

### Querying Singletons

```groq
// By fixed ID (most efficient)
*[_id == "settings"][0]

// By type (works but slower)
*[_type == "settings"][0]
```

**For localized singletons** (e.g., homepage per language), see `localization.md` Section 6.

## 5. Implementation Pattern

```typescript
// Define singleton types to exclude from generic lists
const SINGLETONS = ['settings', 'homePage'];

export const structure: StructureResolver = S =>
  S.list()
    .title('Website Content')
    .items([
      // 1. Singletons
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.divider(),

      // 2. Content Verticals
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog Content')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),

      S.divider(),

      // 3. Remaining Documents (Filtered)
      ...S.documentTypeListItems().filter(
        listItem => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ]);
```

## 6. Views (Split Pane)

Add "Web Preview" or other views to documents.

```typescript
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(), // Default form
        S.view.component(PreviewComponent).title('Preview'), // Custom view
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
```

---

# Sanity Image Rules

## 1. Schema Definition

**Always** enable `hotspot: true`. This allows editors to control cropping and the focal point.

```typescript
defineField({
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',
  options: {
    hotspot: true, // CRITICAL
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      validation: rule =>
        rule.required().warning('Alt text is important for SEO'),
    }),
  ],
});
```

## 2. URL Builder (`urlFor`)

Use the Sanity Image URL Builder to generate optimized URLs (resize, crop, format).

**Setup (`sanity/lib/image.ts`):**

```typescript
import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: any) => {
  return builder.image(source);
};
```

**Usage:** The URL builder automatically uses hotspot/crop data when available:

```typescript
const imageUrl = urlFor(mainImage)
  .width(800)
  .height(600)
  .fit('crop') // Respects hotspot when cropping
  .url();
```

## 3. Next.js Image Component Pattern

Create a reusable `SanityImage` component that handles the `urlFor` logic and `next/image` props.

```typescript
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
  value: any // SanityImageSource
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function SanityImage({ value, width = 800, height, className, priority }: SanityImageProps) {
  if (!value?.asset) return null

  return (
    <Image
      className={className}
      src={urlFor(value)
        .width(width)
        .height(height || Math.round(width / 1.5)) // Default aspect ratio if no height
        .url()}
      alt={value.alt || ''}
      width={width}
      height={height || Math.round(width / 1.5)}
      priority={priority}
      // Optional: Use LQIP (Low Quality Image Placeholder)
      placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={value.asset.metadata?.lqip}
    />
  )
}
```

## 4. Querying Images

**Critical:** LQIP (Low Quality Image Placeholder) is **not automatic**. You must explicitly query it via `asset->{ metadata { lqip } }`.

### Minimal Query (No LQIP)

```groq
mainImage {
  asset->{ _id, url },
  alt
}
```

### Full Query (With LQIP & Dimensions)

```groq
mainImage {
  asset->{
    _id,
    url,
    metadata {
      lqip,                          // Base64 blur placeholder
      dimensions { width, height }   // For aspect ratio
    }
  },
  alt,
  hotspot,  // Include if using hotspot cropping
  crop      // Include if using cropping
}
```

**Why this matters:** Without querying `metadata.lqip`, the `blurDataURL` in your component will be `undefined` and the blur effect won't work.

## 5. Performance Tips

- **Auto Format:** Sanity CDN automatically serves WebP/AVIF if the browser supports it (no need to specify `.format('webp')` manually in most cases, but `next/image` handles this too).
- **Sizing:** Always request the exact size you need using `.width()` and `.height()` in `urlFor`. Don't download a 4000px image for a thumbnail.

---

# Sanity Portable Text Rules

Portable Text is Sanity's rich text format, used for content like article bodies (`body[]`). This guide covers rendering and creating custom PTE components.

**Note:** For page-level layout blocks (`pageBuilder[]`), see `page-builder.md`.

## 1. The Component

Use the `PortableText` component from `next-sanity` (or `@portabletext/react`).

```typescript
import { PortableText } from "next-sanity";
// or import { PortableText } from "@portabletext/react";

export function Content({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
```

## 2. Custom Components (`components` prop)

**Always** define a typed components object to handle custom blocks, marks, and list styles.

```typescript
import { PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
  // 1. Block styles (paragraphs, headings)
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
    blockquote: ({ children }) => <blockquote className="border-l-4 pl-4">{children}</blockquote>,
  },

  // 2. Custom types (non-text blocks like images, videos)
  types: {
    image: ({ value }) => <SanityImage value={value} />,
    callToAction: ({ value }) => <Button href={value.url}>{value.text}</Button>,
  },

  // 3. Marks (inline decorators and annotations)
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return <a href={value.href} rel={rel} className="underline text-blue-600">{children}</a>;
    },
  },

  // 4. Lists
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
  },
};
```

## 3. Component Categories

Portable Text has three types of custom components, each with different patterns:

| Type             | Examples                   | Pattern                           |
| ---------------- | -------------------------- | --------------------------------- |
| **Block styles** | h1, h2, blockquote, normal | Text blocks with `children` prop  |
| **Custom types** | image, video, callToAction | Non-text blocks with `value` prop |
| **Marks**        | link, strong, productRef   | Inline annotations wrapping text  |

## 4. Creating Block Style Components

Block styles are text blocks like headings and paragraphs. For simple styling, inline components work fine:

```typescript
block: {
  h2: ({ children }) => <h2 className="mt-8 mb-4 text-3xl font-bold">{children}</h2>,
  normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
}
```

### With Visual Editing Support

For live editing in the Presentation Tool, block style components may need **both** a client and server version:

```typescript
// Heading2.tsx (Server - simple SSR for production)
export function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 mb-4 text-3xl font-bold">{children}</h2>;
}

// Heading2Client.tsx (Client - for visual editing context)
'use client'
export function Heading2Client({ children, value }: { children: React.ReactNode; value: any }) {
  // Can access block data via `value` for advanced patterns
  return <h2 className="mt-8 mb-4 text-3xl font-bold">{children}</h2>;
}
```

Use `useIsPresentationTool` to conditionally render the client version:

```typescript
import { useIsPresentationTool } from 'next-sanity/hooks'

function Heading2Wrapper(props) {
  const isPresentationTool = useIsPresentationTool()

  if (isPresentationTool) {
    return <Heading2Client {...props} />
  }
  return <Heading2 {...props} />
}
```

## 5. Creating Custom Type Components

Custom types are non-text blocks like images, videos, or CTAs embedded in rich text.

### Schema Definition

```typescript
// schemaTypes/blocks/pteImageBlock.ts
import { defineType, defineField } from 'sanity';

export const pteImageBlock = defineType({
  name: 'pteImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'alt', type: 'string', validation: r => r.required() }),
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
  },
});
```

### Register in Body Schema

```typescript
defineField({
  name: 'body',
  type: 'array',
  of: [
    { type: 'block' }, // Standard text
    { type: 'pteImage' }, // Custom image block
    { type: 'pteVideo' }, // Custom video block
  ],
});
```

### Frontend Component

```typescript
// PteImageComponent.tsx
'use client'

type PteImageProps = {
  value: {
    _key: string
    image: any
    caption?: string
    alt: string
  }
}

export function PteImageComponent({ value }: PteImageProps) {
  if (!value.image) return null

  return (
    <figure className="my-8">
      <SanityImage value={value.image} alt={value.alt} />
      {value.caption && (
        <figcaption className="text-sm text-gray-600 mt-2">{value.caption}</figcaption>
      )}
    </figure>
  )
}

// Register in components
const components: PortableTextComponents = {
  types: {
    pteImage: PteImageComponent,
  },
}
```

## 6. Creating Mark Components

Marks are inline annotations that wrap text—links, highlights, or custom references.

### Schema Definition (Annotation)

```typescript
// In your block configuration
defineField({
  name: 'body',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Highlight', value: 'highlight' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Open in new tab',
              },
            ],
          },
          {
            name: 'productRef',
            type: 'object',
            title: 'Product Reference',
            fields: [
              { name: 'product', type: 'reference', to: [{ type: 'product' }] },
            ],
          },
        ],
      },
    },
  ],
});
```

### Frontend Component

```typescript
// LinkMark.tsx
type LinkMarkProps = {
  children: React.ReactNode
  value: {
    href: string
    openInNewTab?: boolean
  }
}

export function LinkMark({ children, value }: LinkMarkProps) {
  const { href, openInNewTab } = value
  const target = openInNewTab ? '_blank' : undefined
  const rel = openInNewTab ? 'noopener noreferrer' : undefined

  return (
    <a href={href} target={target} rel={rel} className="text-blue-600 underline">
      {children}
    </a>
  )
}

// Register in components
const components: PortableTextComponents = {
  marks: {
    link: LinkMark,
    highlight: ({ children }) => <mark className="bg-yellow-200">{children}</mark>,
  },
}
```

## 7. Presentation Queries for PTE Blocks

For faster live editing of custom PTE blocks, use presentation queries that fetch only the specific block:

```typescript
// queries.ts
export const PTE_IMAGE_PRESENTATION_QUERY = defineQuery(`
  *[_id == $documentId][0]{
    _id,
    _type,
    "pteImageBlock": body[_key == $blockKey && _type == "pteImage"][0]{
      _key,
      image,
      caption,
      alt
    }
  }
`);
```

Then in your component:

```typescript
'use client';
import { usePresentationQuery } from 'next-sanity/hooks';

export function PteImageComponent({
  value,
  documentId,
}: {
  value: any;
  documentId?: string;
}) {
  const { data } = usePresentationQuery({
    query: PTE_IMAGE_PRESENTATION_QUERY,
    params: { documentId, blockKey: value._key },
  });

  const blockData = data?.pteImageBlock || value;

  // ... render with blockData
}
```

**Note:** You'll need to pass `documentId` through to your PTE components. See `visual-editing.md` for context patterns.

## 8. GROQ Fragment for PTE

When querying documents with Portable Text, expand custom blocks:

```groq
*[_type == "article" && slug.current == $slug][0]{
  ...,
  body[]{
    ...,
    _type == "pteImage" => {
      ...,
      "imageUrl": image.asset->url
    },
    _type == "pteVideo" => {
      ...,
      video->{ title, url }
    }
  }
}
```

## 9. Stega and Visual Editing

When Visual Editing is enabled, text content contains invisible stega characters for click-to-edit functionality.

**For text rendering:** Let stega characters pass through—they enable overlays:

```typescript
// Good - stega preserved for click-to-edit
<h2>{children}</h2>
```

**For logic/comparisons:** Clean the values first:

```typescript
import { stegaClean } from '@sanity/client/stega'

// Clean before using in logic
const cleanedStyle = stegaClean(block.style)
if (cleanedStyle === 'h2') { ... }
```

## 10. Type Safety

When using TypeGen, the Portable Text value usually has a complex generated type. You can often use `any` or `PortableTextBlock[]` for the _prop_, but cast specific blocks if needed.

```typescript
import { PortableTextBlock } from 'next-sanity';

type Props = {
  value: PortableTextBlock[];
};
```

## 11. Best Practices

- **Tailwind Typography:** For simple blogs, wrap `<PortableText />` in a `<div className="prose">` (from `@tailwindcss/typography`) instead of manually styling every block.
- **Handling Nulls:** Always check if `value` exists and is an array before rendering.
- **Keys:** The `PortableText` component handles React keys automatically using the `_key` from Sanity. Do not add keys manually.
- **Separate from Page Builder:** PTE blocks live in `body[]` (rich text fields), not `pageBuilder[]` (page layout). Keep these patterns separate.

---

# Sanity Project Structure

## Standalone Studio

Best for content-only projects, API-first architectures, or when frontend is managed separately.

```
your-project/
├── schemaTypes/
│   ├── index.ts
│   ├── documents/
│   ├── objects/
│   └── blocks/
├── sanity.config.ts
├── sanity.cli.ts
└── package.json
```

**Use cases:**

- Content modeling with MCP/AI tools (no frontend needed)
- Headless CMS with external consumers
- Prototyping and content design

## Embedded Studio (Recommended for Next.js)

Best for most Next.js projects. Unified deployment, simpler setup.

```
your-project/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── studio/[[...tool]]/ # Embedded Studio route
│   └── sanity/
│       ├── lib/
│       │   ├── client.ts
│       │   ├── live.ts         # defineLive setup
│       │   └── queries.ts
│       └── schemaTypes/
│           ├── index.ts
│           ├── documents/
│           ├── objects/
│           └── blocks/
├── sanity.config.ts
├── sanity.cli.ts               # CLI + TypeGen configuration
└── sanity.types.ts             # Generated types (from TypeGen)
```

## Monorepo

Best when you need separation of concerns, multiple frontends, or strict dependency isolation.

```
your-project/
├── apps/
│   ├── studio/                 # Sanity Studio (standalone)
│   │   ├── src/
│   │   │   └── schemaTypes/
│   │   │       ├── index.ts
│   │   │       ├── documents/
│   │   │       ├── objects/
│   │   │       └── blocks/
│   │   ├── sanity.config.ts
│   │   ├── sanity.cli.ts
│   │   └── package.json
│   └── web/                    # Next.js (or other framework)
│       ├── src/
│       │   ├── app/
│       │   └── sanity/
│       │       ├── client.ts
│       │       ├── live.ts
│       │       └── queries.ts
│       └── package.json
├── pnpm-workspace.yaml
└── package.json
```

**Setup:**

1. Add web app URL to CORS origins in Sanity project settings
2. Configure `typegen` in `sanity.cli.ts` to read schema from `apps/studio` and output types to `apps/web`

## File Naming Conventions

- **kebab-case** for all files: `user-profile.ts`, `hero-block.ts`
- `.ts` for schemas/utilities, `.tsx` for React components
- Each schema exports a named const matching filename

## Schema Directory Structure

```
schemaTypes/
├── index.ts              # Exports all types
├── documents/            # Standalone content types
│   ├── post.ts
│   └── author.ts
├── objects/              # Embeddable/reusable types
│   ├── seo.ts
│   └── link.ts
├── blocks/               # Portable Text blocks
│   ├── hero.ts
│   └── callout.ts
└── shared/               # Shared field definitions
    └── seoFields.ts
```

## Key Files

| File               | Purpose                                                 |
| ------------------ | ------------------------------------------------------- |
| `sanity.config.ts` | Studio configuration (plugins, schema, structure)       |
| `sanity.cli.ts`    | CLI configuration (project ID, dataset, TypeGen config) |
| `structure.ts`     | Custom desk structure                                   |
