export const brand = {
  name: "886 Studios",
  logoAlt: "886 Studios",
  logoUrl: "/assets/886-logo.avif",
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
      body:
        "886 Studios is where the next generation of global tech companies are built.\nWe run ikigai Launchpad, the premier Silicon Valley-style accelerator in Taipei\nbrought to you by the founders of Twitch, Guitar Hero, Playdom, Kabam, & more.",
      cta: {
        label: "Apply to ikigai Launchpad",
        href: "https://tally.so/r/w5p4jQ",
      },
    },
    photos: {
      items: [
        {
          src: "/assets/landing/launchpad-01.jpg",
          alt: "886 Studios founders gathered during a community event",
        },
        {
          src: "/assets/landing/launchpad-02.jpg",
          alt: "Founders and mentors in conversation at 886 Studios",
        },
        {
          src: "/assets/landing/launchpad-03.jpg",
          alt: "886 Studios community members at a founder session",
        },
        {
          src: "/assets/landing/launchpad-04.jpg",
          alt: "A workshop moment with the 886 Studios founder community",
        },
        {
          src: "/assets/landing/launchpad-05.jpg",
          alt: "Founders watching a presentation during an 886 Studios community session",
        },
        {
          src: "/assets/landing/launchpad-06.jpg",
          alt: "886 Studios founders meeting during an in-person program session",
        },
        {
          src: "/assets/landing/launchpad-07.jpg",
          alt: "886 Studios founders gathered around a table during a program session",
        },
      ],
    },
    programs: {
      eyebrow: "Programs",
      title: "How we support founders",
      featured: {
        label: "Accelerator",
        title: "ikigai Launchpad",
        body:
          "$100K in funding, hands-on mentorship from the 886 Studios partners, and a tight-knit 10-12 week program designed for startups that want to move fast.",
        meta: ["$100K funding", "Partner office hours", "Batch community"],
        ctaLabel: "Learn more →",
        ctaHref: "/programs",
      },
      secondary: [
        {
          label: "Community",
          title: "Launch Station",
          body:
            "Free coworking space and a founder community inside Taiwan Tech Arena.",
          ctaLabel: "Learn more →",
          ctaHref: "/programs",
        },
      ],
    },
    founders: {
      title: "Built by founders from iconic companies",
      logos: [
        {
          name: "Twitch",
          src: "/assets/logos/twitch.svg",
          alt: "Twitch logo",
          exit: "Exit · $970M",
          title: "Twitch exit: approximately $970 million",
          imageClass: "is-tall",
        },
        {
          name: "Kabam",
          src: "/assets/logos/kabam.png",
          alt: "Kabam logo",
          exit: "Exit · $800M",
          title: "Kabam exit: approximately $800 million",
          imageClass: "is-tall",
        },
        {
          name: "Guitar Hero (Red Octane)",
          src: "/assets/logos/guitar-hero.png",
          alt: "Guitar Hero logo",
          exit: "Exit · $99.9M",
          title: "RedOctane exit: approximately $99.9 million",
          imageClass: "is-tall",
        },
        {
          name: "Playdom",
          src: "/assets/logos/playdom-alt.png",
          alt: "Playdom logo",
          exit: "Exit · $563.2M",
          title: "Playdom exit: approximately $563.2 million",
          imageClass: "is-tall",
        },
        {
          name: "Metatheory",
          src: "/assets/logos/metatheory.png",
          alt: "Metatheory logo",
          imageClass: "is-tall",
        },
        {
          name: "Mochi Media",
          src: "/assets/logos/mochimedia.png",
          alt: "Mochi Media logo",
          exit: "Exit · $80M",
          title: "Mochi Media exit: approximately $80 million",
          imageClass: "is-tall",
        },
        {
          name: "Orbit Baby",
          src: "/assets/logos/orbitbaby.png",
          alt: "Orbit Baby logo",
          exit: "Exit · $17.5M",
          title: "Orbit Baby exit: approximately $17.5 million",
          imageClass: "is-tall",
        },
        {
          name: "Blue Goji",
          src: "/assets/logos/bluegoji.png",
          alt: "Blue Goji logo",
          imageClass: "is-tall",
        },
        {
          name: "Gen.G",
          src: "/assets/logos/geng.png",
          alt: "Gen.G logo",
          imageClass: "is-tall",
        },
        {
          name: "Hot or Not",
          src: "/assets/logos/hotornot.png",
          alt: "Hot or Not logo",
          exit: "Exit · $20M",
          title: "Hot or Not exit: approximately $20 million",
          imageClass: "is-tall",
        },
        {
          name: "Rally",
          src: "/assets/logos/rally-official.png",
          alt: "Rally logo",
          imageClass: "is-tall",
        },
        {
          name: "Tiburon Entertainment",
          src: "/assets/logos/tiburon.png",
          alt: "Tiburon Entertainment logo",
          imageClass: "is-tall",
        },
        {
          name: "Catalyte",
          src: "/assets/logos/catalyte-official.png",
          alt: "Catalyte logo",
          imageClass: "is-tall",
        },
        {
          name: "Cold Electric",
          src: "/assets/logos/cold-electric-og.png",
          alt: "Cold Electric logo",
          imageClass: "is-tall",
        },
        {
          name: "New Taipei Kings",
          src: "/assets/logos/new-taipei-kings.png",
          alt: "New Taipei Kings logo",
          imageClass: "is-tall",
        },
      ],
      portfolio: [
        "Discord",
        "OURA",
        "Crunchyroll",
        "Gogoro",
        "P. LEAGUE+",
        "KKBOX",
        "Runaway AI",
        "O3O Labs (PicPet)",
        "Gitroll",
        "Dentscape",
        "Valtech",
      ],
    },
    newsletter: {
      title: "Subscribe to our Newsletter",
      body: "Only cool things, we promise.",
      placeholder: "you@company.com",
      button: "Subscribe",
      action: "https://886studios.substack.com/api/v1/free",
    },
  },
  programs: {
    eyebrow: "Programs",
    title: "ikigai Launchpad",
    lead:
      "ikigai Launchpad is a 12-week accelerator for founders looking for funding to work full-time on their startup and mentorship from successful Silicon Valley founders.",
    items: [
      {
        name: "ikigai Launchpad",
        learnMoreHref: "https://withikigai.com/?gad_source=1&gad_campaignid=22431875260&gbraid=0AAAAA_T5bfikWpWgiBTvO7VHwrU9CtcE_&gclid=CjwKCAjw8arQBhB9EiwAfIKdQlaQyIeLDc12b41gZD-eZtsUKEI1hZeVtvXa_raBK1dNjUjeREajkBoCNKgQAvD_BwE",
        body:
          "Built by the founders behind Twitch, Guitar Hero, Kabam, and more, the program offers funding, hands-on mentorship from 886 Studios partners, access to a global network, a tight-knit batch community, office space in Taipei, workshops, guest speakers, and Demo Day.",
        highlights: [],
        details: {
          intro: "",
          metrics: [
            {
              label: "Investment",
              value: "$100K USD",
              note: "Standard deal listed by ikigai: $100K USD for 8%.",
            },
            {
              label: "Format",
              value: "12 weeks",
              note: "In-person in Taipei, followed by Demo Day.",
            },
            {
              label: "Location",
              value: "Taiwan Tech Arena",
              note: "Office space is provided for the duration of the program.",
            },
          ],
          sections: [
            {
              title: "Funding",
              items: [
                "$100K USD investment",
                "Standard deal listed by ikigai: $100K USD for 8%",
                "Funding intended to help founders focus full-time on the company",
              ],
            },
            {
              title: "Community",
              items: [
                "Office space at Taiwan Tech Arena",
                "Tight in-person batch in Taipei",
                "English-first environment with bilingual support",
                "Networking, founder events, and team building",
              ],
            },
            {
              title: "Hands-on support",
              items: [
                "Weekly 1-on-1 mentor office hours",
                "Founder-led workshops and guest speakers",
                "Product-to-market support from partners and program staff",
              ],
            },
            {
              title: "Beyond the batch",
              items: [
                "Warm introductions and investor matching",
                "Demo Day after the 12-week program",
                "Access to founder, operator, and corporate perks",
                "Tailored post-program support for alumni",
              ],
            },
          ],
        },
        fit:
          "Founders looking for funding to work full-time and mentorship from successful Silicon Valley founders.",
        cta: {
          type: "link",
          label: "Apply to ikigai Launchpad →",
          href: "https://tally.so/r/w5p4jQ",
        },
      },
      {
        track: "Community",
        name: "Launch Station",
        body:
          "A free workspace inside Taiwan Tech Arena for founders who build better around other ambitious teams. The point is proximity: more useful collisions, more honest conversations, more forward motion.",
        highlights: ["Founder community", "Free coworking space"],
        fit: "Founders who want a Taipei base and builder energy.",
        cta: {
          type: "status",
          label: "Applications open soon",
        },
      },
    ],
    footer: "",
  },
  resources: {
    title: "Resources",
    libraryItems: [
      {
        title: "Y Combinator 101",
        href: "/resources/y-combinator-101",
        description: "Partner notes, application tips, and mock interview prep from YC visiting partners and experienced founders.",
      },
      {
        title: "Incorporation 101",
        href: "/incorporation-101",
        description: "Jurisdiction comparisons, common business structures, and practical guidance on forming your company.",
      },
      {
        title: "Application Guide",
        href: "/resources/application-guide",
        description: "A step-by-step checklist to prepare your team, pitch, and materials before applying to any accelerator.",
      },
      {
        title: "Ecosystem Database",
        href: "/resources/ecosystem-database",
        description: "A curated directory of accelerators, VC firms, co-working spaces, and communities across Taiwan.",
      },
      {
        title: "Founders FAQs",
        href: "/resources/founders-frequently-asked-questions",
        description: "Seasoned founders answer the most common questions on co-founders, investor relations, and networking.",
      },
      {
        title: "Interview Guidebook",
        href: "/interview-guidebook",
        description: "How 886 program interviews work, what we look for, and how to prepare your team and pitch.",
      },
    ],
    ama: {
      title: "Ask Me Anything",
      paragraphs: [
        "Building a company is undeniably challenging, a reality we fully understand from personal experience. Founders constantly find themselves navigating a complex intersection of responsibilities — making tough decisions, grappling with uncertainty, and sometimes needing to part ways with individuals or ideas.",
        "We're here to lend an empathetic ear and offer assistance whenever you need it.",
        "In 886 AMA, your questions will be addressed asynchronously by our venture partners who have encountered similar experiences.",
      ],
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
            { label: "Notion", href: "https://notion.so" },
            { label: "Coda", href: "https://coda.io" },
            { label: "DocSend", href: "https://www.docsend.com" },
            { label: "Miro", href: "https://miro.com" },
          ],
        },
        {
          title: "Finances",
          items: [
            { label: "Ramp", href: "https://ramp.com" },
            { label: "Mercury", href: "https://mercury.com" },
          ],
        },
        {
          title: "Marketing",
          items: [
            { label: "Hubspot", href: "https://www.hubspot.com" },
            { label: "Webflow", href: "https://webflow.com" },
          ],
        },
        {
          title: "Engineering",
          items: [
            { label: "AWS Activate", href: "https://aws.amazon.com/activate/" },
            { label: "GitHub", href: "https://github.com" },
          ],
        },
      ],
    },
    contactPrompt: "Need more help?",
    contactLabel: "Contact Us",
    contactHref: "/contact",
  },
  about: {
    eyebrow: "About Us",
    title: "Built by founders, for founders.",
    lead:
      "886 Studios backs ambitious early-stage founders building companies with global potential.",
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
      { initials: "KH", name: "Kai Huang", company: "Guitar Hero", photo: "/assets/headshots/kai-huang.webp" },
      { initials: "KL", name: "Kevin Lin", company: "Twitch", photo: "/assets/headshots/kevin-lin.webp" },
      { initials: "KC", name: "Kevin Chou", company: "Kabam", photo: "/assets/headshots/kevin-chou.webp" },
      { initials: "CW", name: "Chris Wang", company: "Playdom", photo: "/assets/headshots/chris-wang.webp" },
      { initials: "PC", name: "Phil Chen", company: "HTC Vive", photo: "/assets/headshots/phil-chen.webp" },
      { initials: "JH", name: "Jameson Hsu", company: "Mochi Media", photo: "/assets/headshots/jameson-hsu.webp" },
      { initials: "JH", name: "Joseph Hei", company: "Orbit Baby", photo: "/assets/headshots/joseph-hei.webp" },
      { initials: "JH", name: "Jacob Hsu", company: "Catalyte", photo: "/assets/headshots/jacob-hsu.webp" },
      { initials: "CH", name: "Charles Huang", company: "Guitar Hero", photo: "/assets/headshots/charles-huang.webp" },
      { initials: "JH", name: "James Hong", company: "Hot or Not", photo: "/assets/headshots/james-hong.webp" },
      { initials: "SC", name: "Steven Chiang", company: "Tiburon Entertainment", photo: "/assets/headshots/steven-chiang.webp" },
      { initials: "TC", name: "Timothy Chen", company: "Gen.G", photo: "/assets/headshots/timothy-chen.webp" },
    ],
  },
  events: {
    eyebrow: "Events",
    title: "What's happening",
    lead:
      "Meetups, workshops, and demo days for the 886 Studios community.",
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
  apply: {
    eyebrow: "Application",
    title: "Join ikigai Launchpad",
    lead:
      "Tell us about your startup and why you'd be a great fit for our accelerator program.",
    sections: [
      {
        title: "Founder Information",
        rows: [
          [
            {
              label: "Founder Name",
              type: "text" as const,
              placeholder: "Your name",
              hint: "Full name of the primary founder",
            },
            {
              label: "Email Address",
              type: "email" as const,
              placeholder: "you@company.com",
              hint: "We'll use this to contact you",
            },
          ],
          [
            {
              label: "Phone Number",
              type: "tel" as const,
              placeholder: "+886 9XX XXX XXX",
              hint: "Include country code",
            },
            {
              label: "Co-founders",
              type: "text" as const,
              placeholder: "Names and roles (if applicable)",
              hint: "List any other founders on the team",
            },
          ],
        ],
      },
      {
        title: "Company Information",
        rows: [
          [
            {
              label: "Company Name",
              type: "text" as const,
              placeholder: "Your startup's name",
              hint: "What is your company called?",
            },
          ],
          [
            {
              label: "Industry",
              type: "select" as const,
              placeholder: "Select an industry...",
              hint: "What's your primary industry?",
              options: [
                "SaaS",
                "FinTech",
                "AI/ML",
                "DeepTech",
                "Gaming",
                "Marketplaces",
                "Hardware",
                "BioTech",
                "Other",
              ],
            },
            {
              label: "Stage",
              type: "select" as const,
              placeholder: "Select a stage...",
              hint: "Where is your startup at right now?",
              options: [
                "Idea Stage",
                "Pre-Launch",
                "Launched (Early Users)",
                "MVP with Revenue",
                "Growth Stage",
              ],
            },
          ],
        ],
      },
      {
        title: "Your Story",
        rows: [
          [
            {
              label: "What problem are you solving?",
              type: "textarea" as const,
              placeholder:
                "Describe the problem you're addressing and who it affects...",
              hint: "Help us understand the market opportunity",
            },
          ],
          [
            {
              label: "How are you solving it?",
              type: "textarea" as const,
              placeholder:
                "Explain your approach, product, and what makes you different...",
              hint: "What's unique about your solution?",
            },
          ],
          [
            {
              label: "Why are you the right team to build this?",
              type: "textarea" as const,
              placeholder:
                "Tell us about relevant experiences, skills, and why you're uniquely positioned...",
              hint: "What gives you an unfair advantage?",
            },
          ],
        ],
      },
      {
        title: "Metrics & Traction",
        rows: [
          [
            {
              label: "Current Monthly Revenue or MRR",
              type: "text" as const,
              placeholder: "$0 or N/A",
              hint: "If applicable",
            },
            {
              label: "Number of Active Users",
              type: "text" as const,
              placeholder: "0 or N/A",
              hint: "Monthly active users",
            },
          ],
          [
            {
              label: "Key Metrics (Month-over-Month Growth, Retention, etc.)",
              type: "textarea" as const,
              placeholder:
                "Share your most important metrics and growth rates...",
              hint: "What shows momentum?",
            },
          ],
        ],
      },
      {
        title: "Your Vision",
        rows: [
          [
            {
              label: "What's your 3-year vision?",
              type: "textarea" as const,
              placeholder:
                "Describe where you see your company in 3 years...",
              hint: "Be ambitious",
            },
          ],
          [
            {
              label: "Why are you interested in 886 Studios / ikigai Launchpad?",
              type: "textarea" as const,
              placeholder:
                "What specifically appeals to you about our program?...",
              hint: "Help us understand the fit",
            },
          ],
        ],
      },
      {
        title: "Additional Information",
        rows: [
          [
            {
              label: "Company Website",
              type: "url" as const,
              placeholder: "https://yourcompany.com",
              hint: "If you have one",
            },
            {
              label: "Location",
              type: "text" as const,
              placeholder: "City, Country",
              hint: "Where is your team based?",
            },
          ],
          [
            {
              label: "Additional Links",
              type: "textarea" as const,
              placeholder:
                "Links to your pitch deck, demo video, GitHub, LinkedIn profiles, etc.",
              hint: "Share any relevant links (optional)",
            },
          ],
        ],
      },
    ],
    actions: {
      submitLabel: "Submit Application",
      cancelLabel: "Cancel",
      cancelHref: "/",
    },
    note:
      "By submitting this application, you agree to our terms and privacy policy. We'll review all applications carefully and get back to you within 2 weeks.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead:
      "Founder, investor, mentor, or curious — we'd love to hear from you.",
    form: {
      fields: [
        { label: "Name", type: "text" as const, placeholder: "Your name" },
        { label: "Email", type: "email" as const, placeholder: "you@company.com" },
        { label: "Subject", type: "text" as const, placeholder: "What's this about?" },
      ],
      messageLabel: "Message",
      messagePlaceholder:
        "Tell us about yourself and why you're reaching out...",
      button: "Send Message",
    },
    location: {
      label: "Location",
      value: "Taiwan Tech Arena (TTA)<br>Taipei, Taiwan",
    },
    followUsLabel: "Follow Us",
    ctaCard: {
      label: "Ready to build?",
      body:
        "Applications for ikigai Launchpad are currently closed for Sp'26. Check back soon.",
      buttonLabel: "Visit ikigai Launchpad",
      buttonHref: "https://withikigai.com/",
    },
  },
  footer: {
    copy: "© 886 Studios 2026",
  },
};
