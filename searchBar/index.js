const { listenerFunction } = require("../shared/listener");
const { DEFAULT_WIDGET_VERSION } = require("../shared/consts");

module.exports = function (context) {
  const {
    siteConfig: {
      customFields: { inkeepConfig },
    },
  } = context;
  const { version = DEFAULT_WIDGET_VERSION } = inkeepConfig;

  return {
    name: "inkeep-search-bar",
    injectHtmlTags: () => {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              src: `https://unpkg.com/@inkeep/widgets-embed@${version}/dist/embed.js`,
              type: "module",
              defer: true,
            },
          },
        ],
        postBodyTags: [
          `
          <div id='inkeepSearchBar'></div>
          <script defer>
            const inkeepConfigSearchBar = ${JSON.stringify(inkeepConfig)};
            const { stylesheetUrls, stylesheets } = inkeepConfigSearchBar;

            (${listenerFunction.toString()})(inkeepConfigSearchBar, 'SearchBar', stylesheetUrls, stylesheets)
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
