const { listenerFunction } = require("../shared/listener");

module.exports = function (context) {
  return {
    name: "inkeep-search-bar",
    injectHtmlTags: () => {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              src: "https://unpkg.com/@inkeep/widgets-embed@latest/dist/embed.js",
              type: "module",
              defer: true,
            },
          },
        ],
        postBodyTags: [
          `
          <script defer>    
            const inkeepConfig = ${JSON.stringify(
              context.siteConfig.customFields.inkeepConfig
            )};
            (${listenerFunction.toString()})(inkeepConfig, 'SearchBar', inkeepConfig?.stylesheetUrls)
          </script>\n `,
        ],
      };
    },
    getThemePath: () => "./src/theme",
    getTypeScriptThemePath: () => "./src/theme",
    getSwizzleComponentList: () => ["SearchBar"],
  };
};
