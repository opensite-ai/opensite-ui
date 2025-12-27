
# Iconify Server

A self-hosted Iconify icon library server built for Vercel, providing access to 15+ popular icon collections through a REST API and web interface.

## Features

- **15+ Icon Collections**: Material Symbols, MDI, Lucide, Feather, Simple Icons, and more
- **REST API**: Full-featured API for icon retrieval and search
- **Web Interface**: Browse and search icons with a modern UI
- **SVG & JSON Output**: Get icons as SVG or JSON data
- **Rate Limiting**: Built-in protection against abuse
- **Caching**: Intelligent caching for optimal performance
- **Vercel Optimized**: Designed specifically for Vercel deployment

## Supported Collections

- Material Symbols (Google)
- Material Design Icons (MDI)
- Material Line Icons (line-md)
- Myna UI Icons
- Lucide & Lucide Lab
- Majesticons
- Flowbite Icons
- Prime Icons
- Feather Icons
- Ultimate Color Icons (Icon Park)
- Sharp Color Icons (Icon Park Solid)
- Simple Icons
- Logos Free Icons
- CoreUI Brands

## API Endpoints

### Get All Collections

\`\`\`
GET /api/collections
GET /api/collections?category=Brands
GET /api/collections?search=feather
\`\`\`
Response
\`\`\`
{
"collections": [
{
"prefix": "feather",
"name": "Feather Icons",
"author": "Cole Bemis",
"total": 286,
"category": "General",
"palette": false,
"samples": ["home","heart","star","user","settings"],
"status": "loaded"
}
],
"total": 15,
"timestamp": "2025-09-24T00:00:00.000Z"
}
\`\`\`

### Get Collection Details

\`\`\`
GET /api/collection/{prefix}
GET /api/collection/{prefix}?icons=true&limit=100
\`\`\`
Response (with icons=true)
\`\`\`
{
"prefix": "lucide",
"name": "Lucide",
"author": "Lucide Contributors",
"url": "<https://lucide.dev/>",
"license": "ISC",
"samples": ["home","heart","star","user","settings"],
"height": 24,
"category": "General",
"palette": false,
"total": 1270,
"icons": ["home","user", "..."],
"iconsCount": 100,
"timestamp": "2025-09-24T00:00:00.000Z"
}
\`\`\`

### Get Icon Data

\`\`\`
GET /api/icon/{prefix}/{name}?format=json
GET /api/icon/{prefix}/{name}?format=svg&width=24&height=24&color=red
\`\`\`
Notes
\`\`\`

- format=json returns { prefix, name, icon } where icon is an Iconify JSON object.
- format=svg returns raw SVG with appropriate Content-Type headers.
  \`\`\`

### Search Icons

\`\`\`
GET /api/search?q=home&limit=50
GET /api/search?q=home&prefix=lucide
GET /api/search?q=home&category=Brands
\`\`\`
Response
\`\`\`
{
"query": "home",
"results": [
{ "prefix": "lucide", "name": "home", "collection": "Lucide" }
],
"total": 12,
"limit": 50,
"timestamp": "2025-09-24T00:00:00.000Z"
}
\`\`\`

### Server Statistics

\`\`\`
GET /api/stats
\`\`\`

## Usage Examples

### Get an icon as SVG

\`\`\`
<https://icons.opensite.ai/api/icon/lucide/home?format=svg&width=32&height=32>
\`\`\`

### Search for icons

\`\`\`
<https://icons.opensite.ai/api/search?q=user&limit=20>
\`\`\`

### Get collection info

\`\`\`
<https://icons.opensite.ai/api/collection/material-symbols?icons=true>
\`\`\`

## Deployment

1. Clone this repository
2. Deploy to Vercel using the Vercel CLI or GitHub integration
3. The server will automatically install and configure all icon collections

### CORS

All API routes include permissive CORS headers and respond to `OPTIONS` preflight via middleware, allowing direct use from your CMS/page builder.

### Rate Limit Headers

Each response includes:

- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

## Rate Limits

- API endpoints: 1000 requests per 15 minutes
- Icon requests: 100 requests per minute
- Search requests: 50 requests per minute

## License

This server is MIT licensed. Individual icon collections have their own licenses - see the API for license information for each collection.

export interface IconCollection {
  prefix: string
  name: string
  author: string
  url: string
  license: string
  samples: string[]
  height?: number
  category: string
  palette: boolean
}

export const SUPPORTED_COLLECTIONS: Record<string, IconCollection> = {
  "material-symbols": {
    prefix: "material-symbols",
    name: "Material Symbols",
    author: "Google",
    url: "<https://fonts.google.com/icons>",
    license: "Apache 2.0",
    samples: ["home", "search", "settings", "favorite", "person"],
    height: 24,
    category: "General",
    palette: false,
  },
  mdi: {
    prefix: "mdi",
    name: "Material Design Icons",
    author: "Austin Andrews",
    url: "<https://materialdesignicons.com/>",
    license: "Apache 2.0",
    samples: ["account", "home", "heart", "star", "settings"],
    height: 24,
    category: "General",
    palette: false,
  },
  "line-md": {
    prefix: "line-md",
    name: "Material Line Icons",
    author: "Vjacheslav Trushkin",
    url: "<https://github.com/cyberalien/line-md>",
    license: "MIT",
    samples: ["home-twotone", "heart", "star", "settings", "person"],
    height: 24,
    category: "General",
    palette: false,
  },
  mynaui: {
    prefix: "mynaui",
    name: "Myna UI Icons",
    author: "Myna UI",
    url: "<https://mynaui.com/>",
    license: "MIT",
    samples: ["home", "heart", "star", "user", "settings"],
    height: 24,
    category: "General",
    palette: false,
  },
  lucide: {
    prefix: "lucide",
    name: "Lucide",
    author: "Lucide Contributors",
    url: "<https://lucide.dev/>",
    license: "ISC",
    samples: ["home", "heart", "star", "user", "settings"],
    height: 24,
    category: "General",
    palette: false,
  },
  "lucide-lab": {
    prefix: "lucide-lab",
    name: "Lucide Lab",
    author: "Lucide Contributors",
    url: "<https://lucide.dev/>",
    license: "ISC",
    samples: ["flask", "beaker", "test-tube", "microscope", "atom"],
    height: 24,
    category: "General",
    palette: false,
  },
  majesticons: {
    prefix: "majesticons",
    name: "Majesticons",
    author: "Gerrit Halfmann",
    url: "<https://majesticons.com/>",
    license: "MIT",
    samples: ["home", "heart", "star", "user", "settings"],
    height: 24,
    category: "General",
    palette: false,
  },
  flowbite: {
    prefix: "flowbite",
    name: "Flowbite Icons",
    author: "Themesberg",
    url: "<https://flowbite.com/icons/>",
    license: "MIT",
    samples: ["home-outline", "heart-outline", "star-outline", "user-outline", "cog-outline"],
    height: 24,
    category: "General",
    palette: false,
  },
  prime: {
    prefix: "prime",
    name: "Prime Icons",
    author: "PrimeTek",
    url: "<https://github.com/primefaces/primeicons>",
    license: "MIT",
    samples: ["home", "heart", "star", "user", "cog"],
    height: 24,
    category: "General",
    palette: false,
  },
  feather: {
    prefix: "feather",
    name: "Feather Icons",
    author: "Cole Bemis",
    url: "<https://feathericons.com/>",
    license: "MIT",
    samples: ["home", "heart", "star", "user", "settings"],
    height: 24,
    category: "General",
    palette: false,
  },
  "icon-park": {
    prefix: "icon-park",
    name: "Ultimate Color Icons",
    author: "ByteDance",
    url: "<https://iconpark.oceanengine.com/>",
    license: "Apache 2.0",
    samples: ["home", "like", "star", "user", "setting"],
    height: 24,
    category: "General",
    palette: true,
  },
  "icon-park-solid": {
    prefix: "icon-park-solid",
    name: "Sharp Color Icons",
    author: "ByteDance",
    url: "<https://iconpark.oceanengine.com/>",
    license: "Apache 2.0",
    samples: ["home", "like", "star", "user", "setting"],
    height: 24,
    category: "General",
    palette: true,
  },
  "simple-icons": {
    prefix: "simple-icons",
    name: "Simple Icons",
    author: "Simple Icons Collaborators",
    url: "<https://simpleicons.org/>",
    license: "CC0 1.0",
    samples: ["github", "twitter", "facebook", "google", "apple"],
    height: 24,
    category: "Brands",
    palette: false,
  },
  logos: {
    prefix: "logos",
    name: "Logos Free Icons",
    author: "Gilbarbara",
    url: "<https://github.com/gilbarbara/logos>",
    license: "CC0 1.0",
    samples: ["react", "vue", "angular", "nodejs", "javascript"],
    height: 24,
    category: "Brands",
    palette: true,
  },
  // CoreUI Brand icons use the 'cib' prefix in Iconify
  cib: {
    prefix: "cib",
    name: "CoreUI Brands",
    author: "CoreUI",
    url: "<https://github.com/coreui/coreui-icons>",
    license: "CC BY 4.0",
    samples: ["github", "twitter", "facebook", "linkedin", "instagram"],
    height: 24,
    category: "Brands",
    palette: false,
  },
}

export function getCollectionInfo(prefix: string): IconCollection | null {
  return SUPPORTED_COLLECTIONS[prefix] || null
}

export function getAllCollections(): IconCollection[] {
  return Object.values(SUPPORTED_COLLECTIONS)
}

/**

- Resolve known alias prefixes to their canonical Iconify prefix.
- Example: 'coreui-brand' -> 'cib'
 */
export function resolvePrefix(input: string): string {
  const aliases: Record<string, string> = {
    "coreui-brand": "cib",
  }
  return aliases[input] || input
}
