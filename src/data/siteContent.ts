import { applicationUrl } from "../config/site";

export const brand = {
  name: "886 Studios",
  logoAlt: "886 Studios",
  logoUrl: "/assets/886-logo.avif",
  logoWidth: 384,
  logoHeight: 384,
};

export const socialLinks = [
  {
    platform: "x",
    href: "https://x.com/886Studios",
    ariaLabel: "886 Studios on X",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/886studios/",
    ariaLabel: "886 Studios on LinkedIn",
  },
  {
    platform: "instagram",
    href: "https://www.instagram.com/ikigai_launchpad/",
    ariaLabel: "886 Studios on Instagram",
  },
  {
    platform: "threads",
    href: "https://www.threads.net/@ikigai_launchpad",
    ariaLabel: "ikigai Launchpad on Threads",
  },
  {
    platform: "discord",
    href: "https://discord.gg/FGcEHJyB3F",
    ariaLabel: "886 Studios on Discord",
  },
  {
    platform: "substack",
    href: "https://886studios.substack.com/",
    ariaLabel: "ikigai Insights on Substack",
  },
] as const;

export interface PortfolioCompany {
  name: string;
  slug: string;
  relationship: "Partner-backed" | "886-backed";
  category: string;
  program?: string;
  status?: "Active" | "Inactive" | "Acquired";
  websiteUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  founders?: readonly {
    name: string;
    linkedinUrl: string;
    xUrl?: string;
  }[];
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    imageClass?: "is-wordmark" | "is-tall" | "is-compact" | "is-app-icon";
  };
  description: string;
  descriptionLinks?: readonly {
    text: string;
    href: string;
  }[];
}

export const portfolioCompanies = [
  {
    name: "diffusr.",
    slug: "diffusr",
    relationship: "886-backed",
    category: "AI",
    program: "ikigai S'26",
    status: "Active",
    websiteUrl: "https://www.diffusr.ai",
    founders: [
      {
        name: "Sharan Mansukhani",
        linkedinUrl: "https://www.linkedin.com/in/sharan-mansukhani-17306a234/",
      },
      {
        name: "Kristian Resabal",
        linkedinUrl: "https://www.linkedin.com/in/jkresabal",
        xUrl: "https://x.com/jkresabal",
      },
      {
        name: "Justin To",
        linkedinUrl: "https://sg.linkedin.com/in/justin-to-4a5401202",
      },
    ],
    logo: {
      src: "/assets/portfolio/diffusr.svg",
      alt: "diffusr. logo",
      width: 512,
      height: 512,
    },
    description:
      "diffusr. helps brands launch AI-generated UGC campaigns at social-platform scale. The company operates as a managed service that develops creative concepts, produces avatar-led video variants, and distributes campaigns so brands can test and amplify messages faster than a traditional creator workflow.",
  },
  {
    name: "Peeps",
    slug: "peeps",
    relationship: "886-backed",
    category: "Consumer",
    program: "ikigai S'26",
    status: "Active",
    websiteUrl: "https://playpeeps.app",
    appStoreUrl: "https://apps.apple.com/tw/app/peeps-%E8%88%87%E6%9C%8B%E5%8F%8B%E5%90%8C%E5%B1%85/id6753601581",
    playStoreUrl: "https://play.google.com/store/apps/details?id=dev.ymin.peeps",
    founders: [
      {
        name: "Marx Yeh",
        linkedinUrl: "https://www.linkedin.com/in/you-ming-yeh-00b50b272/",
      },
      {
        name: "Ronny Yen",
        linkedinUrl: "https://www.linkedin.com/in/yyz71/",
      },
    ],
    logo: {
      src: "/assets/portfolio/peeps.jpg",
      alt: "Peeps logo",
      width: 512,
      height: 512,
    },
    description:
      "Peeps is a gamified social app that gives close friends and couples a place to live together online. It's a private space to decorate, hang out, share daily moments, play mini-games, and raise pets together. Rather than another feed or chat box, Peeps is built around presence: lightweight, playful ways to stay close without the pressure of posting or texting.\n\nFounded by a two-person Gen Z team, Peeps has grown to nearly 177K users in just a few weeks through organic word of mouth, and the team is building toward making it the default place where close relationships stay connected online.",
  },
  {
    name: "lfg",
    slug: "lfg",
    relationship: "886-backed",
    category: "Consumer",
    program: "ikigai S'26",
    status: "Active",
    websiteUrl: "https://lfg.place/",
    appStoreUrl: "https://apps.apple.com/us/app/lfg-on-demand-hangouts/id6762966872",
    logo: {
      src: "/assets/portfolio/lfg.jpg",
      alt: "lfg logo",
      width: 512,
      height: 512,
    },
    description:
      "lfg is a social planning app for on-demand hangouts with friends in real life. It turns places discovered on Instagram, TikTok, Google Maps, and elsewhere into a shared map, then lets users pick a spot, invite the right people, and coordinate plans without getting stuck in group-chat back-and-forth.",
  },
  {
    name: "Persona2 AI",
    slug: "persona2-ai",
    relationship: "886-backed",
    category: "Gaming",
    program: "ikigai S'26",
    status: "Active",
    websiteUrl: "https://persona2.ai/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=ai.persona2.app",
    logo: {
      src: "/assets/portfolio/persona2-ai.png",
      alt: "Persona2 AI logo",
      width: 512,
      height: 512,
      imageClass: "is-app-icon",
    },
    description:
      "Persona2 AI is a platform for RPGs, where anyone can vibe-code, play, and share role-playing games. It brings AI-powered text simulators, role-playing, and interactive narrative creation into a creator-driven game lobby where players can start instantly and build their own unique stories.\n\nPersona2 AI hit 120K users in 3 days, with power users spending 7 hours a day on the platform.",
  },
  {
    name: "Hushli",
    slug: "hushli",
    relationship: "886-backed",
    category: "Health",
    program: "ikigai S'25",
    status: "Active",
    websiteUrl: "https://hushli.ai/",
    appStoreUrl: "https://apps.apple.com/tw/app/hushli-ai-confidant-journal/id6748250163?l=en-GB",
    founders: [
      {
        name: "Tim Chen",
        linkedinUrl: "https://www.linkedin.com/in/timychen12/",
      },
      {
        name: "Sharon Wu",
        linkedinUrl: "https://www.linkedin.com/in/sharonwu333/",
      },
    ],
    logo: {
      src: "/assets/portfolio/hushli.jpg",
      alt: "Hushli logo",
      width: 512,
      height: 512,
    },
    description:
      "Hushli is an app that helps you navigate breakups, relationship challenges, and difficult emotions.\n\nSimply talk with Hushli like you would with a trusted confidant. It understands your emotions, remembers the meaningful moments you share, and automatically creates a journal of your journey, helping you reflect, heal, and better understand yourself over time.\n\nBuilt by Tim Chen and Sharon Wu, whose personal experiences with Tourette syndrome and high sensitivity (HSP) inspired Hushli, their mission is to make mental wellness more accessible and affordable for everyone.",
  },
  {
    name: "InstaPodz",
    slug: "instapodz",
    relationship: "886-backed",
    category: "AI",
    program: "ikigai S'25",
    status: "Active",
    websiteUrl: "https://instapodz.com/",
    appStoreUrl: "https://apps.apple.com/us/app/instapodz-ai-podcast-creator/id6744011584",
    logo: {
      src: "/assets/portfolio/instapodz.jpg",
      alt: "InstaPodz logo",
      width: 512,
      height: 512,
    },
    description:
      "InstaPodz creates personalized AI radio and podcast episodes from topics, questions, links, or daily learning goals. Users can choose show length, host style, language, and even character-style voices, making it a lightweight way to turn news, research, and curiosity into audio that fits a commute or short break.",
  },
  {
    name: "PictureCook",
    slug: "picturecook",
    relationship: "886-backed",
    category: "Education",
    program: "ikigai S'25",
    status: "Active",
    websiteUrl: "https://picture-cook.com/",
    appStoreUrl: "https://apps.apple.com/sg/app/picturecook-kid-english-buddy/id6746742382",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.picturecook.interactiveaudiobook",
    logo: {
      src: "/assets/portfolio/picturecook.jpg",
      alt: "PictureCook logo",
      width: 512,
      height: 512,
    },
    description:
      "PictureCook is an AI-powered English learning companion for children. Its interactive picture books combine narration, tap-to-learn vocabulary, kid-safe stories, and AI character conversations so young learners can practice reading, listening, and speaking through storytime rather than formal lessons.",
  },
  {
    name: "Sugar AI",
    slug: "sugar-ai",
    relationship: "886-backed",
    category: "AI",
    program: "ikigai S'25",
    status: "Active",
    websiteUrl: "https://sugarai.tw/",
    appStoreUrl: "https://apps.apple.com/tw/app/sugar-%E4%BD%A0%E7%9A%84%E6%AD%A3%E7%89%88%E6%BC%AB%E7%95%ABai%E8%A7%92%E8%89%B2/id6744877922",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.sugar.ai.dev",
    logo: {
      src: "/assets/portfolio/sugar-ai.jpg",
      alt: "Sugar AI logo",
      width: 512,
      height: 512,
    },
    description:
      "Sugar AI turns officially licensed comic and manga characters into interactive AI companions for fans. Characters are supervised around creator-approved personalities, remember conversations, unlock story branches and memories through chat, and give IP owners a new direct-to-fan format for character engagement.",
  },
  {
    name: "Tellit Now",
    slug: "tellit-now",
    relationship: "886-backed",
    category: "Marketing",
    program: "ikigai S'25",
    status: "Active",
    websiteUrl: "https://www.tellitapp.ai/",
    appStoreUrl: "https://apps.apple.com/us/app/tell-it-now-%E6%8E%A2%E5%BA%97%E5%A4%A7%E8%81%B2%E5%85%AC/id6448947278",
    playStoreUrl: "https://play.google.com/store/apps/details?id=ai.tellit.tellitapp",
    logo: {
      src: "/assets/portfolio/tellit-now.jpg",
      alt: "Tellit Now logo",
      width: 512,
      height: 512,
    },
    description:
      "Tellit Now is a map-based word-of-mouth marketing platform for local stores, brands, and influential consumers. Businesses can publish nearby check-in and content tasks, while consumers discover offers, visit locations, post to social channels, and earn cash or reciprocal rewards after merchants review the promotion.",
  },
  {
    name: "GitRoll",
    slug: "gitroll",
    relationship: "886-backed",
    category: "HRTech",
    program: "ikigai F'24",
    status: "Acquired",
    websiteUrl: "https://gitroll.io/",
    logo: {
      src: "/assets/portfolio/gitroll-wordmark.png",
      alt: "GitRoll logo",
      width: 296,
      height: 74,
      imageClass: "is-wordmark",
    },
    description:
      "GitRoll helps engineering teams evaluate developers by turning real code history into data-driven coding profiles. Its AI analyzes open-source activity, builds skill evidence from actual repositories, and gives recruiters a way to assess candidates without relying only on resumes, trivia-style interviews, or take-home tests.",
  },
  {
    name: "Kardomo",
    slug: "kardomo",
    relationship: "886-backed",
    category: "Consumer",
    program: "ikigai S'26",
    status: "Active",
    websiteUrl: "https://kardomo.com/",
    appStoreUrl: "https://apps.apple.com/tw/app/kardomo-%E5%8F%B0%E7%81%A3%E5%B0%88%E5%B1%AC%E7%9A%84-kpop-%E4%BA%A4%E5%8F%8B%E5%9C%88/id6748519302",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kardomo.kardomo",
    founders: [
      {
        name: "Marx Yeh",
        linkedinUrl: "https://www.linkedin.com/in/you-ming-yeh-00b50b272/",
      },
      {
        name: "Ronny Yen",
        linkedinUrl: "https://www.linkedin.com/in/yyz71/",
      },
    ],
    logo: {
      src: "/assets/portfolio/kardomo.webp",
      alt: "Kardomo logo",
      width: 879,
      height: 1149,
      imageClass: "is-tall",
    },
    description:
      "Kardomo is a Taiwan-focused K-pop fan platform that brings photocard collections, idol schedules, fan diaries, music rankings, and discussion threads into one community app. Fans can track events, organize collections, share moments, and connect with other fans around the groups and artists they follow.",
  },
  {
    name: "PicPet",
    slug: "o3o-labs",
    relationship: "886-backed",
    category: "Social",
    program: "ikigai F'24",
    status: "Active",
    appStoreUrl: "https://apps.apple.com/us/app/picpet/id6742077014",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.o3o.android.picpet",
    logo: {
      src: "/assets/portfolio/o3o-labs.jpg",
      alt: "PicPet logo",
      width: 512,
      height: 512,
    },
    description:
      "PicPet is a social game for close friends built around raising a shared virtual pet. Friends feed the pet with photos, earn coins, unlock rewards, customize rooms and pets, and use the daily routine as a playful reason to stay connected with the people they care about. PicPet joined a16z Speedrun Cohort 006.",
    descriptionLinks: [
      {
        text: "a16z Speedrun Cohort 006",
        href: "https://speedrun.a16z.com/companies/picpet",
      },
    ],
  },
  {
    name: "Dentscape",
    slug: "dentscape",
    relationship: "886-backed",
    category: "Health",
    program: "Velocity",
    status: "Active",
    websiteUrl: "https://dentscape.ai/",
    logo: {
      src: "/assets/portfolio/dentscape.png",
      alt: "Dentscape logo",
      width: 840,
      height: 840,
    },
    description:
      "Dentscape builds AI dental-design software for labs that need faster CAD workflows. Its platform positions itself as a personalized AI dental designer that can help produce high volumes of crown designs quickly, reducing repetitive manual work while fitting into the bread-and-butter production flow of dental labs.",
  },
  {
    name: "Preciser",
    slug: "preciser",
    relationship: "886-backed",
    category: "Sports",
    program: "Velocity",
    status: "Active",
    websiteUrl: "https://www.preciser.io/",
    logo: {
      src: "/assets/portfolio/preciser.png",
      alt: "Preciser logo",
      width: 256,
      height: 256,
    },
    description:
      "Preciser is an AI and computer-vision analytics platform for sports video, with current support for basketball and baseball. Teams, coaches, leagues, and organizations can upload or stream game footage and receive automated stats, highlights, reports, and video insights without spending hours on manual tagging.",
  },
  {
    name: "Valtec",
    slug: "valtec",
    relationship: "886-backed",
    category: "Drones",
    websiteUrl: "https://www.valtec.ai/",
    logo: {
      src: "/assets/portfolio/valtec.png",
      alt: "Valtec logo",
      width: 257,
      height: 257,
    },
    description:
      "Valtec builds aerial maritime intelligence systems that use AI detection to monitor ocean activity in real time. Its technology is focused on turning data captured from above into practical awareness for maritime operators, helping teams detect, track, and respond to activity across coastal and open-water environments.",
  },
  {
    name: "Miso",
    slug: "miso",
    relationship: "886-backed",
    category: "AI",
    websiteUrl: "https://miso.ai/",
    logo: {
      src: "/assets/portfolio/miso.png",
      alt: "Miso logo",
      width: 512,
      height: 512,
    },
    description:
      "Miso builds AI answer and search technology for publishers and content platforms that need trustworthy discovery. Instead of returning only vague search results, Miso grounds responses in a publisher's own content, adds citations, and helps readers get useful answers while keeping traffic and engagement inside the publisher experience.",
  },
  {
    name: "Discord",
    slug: "discord",
    relationship: "Partner-backed",
    category: "Consumer",
    websiteUrl: "https://discord.com/",
    appStoreUrl: "https://apps.apple.com/us/app/discord-talk-play-hang-out/id985746746",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.discord",
    logo: {
      src: "/assets/portfolio/discord.jpg",
      alt: "Discord logo",
      width: 512,
      height: 512,
    },
    description:
      "Discord is a consumer communication platform built for voice, video, text, and shared online spaces. People use it to play games, hang out with friends, organize private groups, or build larger communities, with customizable servers that combine casual chat, live presence, and community tools.",
  },
  {
    name: "OURA",
    slug: "oura",
    relationship: "Partner-backed",
    category: "Health",
    websiteUrl: "https://ouraring.com/",
    appStoreUrl: "https://apps.apple.com/us/app/oura/id1043837948",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ouraring.oura",
    logo: {
      src: "/assets/portfolio/oura.png",
      alt: "OURA logo",
      width: 400,
      height: 400,
    },
    description:
      "OURA is a health technology company best known for the Oura Ring, a smart ring that tracks sleep, fitness, stress, and broader wellness signals around the clock. Its product turns passive biometric data into daily readiness, recovery, and health insights that help people understand patterns in their bodies over time.",
  },
  {
    name: "Crunchyroll",
    slug: "crunchyroll",
    relationship: "Partner-backed",
    category: "Media",
    websiteUrl: "https://www.crunchyroll.com/",
    appStoreUrl: "https://apps.apple.com/us/app/crunchyroll/id329913454",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.crunchyroll.crunchyroid",
    logo: {
      src: "/assets/portfolio/crunchyroll.jpg",
      alt: "Crunchyroll logo",
      width: 512,
      height: 512,
    },
    description:
      "Crunchyroll is a global anime brand and streaming service serving fans across shows, films, manga, games, theatrical releases, events, and merchandise. The company has become one of the central distribution and community platforms for anime outside Japan, connecting licensed content with audiences across markets and devices.",
  },
  {
    name: "Gogoro",
    slug: "gogoro",
    relationship: "Partner-backed",
    category: "Climate",
    websiteUrl: "https://www.gogoro.com/",
    appStoreUrl: "https://apps.apple.com/us/app/gogoro/id927757129",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.gogoro.smartclient",
    logo: {
      src: "/assets/portfolio/gogoro.jpg",
      alt: "Gogoro logo",
      width: 512,
      height: 512,
    },
    description:
      "Gogoro builds electric urban mobility infrastructure around smart scooters, swappable batteries, fleet tools, and the Gogoro Network. Its platform is designed to make refueling electric two-wheelers fast, help cities and logistics operators manage energy more efficiently, and support cleaner transportation in dense urban markets.",
  },
  {
    name: "P. LEAGUE+",
    slug: "p-league-plus",
    relationship: "Partner-backed",
    category: "Sports",
    websiteUrl: "https://pleagueofficial.com/",
    logo: {
      src: "/assets/portfolio/p-league-plus.png",
      alt: "P. LEAGUE+ logo",
      width: 152,
      height: 152,
      imageClass: "is-compact",
    },
    description:
      "P. LEAGUE+ is a professional men's basketball league in Taiwan focused on higher-quality home-game experiences and stronger fan interaction. The league brings together Taiwanese clubs, publishes schedules, standings, statistics, video, ticketing, and media content, and has played a visible role in growing Taiwan's basketball entertainment market.",
  },
  {
    name: "KKBOX",
    slug: "kkbox",
    relationship: "Partner-backed",
    category: "Media",
    websiteUrl: "https://www.kkbox.com/",
    appStoreUrl: "https://apps.apple.com/tw/app/kkbox-%E9%9F%B3%E6%A8%82-podcast/id300915900",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.skysoft.kkbox.android",
    logo: {
      src: "/assets/portfolio/kkbox.jpg",
      alt: "KKBOX logo",
      width: 512,
      height: 512,
    },
    description:
      "KKBOX is a music streaming and digital entertainment platform with deep roots in Taiwan and other Asian markets. The service is known for licensed music discovery, playlists, podcasts, and live entertainment features, giving Mandarin and Asian music fans a regional alternative to global streaming services.",
  },
] satisfies readonly PortfolioCompany[];

export const siteContent = {
  nav: {
    cta: {
      label: "Apply Now",
      href: applicationUrl,
    },
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "programs", label: "ikigai Launchpad", href: "/programs" },
      { id: "about", label: "About Us", href: "/about" },
      { id: "events", label: "Events", href: "/events" },
      { id: "resources", label: "Resources", href: "/resources" },
      { id: "blog", label: "Blog", href: "/blog" },
      { id: "contact", label: "Contact", href: "/contact" },
    ],
  },
  home: {
    hero: {
      titleLead: "Build what",
      titleAccent: "matters.",
      body: "886 Studios is a Taipei-based venture firm and startup accelerator.\nWe run ikigai Launchpad, a 10-week program for ambitious early-stage founders,\nwith $100K USD in funding, hands-on mentorship, and investor introductions.",
      cta: {
        label: "Learn more about ikigai Launchpad",
        href: "/programs",
      },
    },
    photos: {
      items: [
        {
          src: "/assets/landing/launchpad-01-960.webp",
          alt: "886 Studios founders gathered during a community event",
          width: 1800,
          height: 1013,
        },
        {
          src: "/assets/landing/launchpad-02-960.webp",
          alt: "Founders and mentors in conversation at 886 Studios",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-03-960.webp",
          alt: "886 Studios community members at a founder session",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-04-960.webp",
          alt: "A workshop moment with the 886 Studios founder community",
          width: 1800,
          height: 1332,
        },
        {
          src: "/assets/landing/launchpad-05-960.webp",
          alt: "Founders watching a presentation during an 886 Studios community session",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-06-960.webp",
          alt: "886 Studios founders meeting during an in-person program session",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-07-960.webp",
          alt: "886 Studios founders gathered around a table during a program session",
          width: 1800,
          height: 1350,
        },
      ],
    },
    programs: {
      eyebrow: "Programs",
      title: "How we support founders",
      featured: {
        label: "Accelerator",
        title: "ikigai Launchpad",
        body: "$100K USD in funding, hands-on mentorship from successful Silicon Valley founders, and a tight-knit 10-week accelerator program designed for startups that want to move fast.",
        meta: ["$100K USD funding", "Partner office hours", "Batch community"],
        ctaLabel: "Learn more →",
        ctaHref: "/programs",
      },
      secondary: [
        {
          label: "Community",
          title: "Launch Station",
          body: "Free coworking space and a founder community inside Taiwan Tech Arena.",
          ctaLabel: "Learn more →",
          ctaHref: "/programs/launch-station",
        },
      ],
    },
    founders: {
      title: "Iconic companies that we've built",
      logos: [
        {
          name: "Twitch",
          src: "/assets/logos/twitch.svg",
          alt: "Twitch logo",
          width: 1140,
          height: 380,
          exit: "Exit · $970M",
          title: "Twitch exit: approximately $970 million",
          imageClass: "is-tall",
        },
        {
          name: "Kabam",
          src: "/assets/logos/kabam.webp",
          alt: "Kabam logo",
          width: 316,
          height: 316,
          exit: "Exit · $800M",
          title: "Kabam exit: approximately $800 million",
          imageClass: "is-tall",
        },
        {
          name: "Guitar Hero",
          src: "/assets/logos/guitar-hero.webp",
          alt: "Guitar Hero logo",
          width: 489,
          height: 352,
          exit: "Exit · $99.9M",
          title: "Guitar Hero exit: approximately $99.9 million",
          imageClass: "is-tall",
        },
        {
          name: "Playdom",
          src: "/assets/logos/playdom-alt.webp",
          alt: "Playdom logo",
          width: 1000,
          height: 244,
          exit: "Exit · $563.2M",
          title: "Playdom exit: approximately $563.2 million",
          imageClass: "is-tall",
        },
        {
          name: "Metatheory",
          src: "/assets/logos/metatheory.webp",
          alt: "Metatheory logo",
          width: 400,
          height: 400,
          imageClass: "is-tall",
        },
        {
          name: "Mochi Media",
          src: "/assets/logos/mochimedia.webp",
          alt: "Mochi Media logo",
          width: 820,
          height: 750,
          exit: "Exit · $80M",
          title: "Mochi Media exit: approximately $80 million",
          imageClass: "is-tall",
        },
        {
          name: "Orbit Baby",
          src: "/assets/logos/orbitbaby.webp",
          alt: "Orbit Baby logo",
          width: 456,
          height: 80,
          exit: "Exit · $17.5M",
          title: "Orbit Baby exit: approximately $17.5 million",
          imageClass: "is-tall",
        },
        {
          name: "Blue Goji",
          src: "/assets/logos/bluegoji.webp",
          alt: "Blue Goji logo",
          width: 256,
          height: 256,
          imageClass: "is-tall",
        },
        {
          name: "Gen.G",
          src: "/assets/logos/geng.webp",
          alt: "Gen.G logo",
          width: 820,
          height: 956,
          imageClass: "is-tall",
        },
        {
          name: "Hot or Not",
          src: "/assets/logos/hotornot.webp",
          alt: "Hot or Not logo",
          width: 1920,
          height: 1272,
          exit: "Exit · $20M",
          title: "Hot or Not exit: approximately $20 million",
          imageClass: "is-tall",
        },
        {
          name: "Rally",
          src: "/assets/logos/rally-official.webp",
          alt: "Rally logo",
          width: 300,
          height: 300,
          imageClass: "is-tall",
        },
        {
          name: "Tiburon Entertainment",
          src: "/assets/logos/tiburon.webp",
          alt: "Tiburon Entertainment logo",
          width: 184,
          height: 184,
          imageClass: "is-tall",
        },
        {
          name: "Catalyte",
          src: "/assets/logos/catalyte-official.webp",
          alt: "Catalyte logo",
          width: 1920,
          height: 1920,
          imageClass: "is-tall",
        },
        {
          name: "Cold Electric",
          src: "/assets/logos/cold-electric.svg",
          alt: "Cold Electric logo",
          width: 298,
          height: 34,
          imageClass: "is-cold-electric",
        },
        {
          name: "New Taipei Kings",
          src: "/assets/logos/new-taipei-kings.webp",
          alt: "New Taipei Kings logo",
          width: 1500,
          height: 771,
          imageClass: "is-tall",
        },
      ],
      portfolio: portfolioCompanies,
    },
    newsletter: {
      title: "Subscribe to our newsletter,",
      publicationName: "ikigai Insights",
      publicationUrl: "https://886studios.substack.com/",
      body: "Only cool things, we promise.",
      placeholder: "you@company.com",
      button: "Subscribe",
      action: "https://886studios.substack.com/api/v1/free",
    },
  },
  programs: {
    launchpad: {
      name: "ikigai Launchpad",
      lead:
        "A 10-week, in-person accelerator in Taipei with $100K USD, mentor office hours, investor intros, and support beyond the batch.",
      status: {
        announcement: "Applications for the Fall 2026 batch are now open.",
        batch: "Fall 2026",
        summary: "Next batch starts Fall 2026.",
        applicationOpenDate: "2026-07-10",
        firstAcceptancesDate: "2026-07-31",
      },
      cta: {
        label: "Apply to ikigai Launchpad",
        href: applicationUrl,
      },
      heroPhoto: {
        src: "/assets/programs/ikigai-audience-theater-1280.webp",
        srcset:
          "/assets/programs/ikigai-audience-theater-1280.webp 1280w, /assets/programs/ikigai-audience-theater-1920.webp 1920w",
        sizes: "(max-width: 640px) calc(100vw - 36px), min(calc(100vw - 48px), 1160px)",
        alt: "Founders, mentors, and guests gathered for ikigai Launchpad in Taipei",
        width: 1920,
        height: 1280,
      },
      facts: [
        {
          label: "Investment",
          value: "$100K USD",
          note: "",
        },
        {
          label: "Length",
          value: "10 weeks",
          note: "",
        },
        {
          label: "Location",
          value: "Taipei",
          note: "",
        },
        {
          label: "Support",
          value: "1-on-1 Weekly Office Hours",
          note: "Plus: Workshops, guest speakers, team building, customer and investor intros, and more.",
        },
      ],
      benefits: [
        {
          title: "Funding",
          headline: "$100,000 USD",
          proofPoints: [
            "$100,000 USD funding through a SAFE note",
            "Quit your job and focus full-time on building",
            "Potential follow-on investment from Lifelike Capital",
          ],
          photo: {
            name: "ikigai-founder-table",
            alt: "Founders working together during ikigai Launchpad",
            width: 1280,
            height: 960,
          },
        },
        {
          title: "Hands-on support",
          headline: "1-on-1 Weekly Mentor Office Hours",
          proofPoints: [
            "Founder-Led Workshops",
            "Guest Speakers",
            "Warm Introductions + Investor Matching",
            "Exclusive Corporate Perks",
          ],
          photo: {
            name: "ikigai-mentor-session",
            alt: "An ikigai Launchpad mentor session with founders",
            width: 1280,
            height: 960,
          },
        },
        {
          title: "Community",
          headline: "Work alongside other founders",
          proofPoints: [
            "Free Office Space in Taipei",
            "Team Building",
            "Networking & Founder Events",
            "Support beyond the 10-week timeframe",
          ],
          photo: {
            name: "ikigai-group-tshirts",
            alt: "ikigai Launchpad founders together in Taipei",
            width: 1280,
            height: 1707,
          },
        },
      ],
      testimonials: [
        {
          quote:
            "ikigai gave me unwavering support and helped me develop a much more global perspective. I'm really grateful for the team (Kevin, Kai, Carter, Freya, and Ginny) and everything they’ve done for me, from helping me think through product to introducing me to helpful connections to being there for moral support through hard times.",
          name: "Jimmy Huang",
          company: "PicPet",
          profileUrl: "/portfolio/o3o-labs",
          profileLabel: "PicPet",
          photo: {
            src: "/assets/programs/testimonials/jimmy-huang.webp",
            alt: "Jimmy Huang smiling in front of the Golden Gate Bridge",
            width: 620,
            height: 880,
            position: "50% 50%",
          },
          logo: {
            src: "/assets/portfolio/o3o-labs.jpg",
            alt: "PicPet logo",
            width: 512,
            height: 512,
          },
        },
        {
          quote:
            "Personally, ikigai showed me different ways to approach uncertainty. With Kevin Lin, it was always about possibility: “Hmm, that could work,” and a why-not-try attitude. With Max Hsieh, it was systematic, actionable, and logical: experiment X, measure Y, define success or failure, learn, and iterate. With Kai Huang, it was about weighing options and trusting your best judgment; even the wrong decision beats no decision because indecision teaches you nothing.",
          name: "Julia Cheung",
          company: "Doppler",
          profileUrl: "/portfolio/lfg",
          profileLabel: "lfg",
          photo: {
            src: "/assets/programs/testimonials/julia-cheung-speaking.webp",
            alt: "Julia Cheung speaking at a founder community event",
            width: 420,
            height: 900,
            position: "50% 45%",
          },
          logo: {
            src: "/assets/portfolio/lfg.jpg",
            alt: "lfg logo",
            width: 512,
            height: 512,
          },
        },
        {
          quote:
            "Joining the program was one of the best decisions in my entrepreneurial journey. I was impressed by how amazingly the mentors connected startups in Taiwan with resources from Silicon Valley.",
          name: "Sylvie Liu",
          company: "Dentscape",
          profileUrl: "/portfolio/dentscape",
          profileLabel: "Dentscape",
          photo: {
            src: "/assets/programs/testimonials/sylvie-liu.webp",
            alt: "Sylvie Liu speaking at a professional dental event",
            width: 800,
            height: 533,
            position: "50% 48%",
          },
          logo: {
            src: "/assets/portfolio/dentscape.png",
            alt: "Dentscape logo",
            width: 840,
            height: 840,
          },
        },
        {
          quote:
            "886 has been an invaluable partner on our startup journey. With Kai and Joe's Silicon Valley expertise and connections, along with Freya's enthusiasm in organizing collaborative programs, they've been instrumental in fostering your startup’s success and camaraderie among fellow founders. They have genuine interest in helping you grow as a founder. There are no other investors like them.",
          name: "Ser En Low",
          company: "Mecenia / Sendjoy",
          profileUrl: "/portfolio",
          profileLabel: "Sendjoy",
          photo: {
            src: "/assets/programs/testimonials/ser-en-low.webp",
            alt: "Ser En Low smiling with participants at an AI video event in New York",
            width: 400,
            height: 700,
            position: "50% 50%",
          },
          logo: {
            src: "/assets/programs/testimonials/sendjoy-logo.webp",
            alt: "Sendjoy logo",
            width: 1920,
            height: 1920,
          },
        },
        {
          quote:
            "Preciser wouldn't exist without 886 Studios. 886 gave me the structure and direction I needed to take Preciser from MVP to Launch but also pushed, challenged, and guided me through the steps, insecurities, and excitement of building an impact-led business.",
          name: "Shirley Chen",
          company: "Preciser",
          profileUrl: "/portfolio/preciser",
          profileLabel: "Preciser",
          photo: {
            src: "/assets/programs/testimonials/shirley-chen.webp",
            alt: "Shirley Chen seated in a Preciser shirt",
            width: 400,
            height: 420,
            position: "50% 46%",
          },
          logo: {
            src: "/assets/portfolio/preciser.png",
            alt: "Preciser logo",
            width: 256,
            height: 256,
          },
        },
      ],
      fit: {
        eyebrow: "What we look for",
        title: "Founders building for a global market.",
        criteria: [
          {
            label: "Industry",
            body: "Industry-agnostic, as long as the market is large and global enough to support a category-defining company.",
          },
          {
            label: "Stage",
            body: "Early. From friends-and-family through pre-seed and seed, including teams still moving from idea to MVP.",
          },
          {
            label: "Commitment",
            body: "Founders should be working full-time, or ready to work full-time, and able to join the batch in Taipei.",
          },
          {
            label: "Team",
            body: "A co-founder is not required, but the company needs credible technical or domain capability on the founding team.",
          },
          {
            label: "Mindset",
            body: "Hungry, coachable, adaptable, and ready to act on candid feedback",
          },
        ],
      },
      application: {
        eyebrow: "Applications",
        title: "Join the Fall 2026 batch!",
        intro: "",
        milestones: [
          {
            date: "July 10, 2026",
            label: "Applications open",
          },
          {
            date: "July 31, 2026",
            label: "First acceptances end",
          },
          {
            date: "Fall 2026",
            label: "Next batch",
          },
        ],
        steps: [
          {
            title: "Submit Application",
          },
          {
            title: "Application Review",
          },
          {
            title: "1st Interview",
          },
          {
            title: "2nd Interview",
          },
        ],
      },
      faqs: [
        {
          question: "When is the next batch?",
          answer:
            "The next batch begins in Fall 2026. Applications opened July 10, 2026. The first acceptances end on July 31, 2026.",
        },
        {
          question: "What are the investment terms?",
          answer:
            "The standard deal is a $100,000 USD investment for 8% through a SAFE. There may also be potential for follow-on investment from Lifelike Capital.",
        },
        {
          question: "Where does the program take place? Is it in person?",
          answer:
            "The program takes place in person in Taipei. All co-founders are expected to join on site for the core program, and office space is provided for the full 10 weeks.",
        },
        {
          question: "What stage and industries do you invest in?",
          answer:
            "We are industry-agnostic and work with early-stage companies from friends-and-family through pre-seed and seed. The market needs to be large and global enough to support a category-defining company.",
        },
        {
          question: "Do you only accept Taiwanese founders?",
          answer: "Nope, we are open to founders anywhere.",
        },
        {
          question: "Do I need a Taiwan entity to apply? Or any entity?",
          answer:
            "No, you don't need any entity to apply. If you're accepted into the program, you'll typically need to set up a US entity to receive funding.",
        },
        {
          question: "Is there a program fee on top of the equity?",
          answer: "No. The SAFE is the only ask.",
        },
        {
          question: "What is the duration of the program?",
          answer:
            "The program runs for 10 weeks and includes in-person working sessions, office hours, workshops, community programming, and fundraising help, and investor matching.",
        },
        {
          question: "Do I need a co-founder or a technical background? Can I apply after raising?",
          answer:
            "A co-founder is not required, and founders who have already raised capital can apply. Non-technical founders should show credible technical capability on the founding team and a clear path to building the product.",
        },
        {
          question: "What's the difference between 886 Studios and ikigai Launchpad?",
          answer:
            "886 Studios is the venture firm. ikigai Launchpad is the accelerator program that we run.",
        },
        {
          question: "How is Launch Station different from ikigai Launchpad?",
          answer:
            "ikigai Launchpad is 886 Studios' 10-week accelerator with a standard $100,000 USD investment for 8% through a SAFE. Launch Station is a separate community program offering a free dedicated desk and founder network inside Taiwan Tech Arena.",
          links: [
            {
              label: "Explore Launch Station",
              href: "/programs/launch-station",
            },
          ],
        },
        {
          question: "What happens after the program ends?",
          answer:
            "Support continues beyond week 10. We provide tailored introductions, resources, and company-building support based on each alumnus’s stage and funding needs, while the founder community remains active beyond the batch.",
        },
        {
          question: "How should I prepare for interviews or ask another question?",
          answer:
            "The first interview is a 30-minute conversation with the 886 Studios team and does not require a pitch deck. Review the Interview Guidebook before meeting us, or contact the 886 team if your question is not covered here.",
          links: [
            {
              label: "Read the Interview Guidebook",
              href: "/interview-guidebook",
            },
            {
              label: "Contact 886 Studios",
              href: "/contact",
            },
          ],
        },
      ],
    },
    launchStation: {
      title: "Launch Station",
      eyebrow: "Community program",
      poster: {
        src: "/assets/programs/launch-station-community-collage-800.webp",
        alt: "Launch Station community collage",
        width: 800,
        height: 800,
      },
      lead:
        "Launch Station gives early-stage founders a free dedicated desk inside Taiwan Tech Arena, plus the builder energy, resources, and community around 886 Studios.",
      status: "Applications will open at the beginning of October.",
      essentials: [
        {
          label: "Location",
          value: "Taiwan Tech Arena",
        },
        {
          label: "Workspace",
          value: "Free dedicated desk",
        },
        {
          label: "Community",
          value: "Founders, investors, and 886",
        },
      ],
      benefits: [
        "Free dedicated desk space inside 886 Studios' open startup office",
        "Exclusive startup software perks across AWS, Notion, Ramp, Webflow, and more",
        "Founder and investor community at Taiwan Tech Arena",
      ],
      contribution:
        "In return, Launch Station members contribute to the community by hosting a session, sharing what they are learning, giving a demo, or helping other founders move faster.",
      card: {
        body: "Our community-building program for founders who move faster alongside ambitious peers.",
        cta: {
          label: "Learn more →",
          href: "/programs/launch-station",
        },
      },
    },
    footer: "",
  },
  resources: {
    title: "Resources Library",
    newsItems: [
      {
        title: "ikigai Launchpad Debuts in Taipei, Showcasing Taiwan’s Next Generation Startups",
        href: "https://meet-global.bnext.com.tw/articles/view/48332",
        source: "Meet Global",
        image: {
          src: "/assets/resources/news/launchpad-debut-960.webp",
          alt: "ikigai Launchpad founders presenting at Demo Day in Taipei",
          width: 1920,
          height: 1440,
        },
      },
      {
        title: "Kevin Lin on Finding Your ikigai: From Twitch to Taiwanese Startups",
        href: "https://youtu.be/wOHsOPxHO58?si=RLMXSJ1yHY5tEmqB",
        source: "CONNECTED on TaiwanPlus",
        image: {
          src: "/assets/resources/news/kevin-lin-taiwanplus-960.webp",
          alt: "Kevin Lin featured in the TaiwanPlus interview Finding Your ikigai",
          width: 1280,
          height: 720,
        },
      },
      {
        title: "Silicon Valley Founders Launch ikigai to Help Taiwanese Startups Go Global",
        href: "https://meet-global.bnext.com.tw/articles/view/48182",
        source: "Meet Global",
        image: {
          src: "/assets/resources/news/global-founders-960.webp",
          alt: "Phil Chen and Kai Huang at Dreamers Coffee Roasters",
          width: 1920,
          height: 1279,
        },
        secondaryLink: {
          label: "中文",
          href: "https://meet.bnext.com.tw/articles/view/52166",
        },
      },
      {
        title: "A look into ikigai: an inside look into the first few weeks of the Summer 2025 batch",
        href: "https://886studios.substack.com/p/a-look-into-ikigai",
        source: "ikigai Insights",
        image: {
          src: "/assets/resources/news/inside-ikigai-960.webp",
          alt: "The ikigai Launchpad Summer 2025 batch gathered outdoors",
          width: 1920,
          height: 1440,
        },
      },
      {
        title: "團隊崩潰、FBI上門到獲得大咖合作，AI數據公司Preciser成「最靠近NBA的台灣新創」",
        href: "https://meet.bnext.com.tw/articles/view/52115",
        source: "Meet Global",
        image: {
          src: "/assets/resources/news/preciser-960.webp",
          alt: "The Preciser founding team seated together in their office",
          width: 1920,
          height: 1279,
        },
      },
    ],
    libraryItems: [
      {
        title: "Y Combinator 101",
        href: "/resources/y-combinator-101",
        description:
          "Partner notes, application tips, and mock interview prep from YC visiting partners and experienced founders.",
      },
      {
        title: "Incorporation 101",
        href: "/incorporation-101",
        description:
          "Jurisdiction comparisons, common business structures, and practical guidance on forming your company.",
      },
      {
        title: "Application Guide",
        href: "/resources/application-guide",
        description:
          "A step-by-step checklist to prepare your team, pitch, and materials before applying to any accelerator.",
      },
      {
        title: "Ecosystem Database",
        href: "/resources/ecosystem-database",
        description:
          "A curated directory of accelerators, VC firms, co-working spaces, and communities across Taiwan.",
      },
      {
        title: "Founders FAQs",
        href: "/resources/founders-frequently-asked-questions",
        description:
          "Seasoned founders answer the most common questions on co-founders, investor relations, and networking.",
      },
      {
        title: "Interview Guidebook",
        href: "/interview-guidebook",
        description:
          "How 886 program interviews work, what we look for, and how to prepare your team and pitch.",
      },
    ],
    ama: {
      title: "Have more questions?",
      lead:
        "about your business, fundraising, industry, or want feedback on your idea from our partners? let us know!",
      ctaLabel: "Founder AMA",
      ctaHref: "https://tally.so/r/m626gk",
    },
    perks: {
      title: "Exclusive Perks",
      programHref: "/programs",
      categories: [
        {
          title: "Productivity",
          items: [
            {
              label: "Notion",
              href: "https://notion.so",
              logoSrc: "https://www.google.com/s2/favicons?domain=notion.so&sz=64",
            },
            {
              label: "Coda",
              href: "https://coda.io",
              logoSrc: "https://www.google.com/s2/favicons?domain=coda.io&sz=64",
            },
            {
              label: "DocSend",
              href: "https://www.docsend.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=docsend.com&sz=64",
            },
            {
              label: "Miro",
              href: "https://miro.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=miro.com&sz=64",
            },
          ],
        },
        {
          title: "Finances",
          items: [
            {
              label: "Ramp",
              href: "https://ramp.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=ramp.com&sz=64",
            },
            {
              label: "Mercury",
              href: "https://mercury.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=mercury.com&sz=64",
            },
            {
              label: "Carta",
              href: "https://carta.com/sg/en/",
              logoSrc: "https://www.google.com/s2/favicons?domain=carta.com&sz=64",
            },
          ],
        },
        {
          title: "Marketing",
          items: [
            {
              label: "Hubspot",
              href: "https://www.hubspot.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=hubspot.com&sz=64",
            },
            {
              label: "Webflow",
              href: "https://webflow.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=webflow.com&sz=64",
            },
          ],
        },
        {
          title: "Engineering",
          items: [
            {
              label: "AWS Activate",
              href: "https://aws.amazon.com/activate/",
              logoSrc: "https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64",
            },
            {
              label: "Google Cloud Startup Program",
              href: "https://cloud.google.com/startup/",
              logoSrc: "https://www.google.com/s2/favicons?domain=cloud.google.com&sz=64",
            },
            {
              label: "GitHub",
              href: "https://github.com",
              logoSrc: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
            },
          ],
        },
      ],
    },
  },
  about: {
    eyebrow: "About Us",
    title: "Built by founders, for founders.",
    lead: "886 Studios backs ambitious early-stage founders building companies with global potential.",
    columns: [
      {
        eyebrow: "Who We Are",
        title: "",
        paragraphs: [
          "886 Studios is a Taipei-based venture firm and startup accelerator supporting early-stage founders building for global markets. Our partners include the founders of Twitch, Kabam, RedOctane (creators of Guitar Hero), Playdom, OrbitBaby, HTC Vive, and other successful companies.",
          "Our portfolio spans industries and geographies, including Discord, OURA, Crunchyroll, Gogoro, P. LEAGUE+, KKBOX, and more. We back ambitious early-stage founders with a commitment to empowering Taiwan's startup ecosystem.",
          "What makes 886 Studios unique is our ability to combine Silicon Valley experience with deep knowledge of Taiwan's talent and market strengths. Based in Taipei, we serve as a bridge between Taiwan and Silicon Valley.",
        ],
      },
      {
        eyebrow: "Our Story",
        title: "",
        paragraphs: [
          "Named after Taiwan's international country code, 886 Studios was born with a singular mission: to foster and grow Taiwan's startup ecosystem.",
          "In our early days, 886 Studios operated as a venture studio. This insight drove us to create ikigai Launchpad, our startup accelerator designed to propel founders toward global growth.",
          "Our vision is simple: create an environment where founders can thrive with the right mix of funding, mentorship, resources, and networks. We are not just building companies. We are shaping the future of innovation in Taiwan and beyond.",
        ],
      },
    ],
    portfolioCta: {
      label: "Check out our portfolio companies →",
      href: "/portfolio",
    },
    teamTitle: "Operating Team",
    team: [
      {
        initials: "FW",
        name: "Freya Wu",
        role: "General Manager",
        photo: "/assets/headshots/freya-wu.webp",
        objectPosition: "center 40%",
        linkedinUrl: "https://www.linkedin.com/in/freyawwc/",
      },
      {
        initials: "PC",
        name: "Patryk Chojecki",
        role: "Program Manager",
        photo: "/assets/headshots/patryk-chojecki.webp",
        linkedinUrl: "https://www.linkedin.com/in/patryk-chojecki/",
      },
      {
        initials: "CW",
        name: "Carter Wang",
        role: "Venture Associate",
        photo: "/assets/headshots/carter-wang.webp",
        linkedinUrl: "https://www.linkedin.com/in/cartergrantwang/",
        xUrl: "https://x.com/carterkowang",
      },
    ],
    partnersTitle: "Partners",
    partners: [
      {
        initials: "KH",
        name: "Kai Huang",
        company: "Guitar Hero / Blue Goji",
        photo: "/assets/headshots/kai-huang.webp",
      },
      {
        initials: "KL",
        name: "Kevin Lin",
        company: "Twitch / Metatheory",
        photo: "/assets/headshots/kevin-lin.webp",
      },
      {
        initials: "KC",
        name: "Kevin Chou",
        company: "Kabam / Gen.G",
        photo: "/assets/headshots/kevin-chou.webp",
      },
      {
        initials: "CW",
        name: "Chris Wang",
        company: "Playdom / ThunderCore",
        photo: "/assets/headshots/chris-wang.webp",
      },
      {
        initials: "PC",
        name: "Phil Chen",
        company: "HTC Vive / New Taipei Kings / Cold Electric",
        photo: "/assets/headshots/phil-chen.webp",
      },
      {
        initials: "JH",
        name: "Jameson Hsu",
        company: "Mochi Media",
        photo: "/assets/headshots/jameson-hsu.webp",
      },
      {
        initials: "JH",
        name: "Joseph Hei",
        company: "Orbit Baby",
        photo: "/assets/headshots/joseph-hei.webp",
      },
      {
        initials: "JH",
        name: "Jacob Hsu",
        company: "Catalyte / Symbio",
        photo: "/assets/headshots/jacob-hsu.webp",
      },
      {
        initials: "CH",
        name: "Charles Huang",
        company: "Guitar Hero / Blue Goji",
        photo: "/assets/headshots/charles-huang.webp",
      },
      {
        initials: "JH",
        name: "James Hong",
        company: "Hot or Not",
        photo: "/assets/headshots/james-hong.webp",
      },
      {
        initials: "SC",
        name: "Steven Chiang",
        company: "Tiburon / EA Sports",
        photo: "/assets/headshots/steven-chiang.webp",
      },
      {
        initials: "TC",
        name: "Timothy Chen",
        company: "VIA Technologies / CAATCHPLAY",
        photo: "/assets/headshots/timothy-chen.webp",
      },
    ],
    collaboration: {
      eyebrow: "Fund Partner",
      title: "Lifelike Capital",
      logo: {
        src: "/assets/about/lifelike-capital.webp",
        alt: "Lifelike Capital",
        width: 750,
        height: 750,
      },
      description:
        "886 Studios and Lifelike Capital work together to support founders building ambitious companies with global potential.",
      program: {
        label: "ikigai Launchpad",
        href: "/programs",
      },
      programDescription:
        "is the result of our collaboration, a shared program created to help the next generation of startups grow globally.",
      links: [
        {
          label: "Website",
          href: "https://www.lifelikecap.com/",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/lifelikecapital/",
        },
      ],
    },
    careers: {
      title: "Careers",
      paragraphs: [
        "We are not hiring for open roles right now. When an opportunity opens at 886 Studios, we will post it here.",
        "We usually bring on summer interns, too. When the next intern call opens, the details will be announced on this page.",
      ],
    },
  },
  events: {
    eyebrow: "Events",
    title: "What's happening",
    lead: "Meetups, workshops, and demo days for the 886 Studios community.",
    calendarUrl: "https://luma.com/886",
    calendarTitle: "Subscribe to the 886 Studios Luma calendar.",
    calendarText:
      "All of our events are available on Luma. Subscribe there to get the latest sessions, reminders, and updates as soon as they are published.",
    calendarCta: "Subscribe on Luma",
    upcomingTitle: "Upcoming events",
    upcomingHighlightLabel: "Upcoming event",
    pastTitle: "Past events",
    setupTitle: "Events are syncing from Luma.",
    setupText: "Check back soon for the latest 886 Studios events.",
    errorTitle: "We couldn't load the calendar right now.",
    errorText: "Check back soon for the latest 886 Studios events.",
    emptyTitle: "No upcoming events are published yet.",
    emptyText: "Check back soon for new 886 Studios events.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    email: {
      label: "Email us directly",
      description:
        "For partnerships, program questions, or anything else, reach us at:",
      address: "it@886studios.com",
      href: "mailto:it@886studios.com",
      button: "Email us",
      note: "This opens your default email app.",
    },
  },
  footer: {
    copy: "© 886 Studios 2026",
  },
};
