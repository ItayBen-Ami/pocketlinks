# Pocketlinks

A small bookmark manager, which allows you to create public or private lists and view your bookmarks beautifully in various layouts.
The site is available [here](https://pocketlinks.netlify.app/).
![image](https://github.com/user-attachments/assets/661d6b1a-2e6f-496a-8199-0e50730a13fc)

---

## Project Structure

This app uses [supabase](https://supabase.com/) for database management. The site preview scraping happens via a serverless function deployed to supabase and
written in [Deno](https://deno.com/), which can be found in the `functions/sitePreview` directory.

The rest of the app is a Vite React Ts app.

---

## Installation

1. Clone the repository:
 ```bash
 git clone https://github.com/ItayBen-Ami/stock-market-feed.git
 cd pocketlinks
 ```
1. Install dependencies:
```bash
pnpm install
```
## Running the App

1. Start the dev server
```bash
pnpm run dev
```


