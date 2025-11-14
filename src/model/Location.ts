import { calculateDistance } from "./util/LocationUtil";
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
  private static MIN_LOCATION_DELTA = 10;

  currentLocation: GeolocationPosition | null = null;

  constructor() {
    super();
    this.requestLocation();
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
        if (
          this.currentLocation &&
          calculateDistance(position, this.currentLocation) >
            Location.MIN_LOCATION_DELTA
        )
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
    );
  }

  private async checkPermission() {
    const result = await navigator.permissions?.query({
      name: "geolocation" as PermissionName,
    });

    return !(result.state === "denied");
  }
}
