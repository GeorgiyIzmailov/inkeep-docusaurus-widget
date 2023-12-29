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
    name: "inkeep-chat-button",
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
        <script defer>    
          const inkeepConfigChatButton = ${JSON.stringify(inkeepConfig)};
          const { chatButtonType } = inkeepConfigChatButton;
          (${listenerFunction.toString()})({inkeepConfig: inkeepConfigChatButton, componentType: 'ChatButton', chatButtonType})
        </script>\n
        <div id='inkeepChatButton'></div>`,
        ],
      };
    },
  };
};
