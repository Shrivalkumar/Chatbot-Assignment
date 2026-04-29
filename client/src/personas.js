export const PERSONAS = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    chips: [
      "How do I stay consistent in DSA when I get busy?",
      "My solution passes, but I fail complexity—how should I think?",
      "Arrays feel tricky—I mess up indexes and boundaries. What now?",
    ],
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    chips: [
      "How do I crack my first product-based job interview?",
      "How should I approach system design questions?",
      "I struggle with recursion and permutations—how do I improve quickly?",
    ],
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    chips: [
      "I read solutions but can’t write code in exams—what’s the fix?",
      "How do I choose between brute force, hashing, and two pointers?",
      "DP confuses me—how do I start without getting lost?",
    ],
  },
];

export function getPersonaById(id) {
  return PERSONAS.find((p) => p.id === id);
}

