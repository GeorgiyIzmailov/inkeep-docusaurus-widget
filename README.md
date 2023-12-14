## Installation

1. Clone repo
    ```sh
   git clone https://github.com/GeorgiyIzmailov/inkeep-docusaurus-widget.git
   ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create symlink a package folder
    ```sh
    npm link
    ```

## Usage

To test the package you need to locally deploy the docusaurus project version 2.

-  Initialize the docusaurus project
    ```sh
    npx create-docusaurus@latest my-website classic --typescript
    ```
-  Install our custom package 
     ```sh
    npm link @inkeep/docusaurus
    ```

Add the code shown below to ```docusaurus.config``` to connect the plugin to docusaurus:

For ChatButton component type:

```sh
     themes: ["@inkeep/docusaurus/chatButton"],
```

For SearchBar component type:

```sh
     themes: ["@inkeep/docusaurus/searchBar"],
```

Customize your widget's config (Example shown below):

```sh
//..
    customFields: {
        inkeepConfig: {
            // stylesheetUrls: ['/path/to/stylesheets'], // optional for search bar
            // stylesheets: [<link key="my-stylesheet-key" rel="stylesheet" href="path-to-my-stylesheet.css" /> ], // optional for search bar
            baseSettings: {
                apiKey: "apiKey",
                integrationId: "integrationId",
                organizationId: "organizationId",
                primaryBrandColor: "#522FC9", // your brand color, widget color scheme is derived from this
                organizationDisplayName: "Inkeep",
                // ...optional settings
            },
            modalSettings: {
                // optional settings
            },
            searchSettings: {
                // optional settings
            },
            aiChatSettings: {
                // optional settings
                defaultChatMode: "TURBO",
                botAvatarSrcUrl: "img/logo.svg", // use your own bot avatar
                quickQuestions: [
                "Example question 1?",
                "Example question 2?",
                "Example question 3?",
                ],
            },
            toggleColorMode: false, // unique to docusaurus integration
        }
    },
```


