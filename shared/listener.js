function listenerFunction (inkeepConfig, componentType, stylesheetUrls, stylesheets) {
    if (!inkeepConfig) {
      throw new Error("Docusaurus config lacks inkeep config");
    }

    let inkeepWidget = null;
    const isChatButtonType = componentType === 'ChatButton';

    const observer = new MutationObserver((mutationsList) => { 
      const inkeepWidgetContainer = document.getElementById(!isChatButtonType ? "inkeepSearchBar" : 'inkeepChatButton');
      
      if(isChatButtonType) {
        inkeepWidgetContainer.style.position = 'absolute';
      }

      const currentTheme = document.documentElement.dataset.theme;
      const isRender = !inkeepWidget && inkeepWidgetContainer;

      const config = {
        componentType,
        targetElement: inkeepWidgetContainer,
        properties: {
          stylesheetUrls,
          stylesheets,
          baseSettings: {
            ...inkeepConfig.baseSettings,
            theme: {
              colorMode: {
                forcedColorMode: inkeepConfig.toggleColorMode ? currentTheme : inkeepConfig.baseSettings?.theme?.colorMode?.forcedColorMode,
              },
            },
          },
          modalSettings: inkeepConfig.modalSettings,
          searchSettings: inkeepConfig.searchSettings,
          aiChatSettings: inkeepConfig.aiChatSettings,
        },
      };

      if(isRender) inkeepWidget = Inkeep().embed(config);

      if (inkeepConfig.toggleColorMode) {
        for (let mutation of mutationsList) {
          if (mutation.attributeName === "data-theme") {
            let colorMode = mutation.target.dataset.theme;
            inkeepWidget.render({
              ...config.properties,
              properties: {
                baseSettings: {
                  ...config.properties.baseSettings,
                  theme: {
                    colorMode: {
                      forcedColorMode: colorMode,
                    },
                  },
                },
              },
            });
          }
        }
      };
    });

    observer.observe(document.documentElement, { attributes: true });
  };

module.exports = {
    listenerFunction
}