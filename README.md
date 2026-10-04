# Happy 30th, Aiyana — postcards 💌

A tiny, mobile-first static site: a cover screen, then swipeable vintage postcards.
Tap a card to flip it to the handwritten back. On a multi-photo card, use the
arrows or tap the left/right side of the photo to change pictures — a swipe
still moves to the next postcard.

Served as plain files from the repo root (GitHub Pages, including under
`/turning30/`). All asset paths are relative. No build step for the site itself.

## Add a postcard by hand

1. Put the photo in `photos/<name>/` (a JPG around 1200–1600px is plenty).
2. Open `cards.js` and copy one `{ ... }` block in `window.CARDS`, then fill in:

   - `from` — who it's from
   - `photo` — single photo path, **or** `photos: [{ src, caption?, focus? }]`
   - `letter` — freeform back text (kept verbatim, including line breaks).
     Use this instead of `at30` / `wish` / `signoff`.
   - optionally `signoff`, `closing`, `focus`, `caption`

`focus` controls the crop when a photo doesn't fit the card's shape,
e.g. `"30% 50%"`. Use `\n` for a line break.

To keep a hand-edited card when you later run the folder import, put it in
`manual_cards.js` using quoted JSON keys.

## Add postcards from a folder of submissions

Organize files like this:

    MainFolder/
      Person Name/
        photo.jpg          + Main.txt
      Other Name/
        photo1.jpg
        photo2.jpg
        Main.txt
        caption1.txt       # optional; pairs with photo1
      _aiyana/             # optional loose photos for the cover + end gallery

`Main.txt`, `blurb.txt`, and `main-blurb.txt` are all treated as the letter.
Image extensions may be `png`, `jpg`, `jpeg`, `heic`, or `webp` (any case).
The folder name becomes `from` (title-cased). Display-name overrides and
photo captions that live in the letter (not separate files) go in
`tools/import_hints.json`. Photos land in `photos/<slug>/`. Cards are sorted
alphabetically by display name.

Install (once):

    python3 -m pip install Pillow
    python3 -m pip install pillow-heif   # optional, only needed for HEIC

Run from the repo root:

    python3 tools/build_cards.py /path/to/MainFolder

    python3 tools/build_cards.py /path/to/MainFolder --no-manual
    python3 tools/build_cards.py /path/to/MainFolder --no-sort

Folders missing a photo or a letter print a clear warning.

## Run locally

No build step. Any static server works:

    python3 -m http.server 8765
    # open http://localhost:8765

(Opening `index.html` straight from disk works too, since the data is a plain script, not fetched JSON.)

## Deploy

GitHub Pages deploys from `main` (see `.github/workflows/static.yml`).
Plain static files, project root = this folder.
