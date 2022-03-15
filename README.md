# Starter template repository
- make sure you have node `16.13.1` installed: `nvm install 16.13.1` & `nvm alias default 16.13.1`
- `bash instal.sh`
- edit `site/.env.local` with the proper values for the new project
- `yarn workspace site dev`

# Importing colors in the project
- open https://colorbox.io/
- import `/site/workflow/colorbox.json` using the UI
- tweak the colors
- export the JSON and paste it into `/site/workflow/colorbox.json`
- run the project and copy the colors from the console into `/site/styles/theme.css.ts` => `baseColors`
