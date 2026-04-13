import { useEffect, useState } from "react"
import useGetUnits from "./hooks/useGetUnits.tsx"
import ListGroup from "./components/ListGroup"
import Alert from "./components/Alert"
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
      <Alert>Select a unit type</Alert>
      <ListGroup items={items} heading="Unit Types" onSelectItem={handleSelectItem}/>
      {selectedItem === "length" && (
        <Length itemSelected={selectedItem} defaultFromUnit="meter" defaultToUnit="meter" unitOptions={lengthUnits} />
      )}
      {selectedItem === "weight" && (
        <Weight itemSelected={selectedItem} defaultFromUnit="gram" defaultToUnit="gram" unitOptions={weightUnits} />
      )}
      {selectedItem === "temperature" && (
        <Temperature itemSelected={selectedItem} defaultFromUnit="celsius" defaultToUnit="celsius" unitOptions={temperatureUnits} />
      )}
    </>
  )
}

export default App