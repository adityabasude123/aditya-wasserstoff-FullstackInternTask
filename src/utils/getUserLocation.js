
// get the user location to get weather detail's
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve( position);
        },
        (error) => {
          reject( error);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};
