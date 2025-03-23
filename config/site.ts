export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Žabka Franchise Analysis",
  description: "Komplexní analýza franšízové smlouvy a obchodního modelu Žabka",
  mainNav: [
    {
      title: "Obchodní model",
      href: "/#business-plan",
    },
    {
      title: "Analýza konkurence",
      href: "/#competition-analysis",
    },
    {
      title: "Kontrolní seznam",
      href: "/#inspection-checklist",
    },
    {
      title: "Provozní standardy",
      href: "/#operational-standards",
    },
    {
      title: "Analýza smlouvy",
      href: "/#franchise-agreement-analysis",
    },
  ],
  links: {
    developer: "https://interactive-it-cv.vercel.app/",
    github: "https://github.com/ishchuktaras/bussiness-plan",
  },
}
