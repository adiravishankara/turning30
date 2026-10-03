/*
 * ✉️  POSTCARDS DATA — this is the only file you need to edit.
 *
 * To add a card: drop the photo into /photos, then copy one of the { ... }
 * blocks below and change the fields. Cards appear in the order listed.
 *
 *   from      – who it's from (shown as "With love, <from>")
 *   photo     – path to the photo, e.g. "photos/jane.jpg"
 *   at30      – what they were doing / what happened when they were 30
 *   wish      – their birthday message for Aiyana
 *   signoff   – (optional) a P.S. shown under the signature
 *   closing   – (optional) replaces "With love," (e.g. "Cheers," or "XOXO,")
 *   focus     – (optional) which part of the photo to keep when it's cropped,
 *               CSS object-position style: "center", "30% 50%", "top", ...
 *   placeholder – (optional) true marks a demo card with a PLACEHOLDER ribbon.
 *               Delete those cards once real ones are in.
 *
 * Line breaks: use \n inside the text to start a new line.
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
    from: "Friend Name",
    photo: "photos/placeholder-1.jpg",
    at30: "PLACEHOLDER: what this friend was up to at 30 goes here.",
    wish: "PLACEHOLDER: their birthday wish for Aiyana goes here.",
    signoff: "PLACEHOLDER: optional P.S.",
  },
  {
    placeholder: true,
    from: "Another Friend",
    photo: "photos/placeholder-2.jpg",
    at30: "PLACEHOLDER: what this friend was up to at 30 goes here.",
    wish: "PLACEHOLDER: their birthday wish for Aiyana goes here.",
  },
];
