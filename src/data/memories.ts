export type Memory = {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption: string;
  date: string;
  rotation: number;
};

// Add files to public/images/memories, then replace src and the text below.
// Leave src empty to show the elegant empty-frame placeholder.
export const memories: Memory[] = [
  {
    id: 1,
    src: "/images/memories/02.jpg",
    alt: "Your first favorite memory together",
    title: "A moment worth keeping",
    caption: "you when you were little.",
    date: "MEMORY 01",
    rotation: -2.4,
  },
  {
    id: 2,
    src: "/images/memories/03.jpg",
    alt: "A meaningful memory together",
    title: "Beautiful Girl",
    caption: "You are the most beautiful person I have ever met.",
    date: "MEMORY 02",
    rotation: 1.8,
  },
  {
    id: 3,
    src: "/images/memories/01.jpg",
    alt: "A joyful memory together",
    title: "U and I",
    caption: "About U",
    date: "MEMORY 03",
    rotation: -1.2,
  },
  {
    id: 4,
    src: "/images/memories/04.jpg",
    alt: "A quiet memory together",
    title: "Ordinary, but somehow magic",
    caption: "Even the smallest memory deserves a beautiful frame.",
    date: "MEMORY 04",
    rotation: 2.6,
  },
  {
    id: 5,
    src: "/images/memories/05.jpg",
    alt: "Another treasured memory together",
    title: "Still my favorite place",
    caption: "Add one more chapter to your little collection.",
    date: "MEMORY 05",
    rotation: -1.7,
  },
];
