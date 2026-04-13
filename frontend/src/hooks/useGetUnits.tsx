import { useState, useEffect } from "react";

export default function useGetUnits() {
    const [items, setItems] = useState<string[]>([]);
    const [lengthUnits, setLengthUnits] = useState<string[]>([]);
    const [weightUnits, setWeightUnits] = useState<string[]>([]);
    const [temperatureUnits, setTemperatureUnits] = useState<string[]>([]);

    useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/units");
        const data = await response.json();
        console.log(data);
        setItems([...Object.keys(data)]);
        setLengthUnits([...data.length]);
        setWeightUnits([...data.weight]);
        setTemperatureUnits([...data.temperature]); 
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    }
    fetchUnits();
  }, []);

  return { items, lengthUnits, weightUnits, temperatureUnits };
}