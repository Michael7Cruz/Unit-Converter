import { useState } from "react";

interface ListGroupProps {
    items: string[];
    onSelectItem: (item: string) => void;
}

function UnitsList({ items, onSelectItem }: ListGroupProps){
    const [unitType, setUnitType] = useState("");
    const emptyMessage = items.length === 0 && "(waiting for units...)";

    return (
        <>
            <form className="row p-2">
                <div className="col">
                    <select className="form-select" value={unitType} onChange={(e) => {setUnitType(e.target.value); onSelectItem(e.target.value)}}>
                        <option value="" className="value d-none">Select a unit {emptyMessage}</option>
                        {items.map((unit) => (
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

export default UnitsList;