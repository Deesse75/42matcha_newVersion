import Cookies from 'js-cookie';

const getGeoloc = async (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        position.coords.latitude, position.coords.longitude, resolve(position);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

async function getCountryByGeoloc(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('error');
    const data = await response.json();
    return data.address.state;
  } catch (error) {
    throw error;
  }
}

async function getCountryByIp(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) return 'ko';
    const data = await response.json();
    return data.regionName;
  } catch (error) {
    return 'ko';
  }
}

export async function getCountry(): Promise<void> {
  let country: string = '';
  let url: string = '';
  try {
    const loc = await getGeoloc();
    url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`;
    country = await getCountryByGeoloc(url);
  } catch (error) {
    url = 'http://ip-api.com/json';
    try {
      country = await getCountryByIp(url);
    } catch (error) {
      return;
    }
  }
  if (country === 'ko') return;
  Cookies.set('Geoloc', country, {
    expires: undefined,
    sameSite: 'None',
    secure: true,
  });
}
