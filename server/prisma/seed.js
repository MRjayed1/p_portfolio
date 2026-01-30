const prisma = require('../lib/prisma');

const myProjects = [
  {
    title: "E-commerce Platform",
    description:
      "Facilitates purchases from international websites like Amazon and eBay, allowing customers to shop from these sites and have products delivered domestically.",
    subDescription: [
      "Built a scalable application with ASP.NET Core MVC, integrating global platforms like Amazon for domestic delivery.",
      "Implemented secure authentication and database management using ASP.NET Core Identity and Entity Framework Core.",
      "Designed a responsive frontend with Tailwind CSS, enhancing user experience.",
      "Added payment systems, localization, and product filtering for functionality improvements.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/accessories.jpg",
    tags: [
      { name: "C#", path: "/assets/logos/csharp.svg" },
      { name: ".Net", path: "/assets/logos/dotnet.svg" },
      { name: "Ef Core", path: "/assets/logos/efcore.png" },
      { name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
  {
    title: "Authentication & Authorization System",
    description:
      "A secure authentication and authorization system using Auth0 for seamless user management.",
    subDescription: [
      "Integrated Auth0 for authentication, supporting OAuth, JWT, and multi-factor authentication.",
      "Implemented role-based access control (RBAC) for fine-grained user permissions.",
      "Developed a React-based frontend with Tailwind CSS for a sleek user experience.",
      "Connected to a secure SQLite database for user data storage.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/auth-system.jpg",
    tags: [
      { name: "Auth0", path: "/assets/logos/auth0.svg" },
      { name: "React", path: "/assets/logos/react.svg" },
      { name: "SQLite", path: "/assets/logos/sqlite.svg" },
      { name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
  {
    title: "Blazor Web App",
    description:
      "A modern, interactive web application built with Blazor WebAssembly and .NET Core.",
    subDescription: [
      "Developed a fully interactive Single Page Application (SPA) using Blazor WebAssembly.",
      "Implemented API interactions using .NET Core for a robust backend.",
      "Designed responsive UI components with Tailwind CSS for an enhanced UX.",
      "Integrated SQLite for efficient client-side database storage.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/blazor-app.jpg",
    tags: [
      { name: "Blazor", path: "/assets/logos/blazor.svg" },
      { name: ".NET Core", path: "/assets/logos/dotnetcore.svg" },
      { name: "SQLite", path: "/assets/logos/sqlite.svg" },
      { name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
  {
    title: "C++ Game Engine",
    description:
      "A lightweight C++ game engine designed for 2D and 3D game development.",
    subDescription: [
      "Built a powerful rendering engine using OpenGL and C++.",
      "Developed a physics engine with collision detection and particle effects.",
      "Implemented a scripting system for easy game customization.",
      "Optimized performance with multi-threading and efficient memory management.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/game-engine.jpg",
    tags: [
      { name: "C++", path: "/assets/logos/cplusplus.svg" },
      { name: "C#", path: "/assets/logos/csharp.svg" },
      { name: "Git", path: "/assets/logos/git.svg" },
      { name: "Microsoft", path: "/assets/logos/microsoft.svg" },
    ],
  },
  {
    title: "WordPress Custom Theme",
    description:
      "A fully customizable WordPress theme optimized for performance and SEO.",
    subDescription: [
      "Developed a responsive WordPress theme using HTML5, CSS3, and JavaScript.",
      "Integrated Tailwind CSS for modern styling and UI enhancements.",
      "Optimized SEO and page speed using Vite.js for fast builds.",
      "Implemented custom widgets and plugin compatibility for extended functionality.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/wordpress-theme.jpg",
    tags: [
      { name: "WordPress", path: "/assets/logos/wordpress.svg" },
      { name: "HTML5", path: "/assets/logos/html5.svg" },
      { name: "CSS3", path: "/assets/logos/css3.svg" },
      { name: "Vite.js", path: "/assets/logos/vitejs.svg" },
    ],
  },
  {
    title: "Online Learning Platform",
    description:
      "A web application that allows users to enroll in courses, watch video lectures, and take quizzes.",
    subDescription: [
      "Built using Blazor WebAssembly for a seamless SPA experience.",
      "Implemented video streaming with Azure Media Services.",
      "Added a quiz system with dynamic question generation and real-time grading.",
      "Integrated Stripe API for secure payment processing.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/elearning.jpg",
    tags: [
      { name: "Blazor", path: "/assets/logos/blazor.svg" },
      { name: "Azure", path: "/assets/logos/azure.svg" },
      { name: "Stripe", path: "/assets/logos/stripe.svg" },
      { name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
];

const mySocials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sknoyon143?igsh=cmVjYzVvbjBtOXFt",
    icon: "/assets/socials/instagram.svg",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/8801756078152",
    icon: "/assets/socials/whatsApp.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/sheikh-jayed-ahmed-noyon08",
    icon: "/assets/socials/linkedIn.svg",
  },
];

const experiences = [
  {
    title: "Software Developer",
    company: "Security & Defense Projects",
    date: "2021-2023",
    contents: [
      "Enhanced application security and developed new features, adhering to standards set by the Passive Defense Organization and National Cyberspace Center.",
      "Designed and implemented intuitive map interfaces using MapsUI, enhancing user experience and enabling seamless interactive map integration.",
      "Developed applications for industrial automation, leveraging C++ and the Fatek API for PLC communication.",
      "Enhanced responsiveness and usability of applications using Windows Forms and WPF frameworks.",
      "Executed XML to SVG conversions using X-DOM, ensuring dynamic and efficient data visualization.",
    ],
  },
  {
    title: "Back-End Developer",
    company: "Car Manufacture",
    date: "2023-2024",
    contents: [
      "Engineered systems for large-scale data ingestion and analysis, ensuring efficient data processing and storage.",
      "Developed back-end systems enabling vehicle-to-cloud communication for telemetry, diagnostics, and remote control:",
      "✅ Implemented secure APIs, following ISO 26262 automotive safety standards.",
      "✅ Ensured data privacy for customers and partners through industry-compliant protocols.",
      "✅ Delivered remote features like over-the-air updates, real-time tracking, and remote start capabilities.",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    date: "2025-Present",
    contents: [
      "Created a personal portfolio using Three.js, React, Vite, and WebAPI to showcase technical expertise.",
      "Continuously enhancing technical skills and expanding expertise in modern web development and back-end technologies.",
    ],
  },
];

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://robohash.org/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://robohash.org/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://robohash.org/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "This is hands down the best thing I've experienced. Highly recommend!",
    img: "https://robohash.org/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Incredible work! The attention to detail is phenomenal.",
    img: "https://robohash.org/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "This exceeded all my expectations. Absolutely stunning!",
    img: "https://robohash.org/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Simply breathtaking. The best decision I've made in a while.",
    img: "https://robohash.org/dave",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "So glad I found this. It has changed the game for me.",
    img: "https://robohash.org/eve",
  },
];

async function main() {
  console.log('Seeding database...');

  // About
  // Check if exists
  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        name: "Sheikh Jayed Ahmed Noyon",
        title: "Hi, I'm Sheikh Jayed Ahmed Noyon",
        subTitle: "Over more than last 2 years, I developed my frontend and backend dev skills to deliver dynamic and software and web applications.",
        image: "assets/coding-pov.png",
        location: "Mars",
        email: "your.email@example.com",
      },
    });
  }

  // Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    for (const project of myProjects) {
      const { tags, ...projectData } = project;
      await prisma.project.create({
        data: {
          ...projectData,
          tags: {
            create: tags.map(tag => ({
              name: tag.name,
              path: tag.path,
            })),
          },
        },
      });
    }
  }

  // Socials
  const socialCount = await prisma.social.count();
  if (socialCount === 0) {
    for (const social of mySocials) {
      await prisma.social.create({
        data: social,
      });
    }
  }

  // Experiences
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    for (const exp of experiences) {
      await prisma.experience.create({
        data: exp,
      });
    }
  }

  // Testimonials
  const reviewCount = await prisma.testimonial.count();
  if (reviewCount === 0) {
    for (const review of reviews) {
      await prisma.testimonial.create({
        data: review,
      });
    }
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
