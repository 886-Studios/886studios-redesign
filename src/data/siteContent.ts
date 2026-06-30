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
  };
  description: string;
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
    logo: {
      src: "/assets/portfolio/peeps.jpg",
      alt: "Peeps logo",
      width: 512,
      height: 512,
    },
    description:
      "Peeps is a private social app that gives close friends a shared pixel home on the internet. Friends can move around a room together, share daily photos, decorate the space, raise mystery pets, and play mini-games, turning lightweight check-ins into a persistent place for real friend groups.",
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
    name: "Hushli",
    slug: "hushli",
    relationship: "886-backed",
    category: "Health",
    program: "ikigai S'25",
    status: "Active",
    websiteUrl: "https://hushli.ai/",
    appStoreUrl: "https://apps.apple.com/tw/app/hushli-ai-confidant-journal/id6748250163?l=en-GB",
    logo: {
      src: "/assets/portfolio/hushli.jpg",
      alt: "Hushli logo",
      width: 512,
      height: 512,
    },
    description:
      "Hushli is an AI confidant and mood journal built around a private companion named Lumi. The app gives people a place to talk through difficult moments, turn conversations into journal entries, track emotional patterns over time, and use privacy features such as Face ID for a quieter personal reflection space.",
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
    category: "Productivity",
    program: "ikigai F'24",
    status: "Acquired",
    websiteUrl: "https://gitroll.io/",
    logo: {
      src: "/assets/portfolio/gitroll.png",
      alt: "GitRoll logo",
      width: 296,
      height: 74,
    },
    description:
      "GitRoll helps engineering teams evaluate developers by turning real code history into data-driven coding profiles. Its AI analyzes open-source activity, builds skill evidence from actual repositories, and gives recruiters a way to assess candidates without relying only on resumes, trivia-style interviews, or take-home tests.",
  },
  {
    name: "Kardomo",
    slug: "kardomo",
    relationship: "886-backed",
    category: "Consumer",
    status: "Active",
    websiteUrl: "https://kardomo.com/",
    appStoreUrl: "https://apps.apple.com/tw/app/kardomo-%E5%8F%B0%E7%81%A3%E5%B0%88%E5%B1%AC%E7%9A%84-kpop-%E4%BA%A4%E5%8F%8B%E5%9C%88/id6748519302",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.kardomo.kardomo",
    logo: {
      src: "/assets/portfolio/kardomo.png",
      alt: "Kardomo logo",
      width: 879,
      height: 1149,
    },
    description:
      "Kardomo is a Taiwan-focused K-pop fan platform that brings photocard collections, idol schedules, fan diaries, music rankings, and discussion threads into one community app. Fans can track events, organize collections, share moments, and connect with other fans around the groups and artists they follow.",
  },
  {
    name: "PicPet by O3O Labs",
    slug: "o3o-labs",
    relationship: "886-backed",
    category: "Consumer",
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
      "PicPet by O3O Labs is a social game for close friends built around raising a shared virtual pet. Friends feed the pet with photos, earn coins, unlock rewards, customize rooms and pets, and use the daily routine as a playful reason to stay connected with the people they care about.",
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
    category: "AI",
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
      href: "https://tally.so/r/w5p4jQ",
    },
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "programs", label: "Programs", href: "/programs" },
      { id: "about", label: "About Us", href: "/about" },
      { id: "events", label: "Events", href: "/events" },
      { id: "resources", label: "Resources", href: "/resources" },
      { id: "contact", label: "Contact", href: "/contact" },
    ],
  },
  home: {
    hero: {
      titleLead: "Build what",
      titleAccent: "matters.",
      body: "886 Studios is where the next generation of global tech companies are built.\nWe run ikigai Launchpad, the premier Silicon Valley-style accelerator in Taipei\nbrought to you by the founders of Twitch, Guitar Hero, Playdom, Kabam, & more.",
      cta: {
        label: "Learn more about ikigai Launchpad",
        href: "/programs",
      },
    },
    photos: {
      items: [
        {
          src: "/assets/landing/launchpad-01.jpg",
          alt: "886 Studios founders gathered during a community event",
          width: 1800,
          height: 1013,
        },
        {
          src: "/assets/landing/launchpad-02.jpg",
          alt: "Founders and mentors in conversation at 886 Studios",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-03.jpg",
          alt: "886 Studios community members at a founder session",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-04.jpg",
          alt: "A workshop moment with the 886 Studios founder community",
          width: 1800,
          height: 1332,
        },
        {
          src: "/assets/landing/launchpad-05.jpg",
          alt: "Founders watching a presentation during an 886 Studios community session",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-06.jpg",
          alt: "886 Studios founders meeting during an in-person program session",
          width: 1800,
          height: 1350,
        },
        {
          src: "/assets/landing/launchpad-07.jpg",
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
        body: "$100K USD in funding, hands-on mentorship from successful Silicon Valley founders, and a tight-knit 10-12 week accelerator program designed for startups that want to move fast.",
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
          src: "/assets/logos/kabam.png",
          alt: "Kabam logo",
          width: 316,
          height: 316,
          exit: "Exit · $800M",
          title: "Kabam exit: approximately $800 million",
          imageClass: "is-tall",
        },
        {
          name: "Guitar Hero",
          src: "/assets/logos/guitar-hero.png",
          alt: "Guitar Hero logo",
          width: 489,
          height: 352,
          exit: "Exit · $99.9M",
          title: "Guitar Hero exit: approximately $99.9 million",
          imageClass: "is-tall",
        },
        {
          name: "Playdom",
          src: "/assets/logos/playdom-alt.png",
          alt: "Playdom logo",
          width: 1000,
          height: 244,
          exit: "Exit · $563.2M",
          title: "Playdom exit: approximately $563.2 million",
          imageClass: "is-tall",
        },
        {
          name: "Metatheory",
          src: "/assets/logos/metatheory.png",
          alt: "Metatheory logo",
          width: 400,
          height: 400,
          imageClass: "is-tall",
        },
        {
          name: "Mochi Media",
          src: "/assets/logos/mochimedia.png",
          alt: "Mochi Media logo",
          width: 820,
          height: 750,
          exit: "Exit · $80M",
          title: "Mochi Media exit: approximately $80 million",
          imageClass: "is-tall",
        },
        {
          name: "Orbit Baby",
          src: "/assets/logos/orbitbaby.png",
          alt: "Orbit Baby logo",
          width: 456,
          height: 80,
          exit: "Exit · $17.5M",
          title: "Orbit Baby exit: approximately $17.5 million",
          imageClass: "is-tall",
        },
        {
          name: "Blue Goji",
          src: "/assets/logos/bluegoji.png",
          alt: "Blue Goji logo",
          width: 256,
          height: 256,
          imageClass: "is-tall",
        },
        {
          name: "Gen.G",
          src: "/assets/logos/geng.png",
          alt: "Gen.G logo",
          width: 820,
          height: 956,
          imageClass: "is-tall",
        },
        {
          name: "Hot or Not",
          src: "/assets/logos/hotornot.png",
          alt: "Hot or Not logo",
          width: 1920,
          height: 1272,
          exit: "Exit · $20M",
          title: "Hot or Not exit: approximately $20 million",
          imageClass: "is-tall",
        },
        {
          name: "Rally",
          src: "/assets/logos/rally-official.png",
          alt: "Rally logo",
          width: 300,
          height: 300,
          imageClass: "is-tall",
        },
        {
          name: "Tiburon Entertainment",
          src: "/assets/logos/tiburon.png",
          alt: "Tiburon Entertainment logo",
          width: 184,
          height: 184,
          imageClass: "is-tall",
        },
        {
          name: "Catalyte",
          src: "/assets/logos/catalyte-official.png",
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
          src: "/assets/logos/new-taipei-kings.png",
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
    eyebrow: "Programs",
    title: "ikigai Launchpad",
    lead: "A 12-week, in-person accelerator in Taipei with $100K USD, mentor office hours, investor intros, and support beyond the batch.",
    items: [
      {
        name: "ikigai Launchpad",
        learnMoreHref:
          "https://withikigai.com/?gad_source=1&gad_campaignid=22431875260&gbraid=0AAAAA_T5bfikWpWgiBTvO7VHwrU9CtcE_&gclid=CjwKCAjw8arQBhB9EiwAfIKdQlaQyIeLDc12b41gZD-eZtsUKEI1hZeVtvXa_raBK1dNjUjeREajkBoCNKgQAvD_BwE",
        body: "A focused accelerator for founders who need capital, mentor time, an in-person batch, investor access, and support that continues after the 12 weeks.",
        highlights: [],
        details: {
          intro: "",
          metrics: [
            {
              label: "Investment",
              value: "$100K USD",
              note: "Funding for the company.",
            },
            {
              label: "Length",
              value: "12 weeks",
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
              note:
                "Plus: Workshops, guest speakers, team building, customer and investor intros, and more.",
            },
          ],
          sections: [
            {
              title: "Funding",
              items: [
                "$100K USD investment",
                "Designed to help founders work full-time",
              ],
            },
            {
              title: "Hands-on support",
              items: [
                "A community of founders & innovators",
                "Warm introductions and investor matching",
                "Support beyond the batch",
              ],
            },
            {
              title: "Community",
              items: [
                "A community of founders & innovators",
                "In person in Taipei",
              ],
            },
          ],
        },
        fit: "Founders ready to spend 12 weeks in person in Taipei building with capital, mentors, and a focused batch.",
        cta: {
          type: "link",
          label: "Apply to ikigai Launchpad →",
          href: "https://tally.so/r/w5p4jQ",
        },
      },
      {
        track: "Community",
        name: "Launch Station",
        body: "A free dedicated desk and founder community inside Taiwan Tech Arena for early-stage builders in Taipei.",
        highlights: [
          "Free dedicated desk space",
          "Exclusive startup software perks",
          "Founder and investor community",
        ],
        fit: "Motivated founders refining an MVP, preparing to fundraise, or looking for a sharper startup environment.",
        cta: {
          type: "link",
          label: "Learn more →",
          href: "/programs/launch-station",
        },
      },
    ],
    launchStation: {
      title: "Launch Station",
      eyebrow: "Community program",
      poster: {
        src: "/assets/programs/launch-station-community-collage.jpg",
        alt: "Launch Station poster",
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
    },
    footer: "",
  },
  resources: {
    title: "Resources Library",
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
      programHref: "https://withikigai.com/",
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
          "886 Studios is a group of experienced founders dedicated to building and launching startups globally. Our partners include the founders of Twitch, Kabam, RedOctane (creators of Guitar Hero), Playdom, OrbitBaby, HTC Vive, and other successful companies.",
          "Our portfolio spans industries and geographies, including Discord, OURA, Crunchyroll, Gogoro, P. LEAGUE+, KKBOX, and more. We back ambitious early-stage founders with a commitment to empowering Taiwan's startup ecosystem.",
          "What makes 886 Studios unique is our ability to combine Silicon Valley experience with deep knowledge of Taiwan's talent and market strengths. Based in Taipei, we serve as a bridge between Taiwan and Silicon Valley.",
        ],
      },
      {
        eyebrow: "Our Story",
        title: "",
        paragraphs: [
          "Named after Taiwan's international country code, 886 Studios was born with a singular mission: to foster and grow Taiwan's startup ecosystem.",
          "In our early days, 886 Studios operated as a venture studio. This insight drove us to create the ikigai Launchpad — our startup accelerator designed to propel founders toward global growth.",
          "Our vision is simple: create an environment where founders can thrive with the right mix of funding, mentorship, resources, and networks. We are not just building companies — we are shaping the future of innovation in Taiwan and beyond.",
        ],
      },
    ],
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
    form: {
      fields: [
        { label: "Name", type: "text" as const, placeholder: "Your name" },
        {
          label: "Email",
          type: "email" as const,
          placeholder: "you@company.com",
        },
        {
          label: "Subject",
          type: "text" as const,
          placeholder: "What's this about?",
        },
      ],
      messageLabel: "Message",
      messagePlaceholder:
        "Tell us about yourself and why you're reaching out...",
      button: "Send Message",
    },
  },
  footer: {
    copy: "© 886 Studios 2026",
  },
};
