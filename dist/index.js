var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// chatButton/index.js
var require_chatButton = __commonJS({
  "chatButton/index.js"(exports, module2) {
    module2.exports = function(context) {
      return {
        name: "inkeep-chat-button",
        injectHtmlTags: () => {
          const inkeepFn = function() {
            if (!inkeepConfig) {
              throw new Error("Docusaurus config lacks inkeep config");
            }
            let inkeepWidget = null;
            const observer = new MutationObserver((mutationsList) => {
              const chatButtonContainer = document.getElementById("inkeepChatButton");
              chatButtonContainer.style.position = "absolute";
              const currentTheme = document.documentElement.dataset.theme;
              const isRender = !inkeepWidget && chatButtonContainer;
              const config = {
                componentType: "ChatButton",
                targetElement: chatButtonContainer,
                properties: {
                  baseSettings: {
                    ...inkeepConfig.baseSettings,
                    theme: {
                      colorMode: {
                        forcedColorMode: inkeepConfig.toggleColorMode ? currentTheme : null
                      }
                    }
                  },
                  modalSettings: inkeepConfig.modalSettings,
                  searchSettings: inkeepConfig.searchSettings,
                  aiChatSettings: inkeepConfig.aiChatSettings
                }
              };
              if (isRender)
                inkeepWidget = Inkeep().embed(config);
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
                              forcedColorMode: colorMode
                            }
                          }
                        }
                      }
                    });
                  }
                  ;
                }
                ;
              }
              ;
            });
            observer.observe(document.documentElement, { attributes: true });
          };
          return {
            headTags: [
              {
                tagName: "script",
                attributes: {
                  src: "https://unpkg.com/@inkeep/widgets-embed@latest/dist/embed.js",
                  type: "module",
                  defer: true
                }
              }
            ],
            postBodyTags: [
              `
        <script defer>    
          const inkeepConfig = ${JSON.stringify(
                context.siteConfig.customFields.inkeepConfig
              )};
          (${inkeepFn.toString()})()
        </script>

        <div id='inkeepChatButton'></div>`
            ]
          };
        }
      };
    };
  }
});

// searchBar/index.js
var require_searchBar = __commonJS({
  "searchBar/index.js"(exports, module2) {
    module2.exports = function(context) {
      return {
        name: "inkeep-search-bar",
        injectHtmlTags: () => {
          const inkeepFn = function() {
            if (!inkeepConfig) {
              throw new Error("Docusaurus config lacks inkeep config");
            }
            let inkeepWidget = null;
            const observer = new MutationObserver((mutationsList) => {
              const searchBarContainer = document.getElementById("inkeepSearchBar");
              const currentTheme = document.documentElement.dataset.theme;
              const isRender = !searchBarContainer.childNodes.length || searchBarContainer && !inkeepWidget;
              const config = {
                componentType: "SearchBar",
                targetElement: searchBarContainer,
                properties: {
                  baseSettings: {
                    ...inkeepConfig.baseSettings,
                    theme: {
                      colorMode: {
                        forcedColorMode: inkeepConfig.toggleColorMode ? currentTheme : null
                      }
                    }
                  },
                  modalSettings: inkeepConfig.modalSettings,
                  searchSettings: inkeepConfig.searchSettings,
                  aiChatSettings: inkeepConfig.aiChatSettings
                }
              };
              if (isRender)
                inkeepWidget = Inkeep().embed(config);
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
                              forcedColorMode: colorMode
                            }
                          }
                        }
                      }
                    });
                  }
                }
              }
              ;
            });
            observer.observe(document.documentElement, { attributes: true });
          };
          return {
            headTags: [
              {
                tagName: "script",
                attributes: {
                  src: "https://unpkg.com/@inkeep/widgets-embed@0.2.226/dist/embed.js",
                  type: "module",
                  defer: true
                }
              }
            ],
            postBodyTags: [
              `
          <script defer>    
            const inkeepConfig = ${JSON.stringify(
                context.siteConfig.customFields.inkeepConfig
              )};
            (${inkeepFn.toString()})()
          </script>
 `
            ]
          };
        },
        getThemePath: () => "./src/theme",
        getTypeScriptThemePath: () => "./src/theme",
        getSwizzleComponentList: () => ["SearchBar"]
      };
    };
  }
});

// index.js
var doc_plugin_exports = {};
__export(doc_plugin_exports, {
  chatButton: () => chatButton,
  searchBar: () => searchBar
});
module.exports = __toCommonJS(doc_plugin_exports);
var chatButton = __toESM(require_chatButton());
var searchBar = __toESM(require_searchBar());
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  chatButton,
  searchBar
});
