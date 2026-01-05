import { MdIcon } from "@material_web_componponents/Icon";
import LocationInitializationScreen from "components/LocationInitializationScreen";
import NotesOverview from "components/NotesOverview";

function App() {
  return (
    <div className="flex justify-center">
      <div className="h-dvh flex flex-col gap-4 w-full sm:w-3/4 lg:w-1/2">
        <h1 className="m-0 my-2 text-center items-center flex gap-2 justify-center">
          Notes
          <MdIcon className="text-primary-fixed-dim">Note_Stack</MdIcon>
        </h1>
        <LocationInitializationScreen />
        <NotesOverview />
      </div>
    </div>
  );
}

export default App;
