import { MdIcon } from "@material_web_componponents/Icon";
import { MdFilledIconButton } from "@material_web_componponents/IconButtons";
import Location from "@model/Location";
import NoteManager from "@model/NoteManager";
import type NoteModel from "@model/NoteModel";
import { calculateDistance } from "@model/util/LocationUtil";
import { useState } from "react";

/**
 * Widget to display a single note
 */
export default function Note({ note }: { note: NoteModel }) {
  const noteManger = NoteManager.getInstance();
  const location = Location.getInstance();

  const [distance, setDistance] = useState<null | number>(
    location.currentLocation == null
      ? null
      : calculateDistance(location.currentLocation, note.location),
  );

  location.subscribe("currentLocation", (position) =>
    setDistance(calculateDistance(position, note.location)),
  );

  return (
    <div className="bg-surface-container p-4 rounded-xl flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="m-0 text-xl">{note.title}</h1>
          {distance != null ? (
            <div className="rounded-xl bg-primary-fixed-dim p-2 font-bold text-on-primary-fixed">
              {distance > 1000
                ? Math.floor(distance / 1000) + "km"
                : Math.floor(distance) + "m"}
            </div>
          ) : (
            <div className="w-12 h-8 bg-surface-container-highest rounded-xl animate-pulse" />
          )}
        </div>

        <MdFilledIconButton
          className="danger"
          onClick={() => noteManger.removeNote(note.id)}
        >
          <MdIcon>Delete</MdIcon>
        </MdFilledIconButton>
      </div>
      <p className="text-on-surface/70">{note.description}</p>
    </div>
  );
}
