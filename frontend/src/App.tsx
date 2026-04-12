import { useState } from "react"
import ListGroup from "./components/ListGroup"
import Alert from "./components/Alert"
import Length from "./components/Length";

function App() {
  let items= [
          "Length",
          "Weight",
          "Temperature",
      ];

  const lengthUnits = ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"];
  const weightUnits = ["gram", "kilogram", "milligram", "pound", "ounce"];
  const temperatureUnits = ["celsius", "fahrenheit", "kelvin"];    
  
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    console.log(selectedItem);
  }

  return (
    <>
      <Alert>Select a unit type</Alert>
      <ListGroup items={items} heading="Unit Types" onSelectItem={handleSelectItem}/>
      <Length itemSelected={selectedItem} defaultFromUnit="meter" defaultToUnit="meter" unitOptions={lengthUnits} />
    </>
  )
}

export default App