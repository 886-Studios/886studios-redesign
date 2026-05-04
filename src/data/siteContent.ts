export const brand = {
  name: "886 Studios",
  logoAlt: "886 Studios",
  logoUrl:
    "https://assets.super.so/84e41881-15d5-4c3b-8757-ffaf6ffc4c3d/images/7d822858-0851-478f-8873-befb9dbe6aba/886_Logo_(white).avif",
};

export const socialLinks = [
  {
    platform: "x",
    href: "https://x.com/886Studios",
    ariaLabel: "886 Studios on X",
  },
  {
    platform: "instagram",
    href: "https://www.instagram.com/ikigai_launchpad/",
    ariaLabel: "886 Studios on Instagram",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/886studios/",
    ariaLabel: "886 Studios on LinkedIn",
  },
  {
    platform: "discord",
    href: "https://discord.com/invite/B98RnZzdgj",
    ariaLabel: "886 Studios on Discord",
  },
] as const;

export const siteContent = {
  nav: {
    cta: {
      label: "Apply Now →",
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
        "886 Studios is where Taiwan's next generation of global tech companies are built — by the founders behind Twitch, Kabam, and Guitar Hero.",
      cta: {
        label: "Apply to ikigai Launchpad →",
        href: "https://tally.so/r/w5p4jQ",
      },
    },
    programs: {
      eyebrow: "Programs",
      title: "How we support founders",
      lead:
        "From accelerator funding to community desks and coaching — find the program that meets you where you are.",
      featured: {
        label: "Flagship<br>Accelerator",
        title: "ikigai Launchpad",
        body:
          "$100K funding, partner mentorship, and a tight founder batch built for startups that want to move fast from Taipei.",
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
        {
          label: "Campus Network",
          title: "ikigai Venture Scout",
          body:
            "Source standout founders on campus and connect them into the 886 network.",
          ctaLabel: "Learn more →",
          ctaHref: "/programs",
        },
        {
          label: "Coaching",
          title: "886 Velocity",
          body:
            "Sharpen your story, materials, and accelerator readiness with direct coaching.",
          ctaLabel: "Learn more →",
          ctaHref: "/programs",
        },
      ],
    },
    founders: {
      title: "Built by founders from iconic companies.",
      logos: [
        {
          name: "Twitch",
          src: "/assets/logos/twitch.svg",
          alt: "Twitch logo",
          exit: "Exit · $970M",
          title: "Twitch exit: approximately $970 million",
          imageClass: "",
        },
        {
          name: "Kabam",
          src: "/assets/logos/kabam.png",
          alt: "Kabam logo",
          exit: "Exit · $800M",
          title: "Kabam exit: approximately $800 million",
          imageClass: "",
        },
        {
          name: "RedOctane",
          src: "/assets/logos/redoctane-alt.png",
          alt: "RedOctane logo",
          exit: "Exit · $99.9M",
          title: "RedOctane exit: approximately $99.9 million",
          imageClass: "is-wide",
        },
        {
          name: "Playdom",
          src: "/assets/logos/playdom-alt.png",
          alt: "Playdom logo",
          exit: "Exit · $563.2M",
          title: "Playdom exit: approximately $563.2 million",
          imageClass: "is-wide",
        },
        {
          name: "Metatheory",
          src: "/assets/logos/metatheory.png",
          alt: "Metatheory logo",
          imageClass: "is-wide",
        },
        {
          name: "Mochi Media",
          src: "/assets/logos/mochimedia.png",
          alt: "Mochi Media logo",
          exit: "Exit · $80M",
          title: "Mochi Media exit: approximately $80 million",
          imageClass: "is-wide",
        },
        {
          name: "Orbit Baby",
          src: "/assets/logos/orbitbaby.png",
          alt: "Orbit Baby logo",
          exit: "Exit · $17.5M",
          title: "Orbit Baby exit: approximately $17.5 million",
          imageClass: "is-wide",
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
          imageClass: "",
        },
        {
          name: "Rally",
          src: "/assets/logos/rally-official.png",
          alt: "Rally logo",
          imageClass: "",
        },
        {
          name: "Tiburon Entertainment",
          src: "/assets/logos/tiburon.png",
          alt: "Tiburon Entertainment logo",
          imageClass: "",
        },
        {
          name: "Catalyte",
          src: "/assets/logos/catalyte-official.png",
          alt: "Catalyte logo",
          imageClass: "",
        },
        {
          name: "Cold Electric",
          src: "/assets/logos/cold-electric-og.png",
          alt: "Cold Electric logo",
          imageClass: "is-product",
        },
        {
          name: "New Taipei Kings",
          src: "/assets/logos/new-taipei-kings.png",
          alt: "New Taipei Kings logo",
          imageClass: "is-wide",
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
      button: "Subscribe →",
    },
  },
  programs: {
    eyebrow: "Programs",
    title: "Pick the lane that matches your momentum.",
    lead:
      "Four ways to work with 886 Studios, from direct startup acceleration to community, campus sourcing, and founder coaching.",
    items: [
      {
        featuredLabel: "Flagship program",
        track: "Accelerator",
        name: "ikigai Launchpad",
        headingLink: {
          label: "Visit Website",
          href: "https://withikigai.com/",
        },
        body:
          "A 12-week accelerator in Taipei for early-stage founders who want capital, close operator support, and the pressure-tested structure to move from idea to real traction.",
        highlights: [
          "$100K in funding",
          "Weekly office hours with partners",
          "Demo Day + investor intros",
        ],
        fit:
          "Early-stage founders who want capital, close support, and momentum.",
        cta: {
          type: "primary",
          label: "Apply Here →",
          href: "https://tally.so/r/w5p4jQ",
        },
      },
      {
        track: "Community",
        name: "Launch Station",
        body:
          "A free workspace inside Taiwan Tech Arena for founders who build better around other ambitious teams. The point is proximity: more collisions, more conversations, more forward motion.",
        highlights: ["Founder community", "Free coworking space"],
        fit: "Founders who want a Taipei base and builder energy.",
        cta: {
          type: "status",
          label: "Applications open soon",
        },
      },
      {
        track: "Campus Network",
        name: "ikigai Venture Scout",
        body:
          "A campus discovery network that finds strong student founders early and connects them into ikigai Launchpad. Scouts build venture instincts while becoming the bridge between universities and the startup ecosystem.",
        highlights: [
          "Source founders on your campus",
          "Referral compensation",
          "Access to our network",
        ],
        fit: "Students and recent grads plugged into builder communities.",
        cta: {
          type: "link",
          label: "Learn more →",
          href: "https://886studios.com/program/ikigai-venture-scout",
        },
      },
      {
        track: "Coaching",
        name: "886 Velocity",
        body:
          "Accelerator coaching for founders who want sharper applications, clearer narratives, and a stronger shot at getting into top global programs like YC.",
        highlights: [
          "Application strategy",
          "Narrative sharpening",
          "Interview prep",
        ],
        fit: "Founders applying to top accelerators and sharpening their story.",
        cta: {
          type: "status",
          label: "Details coming soon",
        },
      },
    ],
    comparison: {
      title: "Compare programs",
      lead: "A quick read on where each program fits, how much time it asks for, and what founders should expect to get out of it.",
      rows: [
        {
          featured: true,
          program: "ikigai Launchpad",
          track: "Accelerator",
          bestFor: "Early-stage founders ready for capital, structure, and close operator support.",
          commitment: "12-week accelerator",
          outcome: "$100K funding, partner mentorship, Demo Day, and investor introductions.",
          status: "Applications open",
        },
        {
          program: "Launch Station",
          track: "Community",
          bestFor: "Founders who want a Taipei base and more collisions with other builders.",
          commitment: "Flexible coworking",
          outcome: "A free workspace, founder community, and proximity to Taiwan Tech Arena.",
          status: "Opening soon",
        },
        {
          program: "ikigai Venture Scout",
          track: "Campus Network",
          bestFor: "Students and recent grads who are close to campus builder communities.",
          commitment: "Part-time scout role",
          outcome: "Venture reps, referral compensation, and access to the 886 Studios network.",
          status: "Live",
        },
        {
          program: "886 Velocity",
          track: "Coaching",
          bestFor: "Founders applying to top accelerators and tightening their story.",
          commitment: "Founder coaching",
          outcome: "Sharper applications, stronger narratives, and interview preparation.",
          status: "Details coming soon",
        },
      ],
    },
    footer:
      "All programs are designed to help founders move faster, think sharper, and build with more leverage.",
  },
  resources: {
    eyebrow: "Resources",
    title: "Tools for founders",
    lead:
      "Guides, databases, and exclusive perks for the 886 Studios community.",
    libraryTitle: "Knowledge Library",
    libraryItems: [
      {
        icon: "📚",
        title: "Y Combinator 101",
        subtitle: "Everything you need to know about YC",
      },
      {
        icon: "📄",
        title: "Incorporation 101",
        subtitle: "How to incorporate your startup",
      },
      {
        icon: "📝",
        title: "Application Guide",
        subtitle: "Write the winning accelerator app",
      },
      {
        icon: "🗺️",
        title: "Ecosystem Database",
        subtitle: "Taiwan startup ecosystem map",
      },
      {
        icon: "❓",
        title: "Founders FAQs",
        subtitle: "Common founder questions, answered",
      },
      {
        icon: "🎯",
        title: "Interview Guidebook",
        subtitle: "Nail your accelerator interview",
      },
    ],
    ama: {
      eyebrow: "Ask Me Anything",
      title: "886 AMA",
      body:
        "Your questions are addressed asynchronously by our venture partners who've encountered the same challenges. No question too basic or too specific.",
      ctaLabel: "Submit a question →",
    },
    perks: {
      eyebrow: "Exclusive Perks",
      note:
        "Unlock these perks by working with us through ikigai Launchpad or Launch Station.",
      categories: [
        {
          title: "Productivity",
          items: ["📝 Notion", "📋 Coda", "📤 DocSend", "🗂️ Miro"],
        },
        {
          title: "Finances",
          items: ["💳 Ramp", "🏦 Mercury"],
        },
        {
          title: "Marketing",
          items: ["📈 HubSpot", "🌐 Webflow"],
        },
        {
          title: "Engineering",
          items: ["☁️ AWS Activate", "🐙 GitHub"],
        },
      ],
    },
  },
  about: {
    eyebrow: "About Us",
    title: "Built by founders,<br>for founders.",
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
      { initials: "FW", name: "Freya Wu", role: "General Manager" },
      { initials: "GW", name: "Gin Wu", role: "Program & Ops Lead" },
      { initials: "CW", name: "Carter Wang", role: "Venture Associate" },
    ],
    partnersTitle: "Partners",
    partners: [
      { initials: "KH", name: "Kai Huang" },
      { initials: "JH", name: "Joseph Hei" },
      { initials: "CH", name: "Charles Huang" },
      { initials: "JH", name: "Jameson Hsu" },
      { initials: "KL", name: "Kevin Lin" },
      { initials: "KC", name: "Kevin Chou" },
      { initials: "CW", name: "Chris Wang" },
      { initials: "JH", name: "Jacob Hsu" },
      { initials: "JH", name: "James Hong" },
      { initials: "SC", name: "Steven Chiang" },
      { initials: "TC", name: "Timothy Chen" },
      { initials: "PC", name: "Phil Chen" },
    ],
  },
  events: {
    eyebrow: "Events",
    title: "What's happening",
    lead:
      "Meetups, workshops, and demo days for the 886 Studios community.",
    items: [
      {
        month: "TBD",
        day: "—",
        title: "ikigai Launchpad Demo Day",
        meta: "Taipei, Taiwan · Taiwan Tech Arena",
        tag: "Flagship",
      },
      {
        month: "TBD",
        day: "—",
        title: "Founder Fireside Chat",
        meta: "Taiwan Tech Arena · Taipei",
        tag: "Community",
      },
      {
        month: "TBD",
        day: "—",
        title: "YC Application Workshop",
        meta: "Online · Open to all founders",
        tag: "Workshop",
      },
      {
        month: "TBD",
        day: "—",
        title: "886 Studios Networking Night",
        meta: "Taipei · Founders + Investors",
        tag: "Networking",
      },
    ],
    note: "More events coming soon. Follow us on X @886Studios for updates.",
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
      submitLabel: "Submit Application →",
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
      button: "Send Message →",
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
      buttonLabel: "Visit ikigai Launchpad →",
      buttonHref: "https://withikigai.com/",
    },
  },
  footer: {
    copy: "@ 886 Studios 2026",
  },
};
