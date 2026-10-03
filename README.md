# Happy 30th, Aiyana — postcards 💌

A tiny, mobile-first static site: a cover screen, then swipeable vintage postcards.
Tap a card to flip it to the handwritten back. On a multi-photo card, use the
arrows or tap the left/right side of the photo to change pictures — a swipe
still moves to the next postcard.

Served as plain files from the repo root (GitHub Pages, including under
`/turning30/`). All asset paths are relative. No build step for the site itself.

## Add a postcard by hand

1. Put the photo in `photos/` (a JPG around 1200px wide is plenty).
   For several photos from one person, use a folder: `photos/jane/01.jpg`, `02.jpg`.
2. Open `cards.js` and copy one `{ ... }` block in `window.CARDS`, then fill in:

   - `from` — who it's from
   - `photo` — single photo path, **or** `photos: [{ src, caption?, focus? }]`
   - `letter` — optional freeform back text (kept verbatim, including line breaks).
     Use this instead of `at30` / `wish` / `signoff`.
   - `at30`, `wish`, and optionally `signoff`, `closing`, `focus`
   - `caption` — optional handwritten strip under a single `photo`

   Cards show in the order listed. Delete the `placeholder: true` demo card
   once real ones are in.

`focus` controls the crop when a photo doesn't fit the card's shape,
e.g. `"30% 50%"` keeps the left-middle of the photo. Use `\n` for a line break.

To keep a hand-edited card when you later run the folder import (Olivia &
Graeme live here), put it in `manual_cards.js` using quoted JSON keys.

## Add postcards from a folder of submissions

Organize files like this:

    MainFolder/
      Person Name/
        photo.png          + blurb.txt
      Other Name/
        photo1.png
        photo2.jpg
        main-blurb.txt
        caption1.txt       # optional; pairs with photo1
        caption2.txt

Image extensions may be `png`, `jpg`, `jpeg`, `heic`, or `webp` (any case).
The folder name becomes `from`. The blurb is copied verbatim into `letter`.
Photos are resized to about 1200px, EXIF-rotated, and saved as JPEGs under
`photos/<slug>/`. Cards are sorted alphabetically by name.

Install (once):

    python3 -m pip install Pillow
    python3 -m pip install pillow-heif   # optional, only needed for HEIC

Run from the repo root:

    python3 tools/build_cards.py /path/to/MainFolder

That regenerates `cards.js` and writes photos. Manual entries in
`manual_cards.js` are merged in, unless a folder with the same person name
is present (so Olivia & Graeme stay until their folder arrives).

    python3 tools/build_cards.py /path/to/MainFolder --no-manual
    python3 tools/build_cards.py /path/to/MainFolder --no-sort

Folders missing a photo or a blurb print a clear warning.

## Run locally

No build step. Any static server works:

    python3 -m http.server 8765
    # open http://localhost:8765

(Opening `index.html` straight from disk works too, since the data is a plain script, not fetched JSON.)

## Deploy

GitHub Pages deploys from `main` (see `.github/workflows/static.yml`).
Plain static files, project root = this folder.
