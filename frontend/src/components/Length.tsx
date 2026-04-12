import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000"

interface LengthProps {
    itemSelected: string;
    defaultFromUnit: string;
    defaultToUnit: string;
    unitOptions: string[];
}

function Length({ itemSelected, defaultFromUnit, defaultToUnit, unitOptions }: LengthProps) {
    // manual update of value1 and value2 to prevent loop of useEffect calls
    const [value1, setValue1] = useState("0");
    const [value2, setValue2] = useState("0");
    // track which input is being updated to prevent loop of useEffect calls
    const [updatingInput, setUpdatingInput] = useState(0);
    // state for fromUnit and toUnit to trigger useEffect when they change
    const [fromUnitState, setFromUnitState] = useState(defaultFromUnit);
    const [toUnitState, setToUnitState] = useState(defaultToUnit);

    const inputRegex = /^\s*[-+]?\d+(\.\d+)?\s*$/;

    const handleLength = (e: React.ChangeEvent<HTMLInputElement>, lengthSetState: string) => {
        let inputValue = e.target.value;
        if (lengthSetState === "value1") {
            setValue1(inputValue);
            setUpdatingInput(0);
        } else {
            setValue2(inputValue);
            setUpdatingInput(1);
        }
        return inputValue
    }

    // Change setUpdatingInput based on desired behavior: if you want to update the other input when one changes, set it to the opposite value (0 or 1). If you want to update the same input, keep it the same.
    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>, unitSetState: string) => {
        let unitValue = e.target.value;
        if (unitSetState === "setFromUnitState") {
            setFromUnitState(unitValue);
            setUpdatingInput(updatingInput);
        } else {
            setToUnitState(unitValue);
            setUpdatingInput(updatingInput);
        }
    }

    useEffect(() => {
        const convertLength = async () => {
            if (itemSelected === "Length" && updatingInput === 0 && inputRegex.test(value1)) {
                try {
                    const response = await fetch(`${BASE_URL}/length/convert?from_unit=${fromUnitState}&to_unit=${toUnitState}&value=${value1}`);
                    const data = await response.json();
                    setValue2(data.converted_value);
                } catch (error) {
                    console.error("Error converting length:", error);
                } 
            }
        }
        convertLength();
    }, [itemSelected, fromUnitState, toUnitState, updatingInput, value1]);

    useEffect(() => {
        const convertLength = async () => {
            if (itemSelected === "Length" && updatingInput === 1 && inputRegex.test(value2)) {
                try {
                    const response = await fetch(`${BASE_URL}/length/convert?from_unit=${toUnitState}&to_unit=${fromUnitState}&value=${value2}`);
                    const data = await response.json();
                    setValue1(data.converted_value);
                } catch (error) {
                    console.error("Error converting length:", error);
                } 
            }
        }
        convertLength();
    }, [itemSelected, fromUnitState, toUnitState, updatingInput, value2]);

    return (
    <div>
        {itemSelected === "Length" && (
            <>
                <h2>Length Converter</h2>
                <form className="row g-3">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={value1}
                            onChange={(e) => handleLength(e, "value1")}
                            id="input1"
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" value={fromUnitState} onChange={(e) => handleUnitChange(e, "setFromUnitState")}>
                            {unitOptions.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={value2}
                            onChange={(e) => handleLength(e, "value2")}
                            id="input2"
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" value={toUnitState} onChange={(e) => handleUnitChange(e, "setToUnitState")}>
                            {unitOptions.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </>
        )}
    </div>
  );
}

export default Length;