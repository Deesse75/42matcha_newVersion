async function getBrowserLocation(): Promise<GeolocationPosition> {
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
}

async function setLocation(url: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('error');
    const data = await response.json();
    localStorage.setItem('region', data.address.state);
    localStorage.setItem('county', data.address.county || data.address.city);
    localStorage.setItem(
      'town',
      data.address.city
        ? data.address.city
        : data.address.town
          ? data.address.town
          : data.address.village,
    );
  } catch (error) {
    throw error;
  }
}

async function getIpLocation(
  url: string,
): Promise<{ lat: number; lon: number } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    return {
      lat: data.lat,
      lon: data.lon,
    };
  } catch (error) {
    return null;
  }
}

export async function getLocation(): Promise<void> {
  try {
    const loc = await getBrowserLocation();
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}`;
    await setLocation(url);
  } catch (error) {
    try {
      const loc: { lat: number; lon: number } | null = await getIpLocation(
        'http://ip-api.com/json',
      );
      if (loc) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.lat}&lon=${loc.lon}`;
        await setLocation(url);
      }
    } catch (error) {
      return;
    }
  }
}
