# Face Shape App

En minimal Next.js-app för att ladda upp en bild och på sikt analysera ansiktsform.

## Kör lokalt

1. Installera beroenden: `npm install`
2. Starta utvecklingsserver: `npm run dev`

## Face Mesh-läge

1. Starta utvecklingsservern: `npm run dev`
2. Öppna appen i webbläsaren.
3. Ladda upp en bild – MediaPipe Face Mesh körs direkt i webbläsaren och ritar ut ansiktslandmärken på ett canvas ovanpå bilden.
4. Om inget ansikte hittas visas ett felmeddelande.

## Nästa steg

- Lägg till heuristik för att avgöra ansiktsform.
