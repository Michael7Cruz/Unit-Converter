import { useEffect, useState } from "react"
import useGetUnits from "./hooks/useGetUnits.tsx"
import UnitsList from "./components/UnitsList.tsx"
import Length from "./components/Length";
import Weight from "./components/Weight";
import Temperature from "./components/Temperature";

function App() {
  const { items, lengthUnits, weightUnits, temperatureUnits } = useGetUnits();

  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    console.log(selectedItem);
  }

  return (
    <>
      <div className="container text-center px-5">
        <UnitsList items={items} onSelectItem={handleSelectItem}/>
        {selectedItem === "length" && (
          <Length itemSelected={selectedItem} defaultFromUnit="meter" defaultToUnit="meter" unitOptions={lengthUnits} />
        )}
        {selectedItem === "weight" && (
          <Weight itemSelected={selectedItem} defaultFromUnit="gram" defaultToUnit="gram" unitOptions={weightUnits} />
        )}
        {selectedItem === "temperature" && (
          <Temperature itemSelected={selectedItem} defaultFromUnit="celsius" defaultToUnit="celsius" unitOptions={temperatureUnits} />
        )}
      </div>
    </>
  )
}

export default App