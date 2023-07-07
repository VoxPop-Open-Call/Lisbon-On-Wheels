import { FC, memo } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { bounds } from '../../utils/helpers';
import { TCategory, TPOI } from '../../types/types';
import { MARKERS } from '../../assets/markers/markerSVGs';
import { POIPropertyName } from '../../utils/poiUtils';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useTranslation } from 'react-i18next';

type Props = {
  poiList: TPOI[];
};

const StreetMap: FC<Props> = memo(({ poiList: locations }) => {
  const { t } = useTranslation();

  const latLngArr: [number, number][] = locations.map(
    (poi) => [poi.location.latitude, poi.location.longitude] as [number, number]
  );
  const backupLatLngArr = [
    [bounds.minLatitude, bounds.minLongitude],
    [bounds.maxLatitude, bounds.maxLongitude]
  ] as [number, number][];

  const getMarkerIcon = (category: TCategory) => {
    return L.divIcon({
      html: MARKERS[category],
      className: 'dummy',
      iconSize: [24, 40],
      iconAnchor: [12, 40]
    });
  };

  const propertiesToExclude: (keyof TPOI)[] = ['location', 'version', 'id', 'changeset', 'name'];

  return (
    <MapContainer
      scrollWheelZoom
      bounds={new L.LatLngBounds(latLngArr.length > 0 ? latLngArr : backupLatLngArr)}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: 10,
        minHeight: '50%',
        minWidth: '33.33%'
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        maxNativeZoom={19}
      />
      <MarkerClusterGroup chunkedLoading disableClusteringAtZoom={18}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.location.latitude, location.location.longitude]}
            icon={getMarkerIcon(location.category)}
          >
            <Popup position={[location.location.latitude, location.location.longitude]}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minWidth: 300,
                  overflow: 'auto'
                }}
              >
                {location.name && (
                  <Typography variant="h6" component="h3">
                    {t('STREETMAP.NAME')}: {location.name}
                  </Typography>
                )}
                {Object.keys(location)
                  .filter((property) => !propertiesToExclude.includes(property as keyof TPOI))
                  .map((property) => {
                    return (
                      <Box
                        key={property}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          height: 36
                        }}
                      >
                        <Typography>{POIPropertyName[property]}: </Typography>
                        <Typography>{location[property as keyof TPOI].toString()}</Typography>
                      </Box>
                    );
                  })}
              </Box>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
});

export { StreetMap };
