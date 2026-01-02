import { Observable } from "./util/Observable";

type LocationSignals =
  | "no-permission"
  | "unsupported-device"
  | "error-fetching-location";

type LocationProperties = {
  currentLocation: GeolocationPosition;
};

/**
 * Class which wraps the geolocation API of the browser.
 * Provides the current position of the user.
 * Sends signals when device is unsupported, no permission is set or an error occurred.
 */
export default class Location extends Observable<
  LocationProperties,
  LocationSignals
> {
  private static instance: Location | null = null;

  currentLocation: GeolocationPosition | null = null;

  constructor() {
    super();
    this.requestLocation();
  }

  public static getInstance(): Location {
    if (!Location.instance) {
      Location.instance = new Location();
    }
    return Location.instance;
  }

  private requestLocation() {
    if (!navigator.geolocation) {
      this.notify("unsupported-device");
      return;
    }

    this.checkPermission().then((permission) => {
      if (!permission) {
        this.notify("no-permission");
      }
    });

    navigator.geolocation.watchPosition(
      (position) => {
        this.currentLocation = position;
      },
      () => {
        this.checkPermission().then((permission) => {
          if (!permission) {
            this.notify("no-permission");
          } else {
            this.notify("error-fetching-location");
          }
        });
      },
      {
        enableHighAccuracy: false,
        maximumAge: 60000,
      },
    );
  }

  private async checkPermission() {
    const result = await navigator.permissions?.query({
      name: "geolocation" as PermissionName,
    });

    return !(result.state === "denied");
  }
}
