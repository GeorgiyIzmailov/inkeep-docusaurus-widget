function listenerFunction ({inkeepConfig, componentType, chatButtonType, stylesheetUrls, stylesheets}) {
    if (!inkeepConfig) {
      throw new Error("Docusaurus config lacks inkeep config");
    }

    let inkeepWidget = null;
    const isChatButtonType = componentType === 'ChatButton';

    const inkeepSearchBar = document.getElementById('inkeepSearchBar');
    const inkeepChatButton = document.getElementById('inkeepChatButton');

    const shortcutEnable = inkeepSearchBar && inkeepChatButton

    const observer = new MutationObserver((mutationsList) => { 
      const inkeepWidgetContainer = document.getElementById(!isChatButtonType ? 'inkeepSearchBar' : 'inkeepChatButton');
      
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
          chatButtonType,
          baseSettings: {
            ...inkeepConfig.baseSettings,
            theme: {
              colorMode: {
                forcedColorMode: inkeepConfig.toggleColorMode ? currentTheme : inkeepConfig.baseSettings?.theme?.colorMode?.forcedColorMode,
              },
            },
          },
          modalSettings: {
            ...inkeepConfig.modalSettings,
            areOpenHotKeysDisabled: inkeepConfig.switchShortcutTarget ? !shortcutEnable : shortcutEnable || inkeepConfig.modalSettings.areOpenHotKeysDisabled,
          },
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