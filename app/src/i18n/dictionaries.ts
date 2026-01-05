export type Locale = 'fr' | 'en';

export interface Dictionary {
  commons: {
    year: string;
    years: string;
    ecosystem: string;
  };
  hero: {
    job: string;
    location: string;
    description: string;
    resumeDownload: string;
    profilePicAlt: string;
  };
  skills: {
    title: string;
    experience: string;
    languages: string;
    others: string;
    react: string;
    laravel: string;
    nodejs: string;
    db: string;
    devops: string;
    symfony: string;
    vue: string;
    php: string;
    js: string;
    ts: string;
    aws: string;
    [key: string]: string;
  };
  projects: {
    title: string;
    browseCode: string;
    browseProject: string;
    lesmots: string;
    aest: string;
    toutcourt: string;
    [key: string]: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    commons: {
      year: "an",
      years: "ans",
      ecosystem: "Écosystème"
    },
    hero: {
      job: "Développeur web Full-Stack",
      location: "Lyon",
      description: "Développeur spécialisé en création d'applications web, je vous présente sur ce portfolio mes compétences et projets personnels.",
      resumeDownload: "Télécharger mon CV",
      profilePicAlt: "Photo de profil"
    },
    skills: {
      title: "Technologies",
      experience: "Expérience",
      languages: "Langages",
      others: "Autres",
      react: "React",
      laravel: "Laravel",
      nodejs: "Node.js",
      db: "Bases de données",
      devops: "DevOps",
      symfony: "Symfony",
      vue: "Vue",
      php: "PHP",
      js: "JavaScript",
      ts: "TypeScript",
      aws: "AWS"
    },
    projects: {
      title: "Projets",
      browseCode: "Voir le code",
      browseProject: "Voir le projet",
      lesmots: "\"Les Mots\" est un jeu dont le but est de trouver tous les mots possibles avec 9 lettres tirées aléatoirement. Ce projet a été conçu avec Laravel et React.",
      aest: "\"Aest\" est un jeu tentant de reproduire un outil d'entraînement pour l'observation des maladies fongiques des cultures végétales. Ce projet a été conçu avec Symfony.",
      toutcourt: "\"Tout court\" reproduit un système simplifié de réservation de courts de tennis. Ce projet a été réalisé en 3 jours pour la fin de ma formation développeur web. Ce projet a été conçu avec Symfony."
    }
  },
  en: {
    commons: {
      year: "year",
      years: "years",
      ecosystem: "Ecosysteme"
    },
    hero: {
      job: "Full-Stack Web Developer",
      location: "Lyon, FR",
      description: "I'm a developer specialized in creating web applications, you will find in this portfolio my skills and personal projects.",
      resumeDownload: "Download my resume",
      profilePicAlt: "Profile picture"
    },
    skills: {
      title: "Technologies",
      experience: "Experience",
      languages: "Languages",
      others: "Others",
      react: "React",
      laravel: "Laravel",
      nodejs: "Node.js",
      db: "Databases",
      devops: "DevOps",
      symfony: "Symfony",
      vue: "Vue",
      php: "PHP",
      js: "JavaScript",
      ts: "TypeScript",
      aws: "AWS"
    },
    projects: {
      title: "Projects",
      browseCode: "Browse code",
      browseProject: "Go to project",
      lesmots: "\"Les Mots\" is a game where the goal is to find all the french words with 9 given random letters. This project was built with Laravel and React.",
      aest: "\"Aest\" is a game attempting to reproduce a training tool for visual assessment of crop diseases. This project was built with Symfony.",
      toutcourt: "\"Tout court\" repoduces a simple tennis courts booking system. This project was built in 3 days for the end of my web developer training. This project was built with Symfony."
    }
  }
};

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
