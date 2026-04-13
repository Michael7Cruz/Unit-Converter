import { useState, useEffect } from "react";

export default function useHandleInput(defaultFromUnit: string, defaultToUnit: string, itemSelected: string) {
    const BASE_URL = "http://127.0.0.1:8000"
    // manual update of value1 and value2 to prevent loop of useEffect calls
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    // state for fromUnit and toUnit to trigger useEffect when they change
    const [fromUnitState, setFromUnitState] = useState(defaultFromUnit);
    const [toUnitState, setToUnitState] = useState(defaultToUnit);
    const [updatingInput, setUpdatingInput] = useState(0);

    const inputRegex = /^\s*[-+]?\d+(\.\d+)?\s*$/;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, inputSetState: string) => {
        let inputValue = e.target.value;
        if (inputSetState === "value1") {
            setValue1(inputValue);
            setUpdatingInput(0);
        } else {
            setValue2(inputValue);
            setUpdatingInput(1);
        }
    }

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
            if (itemSelected !== "" && updatingInput === 0 && inputRegex.test(value1)) {
                try {
                    const response = await fetch(`${BASE_URL}/${itemSelected}/convert?from_unit=${fromUnitState}&to_unit=${toUnitState}&value=${value1}`);
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
            if (itemSelected !== "" && updatingInput === 1 && inputRegex.test(value2)) {
                try {
                    const response = await fetch(`${BASE_URL}/${itemSelected}/convert?from_unit=${toUnitState}&to_unit=${fromUnitState}&value=${value2}`);
                    const data = await response.json();
                    setValue1(data.converted_value);
                } catch (error) {
                    console.error("Error converting length:", error);
                } 
            }
        }
        convertLength();
    }, [itemSelected, fromUnitState, toUnitState, updatingInput, value2]);

    return { value1, value2, fromUnitState, toUnitState, handleInput, handleUnitChange };
}