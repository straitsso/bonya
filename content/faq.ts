import type { Faq } from "./products";

/** General FAQ (/faq). Model-specific questions live on each product in products.ts. */
export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "Choosing a sauna",
    items: [
      {
        question: "Which size is right for me?",
        answer:
          "Lune seats two or three comfortably and suits most gardens. A larger model for four to six is in development. If you are unsure, book a call and we will talk it through.",
      },
      {
        question: "Electric or wood-fired?",
        answer:
          "Electric heaters are quick, easy and can be started from your phone. Wood-fired heaters give a softer heat and a little more ceremony, but need a flue and more attention. Both are available for every model.",
      },
      {
        question: "Can I see one before ordering?",
        answer:
          "Yes. You are welcome to visit our workshop in East London, where Lune is set up and ready to try. Book a time from the home page.",
      },
    ],
  },
  {
    title: "Ordering",
    items: [
      {
        question: "How does ordering work?",
        answer:
          "We start with a conversation and a site check, then send a written quotation. A deposit secures your build slot, with the balance due before installation.",
      },
      {
        question: "Can I customise my sauna?",
        answer:
          "Within reason, yes. Finishes, heater, lighting and bench layout can all be adjusted. Larger changes are quoted individually.",
      },
    ],
  },
  {
    title: "Ownership",
    items: [
      {
        question: "How much does it cost to run?",
        answer:
          "An electric heater uses roughly 6 to 9 kWh for a typical one-hour session, including warm-up. At current UK prices that is a few pounds per session.",
      },
      {
        question: "What maintenance is needed?",
        answer:
          "Very little. Let the sauna dry out after each use, wipe the benches occasionally and keep vents clear. An annual exterior oil is optional.",
      },
    ],
  },
];
