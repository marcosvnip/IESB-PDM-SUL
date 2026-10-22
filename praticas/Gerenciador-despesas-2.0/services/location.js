import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
  const position = await Location.getCurrentPositionAsync({});
  const [address] = await Location.reverseGeocodeAsync(position.coords);
  const label = address
    ? [address.street, address.district, address.city].filter(Boolean).join(', ')
    : `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
  return { ...position.coords, label };
}
