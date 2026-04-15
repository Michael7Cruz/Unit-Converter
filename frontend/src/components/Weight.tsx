import useHandleInput from "../hooks/useHandleInput";

interface WeightProps {
    itemSelected: string;
    defaultFromUnit: string;
    defaultToUnit: string;
    unitOptions: string[];
}

function Weight({ itemSelected, defaultFromUnit, defaultToUnit, unitOptions }: WeightProps) {
    const { value1, value2, fromUnitState, toUnitState, handleInput, handleUnitChange } = useHandleInput(defaultFromUnit, defaultToUnit, itemSelected);

    return (
        <>
            <h2>Weight Converter</h2>
            <form style={{ gridTemplateColumns: "1fr 1fr" }} className="d-grid g-3">
                <div className="p-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={value1}
                        onChange={(e) => handleInput(e, "value1")}
                        id="input1"
                    />
                </div>
                <div className="p-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={value2}
                        onChange={(e) => handleInput(e, "value2")}
                        id="input2"
                    />
                </div>
                <div className="p-2">
                    <select className="form-select" value={fromUnitState} onChange={(e) => handleUnitChange(e, "setFromUnitState")}>
                        {unitOptions.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-2">
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
    );
}

export default Weight;