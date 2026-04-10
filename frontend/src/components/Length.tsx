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
    const [lengthValue1, setLengthValue1] = useState(length);
    const [lengthValue2, setLengthValue2] = useState(0);
    // track which input is being updated to prevent loop of useEffect calls
    const [updatingInput, setUpdatingInput] = useState(0);
    // state for fromUnit and toUnit to trigger useEffect when they change
    const [fromUnitState, setFromUnitState] = useState("meter");
    const [toUnitState, setToUnitState] = useState("meter");

    const unitOptions = ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"]; 

    const handleLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        let inputMaxSize = 10 ** 16; // Set the maximum length for the input
        let numericValue: number
        if (inputValue === "") {
            inputValue = "0";
        }
        if (inputValue === "-") {
            inputValue = "-0.0";
        }
        numericValue = parseFloat(inputValue);
        if (Math.abs(numericValue) >= inputMaxSize) {
            numericValue = inputMaxSize - 1;
        }
        return numericValue
    }

    const handleLengthChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = handleLength(e);
        setLengthValue1(numericValue);
        setUpdatingInput(0);
    }

    const handleLengthChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = handleLength(e);
        setLengthValue2(numericValue);
        setUpdatingInput(1);
    }

    useEffect(() => {
        const convertLength = async () => {
            if (itemSelected === "Length" && updatingInput === 0) {
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
            if (itemSelected === "Length" && updatingInput === 1) {
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
                            type="number"
                            className="form-control"
                            placeholder="Enter length"
                            value={lengthValue1}
                            onChange={handleLengthChange1}
                            id="input1"
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" value={fromUnitState} onChange={(e) => setFromUnitState(e.target.value)}>
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
                            type="number"
                            className="form-control"
                            placeholder="Enter length"
                            value={lengthValue2}
                            onChange={handleLengthChange2}
                            id="input2"
                        />
                    </div>
                    <div className="col">
                        <select className="form-select" value={toUnitState} onChange={(e) => setToUnitState(e.target.value)}>
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