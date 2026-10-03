/*
 * ✉️  POSTCARDS DATA — this is the only file you need to edit by hand.
 *
 * To add a card: drop the photo(s) into /photos, then copy one of the { ... }
 * blocks below and change the fields. Cards appear in the order listed
 * (the import script sorts them alphabetically by `from`).
 *
 *   from      – who it's from (shown as "Love from <from>" / "With love, <from>")
 *   photo     – path to a single photo, e.g. "photos/jane.jpg"
 *   photos    – (optional) several photos instead of `photo`:
 *               [ { src: "photos/jane/01.jpg", caption: "a note", focus: "center" } ]
 *               `caption` is the handwritten strip under that photo (optional).
 *               `focus` is per-photo crop (CSS object-position).
 *   caption   – (optional) handwritten strip under a single `photo`
 *   letter    – (optional) freeform back text, rendered verbatim with line breaks.
 *               Use this instead of at30 / wish / signoff.
 *   at30      – what they were doing / what happened when they were 30
 *   wish      – their birthday message for Aiyana
 *   signoff   – (optional) a P.S. shown under the signature
 *   closing   – (optional) replaces "With love," (e.g. "Cheers," or "XOXO,")
 *   focus     – (optional) crop for a single `photo`, e.g. "30% 50%" or "top"
 *   placeholder – (optional) true marks a demo card with a PLACEHOLDER ribbon.
 *
 * Line breaks: use \n inside the text to start a new line.
 * Or run:  python3 tools/build_cards.py /path/to/submissions
 */

window.SITE = {
  name: "Aiyana",
  year: 2026,
  title: "Happy 30th, Aiyana",
  subtitle: "Postcards from the people who love you",
};

window.CARDS = [
  {
    from: "Olivia and Graeme",
    photo: "photos/olivia-graeme.jpg",
    focus: "36% 55%",
    at30:
      "Graeme and I spent our 30th year travelling, we got engaged. I graduate my undergrad, and expanded our little petting zoo with a second doggo 🐶",
    wish:
      "We wish Aiyana a year full of adventures, love and happiness. 30 was wonderful for us and we hope it is just as great for her as well! We are excited to see where her 30th year around the sun takes her!\n\nHappy birthday Aiyana! 🎊🎂🎉",
    signoff: "(P.S. welcome to the 30 flirty and thriving club)",
  },
  {
    placeholder: true,
    from: "PLACEHOLDER",
    photos: [
      { src: "photos/placeholder/01.jpg", caption: "PLACEHOLDER: first photo" },
      { src: "photos/placeholder/02.jpg", caption: "PLACEHOLDER: second photo" },
      { src: "photos/placeholder/03.jpg", caption: "PLACEHOLDER: third photo" },
    ],
    letter:
      "PLACEHOLDER:\nThis is sample letter text for the back of the card.\n\nIt is not a real message.",
  },
];
