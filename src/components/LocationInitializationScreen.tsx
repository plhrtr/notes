import { MdIcon } from "@material_web_componponents/Icon";
import {
  MdCircularProgress,
  MdLinearProgress,
} from "@material_web_componponents/ProgressIndicators";
import Location from "@model/Location";
import { useState } from "react";

export default function LocationInitializationScreen() {
  const location = Location.getInstance();

  const [position, setPosition] = useState<null | GeolocationPosition>(null);
  location.subscribe("currentLocation", (position) => setPosition(position));

  const [error, setError] = useState<null | string>(null);
  location.connect("no-permission", () =>
    setError("No permission to use the devices location"),
  );
  location.connect("unsupported-device", () =>
    setError("Your device is unsupported"),
  );
  location.connect("error-fetching-location", () =>
    setError("An unexpected error occured fetching your location"),
  );

  const loadingScreen = (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-lg font-bold">Initializing location</p>
      <MdLinearProgress indeterminate className="w-full" />
    </div>
  );

  const errorDisplay = (
    <div className="w-full flex flex-col justify-center items-center">
      <MdIcon>error</MdIcon>
      <div>{error}</div>
    </div>
  );

  return (
    <>
      {position == null && (
        <div className="px-4 py-2 bg-surface-container-highest rounded-xl border border-outline-variant">
          {error ? errorDisplay : loadingScreen}
        </div>
      )}
    </>
  );
}
