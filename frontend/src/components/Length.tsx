import { useEffect, useState } from "react";

const BASE_URL = "http://127.0.0.1:8000"

interface LengthProps {
    itemSelected: string;
    length: number;
    fromUnit: string;
    toUnit: string;
}

function Length({ itemSelected, length, fromUnit, toUnit }: LengthProps) {
    // manual update of lengthValue1 and lengthValue2 to prevent loop of useEffect calls
    const [lengthValue1, setLengthValue1] = useState("0");
    const [lengthValue2, setLengthValue2] = useState("0");
    // track which input is being updated to prevent loop of useEffect calls
    const [updatingInput, setUpdatingInput] = useState(0);
    // state for fromUnit and toUnit to trigger useEffect when they change
    const [fromUnitState, setFromUnitState] = useState("meter");
    const [toUnitState, setToUnitState] = useState("meter");

    const unitOptions = ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"]; 
    const inputRegex = /^\s*[-+]?\d+(\.\d+)?\s*$/;

    const handleLength = (e: React.ChangeEvent<HTMLInputElement>, lengthSetState: string) => {
        let inputValue = e.target.value;
        if (lengthSetState === "setLengthValue1") {
            setLengthValue1(inputValue);
            setUpdatingInput(0);
        } else {
            setLengthValue2(inputValue);
            setUpdatingInput(1);
        }
        return inputValue
    }

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>, unitSetState: string) => {
        let unitValue = e.target.value;
        if (unitSetState === "setFromUnitState") {
            setFromUnitState(unitValue);
            setUpdatingInput(0);
        } else {
            setToUnitState(unitValue);
            setUpdatingInput(1);
        }
    }

    useEffect(() => {
        const convertLength = async () => {
            if (itemSelected === "Length" && updatingInput === 0 && inputRegex.test(lengthValue1)) {
                try {
                    const response = await fetch(`${BASE_URL}/length/convert?from_unit=${fromUnitState}&to_unit=${toUnitState}&value=${lengthValue1}`);
                    const data = await response.json();
                    setLengthValue2(data.converted_value);
                } catch (error) {
                    console.error("Error converting length:", error);
                } 
            }
        }
        convertLength();
    }, [itemSelected, fromUnitState, toUnitState, updatingInput, lengthValue1]);

    useEffect(() => {
        const convertLength = async () => {
            if (itemSelected === "Length" && updatingInput === 1 && inputRegex.test(lengthValue2)) {
                try {
                    const response = await fetch(`${BASE_URL}/length/convert?from_unit=${toUnitState}&to_unit=${fromUnitState}&value=${lengthValue2}`);
                    const data = await response.json();
                    setLengthValue1(data.converted_value);
                } catch (error) {
                    console.error("Error converting length:", error);
                } 
            }
        }
        convertLength();
    }, [itemSelected, fromUnitState, toUnitState, updatingInput, lengthValue2]);

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
                            value={lengthValue1}
                            onChange={(e) => handleLength(e, "setLengthValue1")}
                            id="input1"
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" value={fromUnitState} onChange={(e) => handleUnitChange(e, "setFromUnitState")}>
                            <option value="">From</option>
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
                            value={lengthValue2}
                            onChange={(e) => handleLength(e, "setLengthValue2")}
                            id="input2"
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" value={toUnitState} onChange={(e) => handleUnitChange(e, "setToUnitState")}>
                            <option value="">To</option>
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