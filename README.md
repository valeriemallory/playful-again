## Playful Again

Website for Valerie Mallory's art installation [Playful Again](https://playfulagain.org).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit 2.70](https://svelte.dev/docs/kit/introduction) |
| UI | [Svelte 5](https://svelte.dev/docs/svelte/overview) with Runes |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Language | TypeScript |
| Hosting | [Netlify](https://netlify.com) via `@sveltejs/adapter-netlify` |
| Build tooling | [Vite 7](https://vitejs.dev) |

## Development

### Install dependencies

```sh
npm install
```

### Start the dev server

```sh
npm run dev

# open in browser automatically
npm run dev -- --open
```

### Type checking

```sh
npm run check
```

### Build for production

```sh
npm run build

# preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── app.css                    Tailwind import + `.container-inner` layout utility
├── app.html                   Root HTML template; loads Open Sans from Google Fonts
├── lib/
│   ├── components/
│   │   ├── NavBar.svelte         Fixed top nav in the valerie-mallory-studio style (+ theme toggle, Instagram); slide-in drawer below 950px
│   │   ├── Footer.svelte         Copyright + social links
│   │   ├── SocialMediaLinks.svelte  Email / Facebook / Instagram icon links
│   │   ├── Carousel.svelte       Homepage hero — crossfades static/img/hero images (3:2, or square on portrait phones)
│   │   ├── ThanksForSupport.svelte  "Thanks for your support" section + Visit Our Studio button
│   │   └── ContactForm.svelte    Contact form (copied from valerie-mallory-studio)
│   ├── theme.svelte.ts        Light/dark theme state (copied from valerie-mallory-studio)
│   └── data/
│       └── team-list.json     Team member names, photos and bios (used on /team)
├── routes/
│   ├── +layout.svelte         Global layout: NavBar, Footer, site meta tags
│   ├── +page.svelte           Home: hero carousel + intro copy + concept art + Thanks for your support section
│   ├── contact/               Contact page (ContactForm)
│   ├── api/contact/           POST endpoint for the form (placeholder until Resend is connected — see dev-notes.txt)
│   ├── team/                  Team grid (photo + bio per member)
│   └── +error.svelte          404 page; the layout keeps the Footer at the bottom of the window
static/
├── img/                        Concept art, team photos, hero images (unoptimized originals)
├── favicon.png
└── playful-again-concept-art.jpg   Social-share (og:image / twitter:image) preview image
_redirects (project root)       Domain-alias redirects — must stay at the repo root, not in static/,
                                 for @sveltejs/adapter-netlify to pick it up
```

`legacy-site/` holds the previous Vue.js implementation, kept for reference only —
it is not built or deployed.

## Deployment

The site is hosted on [Netlify](https://netlify.com) using
`@sveltejs/adapter-netlify`. `netlify.toml` configures the build command
(`npm run build`) and publish directory (`build`). Connect the GitHub repo in
the Netlify dashboard, or deploy via the Netlify CLI:

```sh
npm install -g netlify-cli
netlify deploy
```

See `dev-notes.txt` for migration notes and open next-steps (image
optimization, etc).
