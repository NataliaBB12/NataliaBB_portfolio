import { Photo, LearningItem, Book } from "@/lib/types";

export const photos: Photo[] = [
  {
    src: "/images/about/photo-1.jpg",
    alt: "Mi ni\u00f1o Lobito",
    caption: "Mi ni\u00f1o Lobito",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-2.jpg",
    alt: "Trepando cerros",
    caption: "Trepando cerros",
    orientation: "landscape",
  },
  {
    src: "/images/about/photo-3.jpg",
    alt: "Acampando en la baja",
    caption: "Acampando en la baja",
    orientation: "landscape",
  },
  {
    src: "/images/about/photo-4.jpg",
    alt: "Visitando a Don Goyo",
    caption: "Visitando a Don Goyo",
    orientation: "landscape",
  },
  {
    src: "/images/about/photo-5.jpg",
    alt: "Inmersi\u00f3n en hielo en Tepoz",
    caption: "Inmersi\u00f3n en hielo en Tepoz",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-6.jpg",
    alt: "Haciendo brazos",
    caption: "Haciendo brazos",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-7.jpg",
    alt: "En el nevado",
    caption: "En el nevado",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-8.jpg",
    alt: "Air yoga mi pasi\u00f3n",
    caption: "Air yoga mi pasi\u00f3n",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-9.jpg",
    alt: "Compartiendo yoga",
    caption: "Compartiendo yoga",
    orientation: "landscape",
  },
  {
    src: "/images/about/photo-10.jpg",
    alt: "Visita de Guate",
    caption: "Visita de Guate \ud83c\uddec\ud83c\uddf9",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-11.jpg",
    alt: "Acrobateando",
    caption: "Acrobateando",
    orientation: "portrait",
  },
  {
    src: "/images/about/photo-12.png",
    alt: "Mi religi\u00f3n",
    caption: "Mi religi\u00f3n",
    orientation: "portrait",
  },
];

export const whoIsNat = {
  designer: `I'm a product designer who thrives at the intersection of logic and creativity. With a science degree background, I bring a structured, hypothesis-driven approach to every design challenge. I believe in designing with data, testing with real people, and iterating until it feels right — not just looks right.`,
  human: `Outside of pixels and prototypes, you'll find me reading about behavioral psychology, exploring new cities, or diving into a podcast about how things work. I'm endlessly curious and believe that the best designers are the ones who never stop learning about the world around them.`,
  collaborator: `I've worked with engineers, PMs, data scientists, and stakeholders across time zones and cultures. I believe the best work happens when everyone feels heard, when feedback flows freely, and when we're all aligned on the "why" before jumping into the "how."`,
};

export const learningItems: LearningItem[] = [
  {
    topic: "Next.js App Router",
    context: "Building this portfolio",
    status: "in-progress",
  },
  {
    topic: "Framer Motion",
    context: "Micro-interactions and page transitions",
    status: "in-progress",
  },
  {
    topic: "Design Systems at Scale",
    context: "Token-based architecture",
    status: "just-started",
  },
];

export const books: Book[] = [
  {
    title: "Hands of Light",
    author: "Barbara Brennan, 1988",
    cover: "/images/books/hands-of-light.jpg",
    status: "reading",
    link: "https://www.amazon.com/dp/0553345397",
  },
  {
    title: "The Jobs To Be Done Playbook",
    author: "Jim Kalbach, 2020",
    cover: "",
    status: "reading",
    link: "https://www.amazon.com/dp/1933820683",
  },
  {
    title: "Money Master the Game",
    author: "Tony Robbins, 2014",
    cover: "",
    status: "reading",
    link: "https://www.amazon.com/dp/1476757860",
  },
  {
    title: "Atlas of the Heart",
    author: "Bren\u00e9 Brown, 2021",
    cover: "",
    status: "finished",
    link: "https://www.amazon.com/dp/0399592555",
  },
  {
    title: "The Tree of Yoga",
    author: "B.K.S. Iyengar",
    cover: "",
    status: "finished",
    link: "https://www.amazon.com/dp/0877072671",
  },
  {
    title: "Parallel Universes of Self",
    author: "Frederick Dodson",
    cover: "",
    status: "up-next",
    link: "https://www.amazon.com/dp/1456568884",
  },
  {
    title: "La monta\u00f1a eres t\u00fa",
    author: "Brianna Wiest",
    cover: "",
    status: "up-next",
    link: "https://www.amazon.com/dp/8418531258",
  },
];

export const playlist = {
  href: "",
  label: "Design Flow — My Work Playlist",
  platform: "spotify" as const,
};
