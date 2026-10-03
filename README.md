# Happy 30th, Aiyana — postcards 💌

A tiny, mobile-first static site: a cover screen, then swipeable vintage postcards.
Tap a card to flip it to the handwritten back.

## Add a postcard
1. Put the photo in `photos/` (a JPG around 1200px wide is plenty).
2. Open `cards.js` and copy one `{ ... }` block in `window.CARDS`, then fill in
   `from`, `photo`, `at30`, `wish` and (optionally) `signoff`, `closing`, `focus`.
   Cards show in the order listed. Delete the two `placeholder: true` cards when real ones are in.

`focus` controls the crop when a photo doesn't fit the card's shape,
e.g. `"30% 50%"` keeps the left-middle of the photo. Use `\n` for a line break in text.

## Run locally
No build step. Any static server works:

    python3 -m http.server 8765
    # open http://localhost:8765

(Opening `index.html` straight from disk works too, since the data is a plain script, not fetched JSON.)

## Deploy later
It's plain static files, so it can go on Vercel, Netlify or GitHub Pages as-is (project root = this folder).
