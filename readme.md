# IMPORTANT NOTES:

## .url working prototype

http://lisbononwheels.eu

## .env

- Momenteel zijn er geen env-variabelen in het project. Indien deze worden aangemaakt, moeten deze ook bij in de docker file (zie comment) gezet worden!

## OpenStreetMap - open data

- Comments on the 'setup' of the OpenStreetMap / leaflet are in the 'StreetMap' component. This is more clear. This is a basic setup with mockdata and markers provided by the design, be aware that the mockdata might differ from the final api-response!
- All data is stored in OpenStreetMap: https://www.openstreetmap.org/#map=15/38.7147/-9.1428

## Localization

- nl and en are added since the design had both mixed. Update the Json files under src/localization/locales
