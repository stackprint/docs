module.exports = {
  title: "Stackprint",
  tagline: "Build REST APIs in minutes without writing any code",
  url: "https://docs.stackprint.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "stackprint", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  themeConfig: {
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",
      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,
      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Stackprint",
      logo: {
        alt: "Stackprint Logo",
        src: "img/icon.svg",
      },
      items: [
        {
          to: "/",
          label: "Docs",
          position: "left",
          target: "_self",
          activeBasePath: "/",
        },
        {
          href: "https://github.com/stackprint/docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Stackprint",
          items: [
            {
              label: "Home",
              to: "https://stackprint.io",
            },
            {
              label: "Blog",
              to: "https://stackprint.io/blog",
            },
            {
              label: "Pricing",
              href: "https://stackprint.io/pricing",
            },
            {
              label: "Console",
              href: "https://console.stackprint.io",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/stackprint",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/stackprintio",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Terms of Service",
              href: "https://stackprint.io/terms",
            },
            {
              label: "Privacy Policy",
              href: "https://stackprint.io/privacy",
            },
            {
              label: "Cookie Policy",
              href: "https://stackprint.io/cookies",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Stackprint. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          homePageId: "welcome",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/stackprint/docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
