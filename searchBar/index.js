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
          <div id='inkeepSearchBar'></div>
          <script defer>    
            const inkeepConfig = ${JSON.stringify(
              context.siteConfig.customFields.inkeepConfig
            )};
            const { stylesheetUrls, stylesheets } = inkeepConfig;

            (${listenerFunction.toString()})(inkeepConfig, 'SearchBar', stylesheetUrls, stylesheets)
          </script>\n
          <script>
            (() => {
              const inkeepWidgetContainer = document.getElementById("inkeepSearchBar");

              const observer = new MutationObserver((mutationsList) => { 
                const inkeep = document.getElementById('inkeep');
               
                if(inkeep) {
                  inkeep.appendChild(inkeepWidgetContainer)
                }    
            
              });
          
              observer.observe(document.documentElement, { attributes: true });
            })()
          </script>
          `,
        ],
      };
    },
    getThemePath: () => "./src/theme",
    getTypeScriptThemePath: () => "./src/theme",
    getSwizzleComponentList: () => ["SearchBar"],
  };
};
