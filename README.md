## Instructions

To run the application (both frontend and backend), run `yarn dev`.

## Considerations

- This application is only meant to be run locally
- This application makes calls to the Google Cloud Translate API. You will need to [get your own credentials/private key](https://cloud.google.com/translate/docs/quickstart-client-libraries) and make necessary changes in [lines 16-22 of `server.js`](https://github.com/JustinAMason/english-translator/blob/c5cbf2a1921c2bed44ec0b14808eef11e17ead1b/server.js#L16-L22).
- This application will create a local Mongo database named `translator`, and will create/add to collections named `languages` and `translations`

## Backend Logic

Since this is a single page application, the responsibility of `server.js` is to handle detecting the language and translating the current input.

- Detecting the language of the input
    - The input exists in the `languages` collection
        - Get the languge from the collection
    - The input does *not* exist in the `languages` collection
        - Get the language from a call to the Google Cloud Translate API
        - Update the `languages` collection

- Translating the input
    - The input exists in the `translations` collection
        - Get the translation from the collection
    - The input does *not* exist in the `translations` collection
        - Get the translation from a call to the Google Cloud Translate API
        - Update the `translations` collection

## Special Thanks / External Resources

["How to get create-react-app to work with a Node.js back-end API"](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0) by Esau Silva (freeCodeCamp)