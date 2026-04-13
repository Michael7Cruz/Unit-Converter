import { useState } from "react";

interface ListGroupProps {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps){
    const [selectedIndex, setSelectedIndex] = useState(-1);
    
    const emptyMessage = items.length === 0 && <p>No items found</p>
    const [show, setShow] = useState(false);

    return (
        <>
            <form className="row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="search units"
                        value=""
                        onChange={(e) => {}}
                        id="input1"
                    />
                </div>
                <div className="col">
                    <div className="dropdown-active">
                        <button 
                            className={show ? "btn btn-secondary dropdown-toggle show" : "btn btn-secondary dropdown-toggle"} 
                            type="button" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            onClick={() => setShow(!show)}>
                            {heading}
                        </button>
                        <ul className={show ? "dropdown-menu show" : "dropdown-menu"}>
                            {emptyMessage}
                            {items.map((item, index) => (
                                <li key={item} onClick={() => setShow(false)}>
                                    <a 
                                        className={selectedIndex === index ? "dropdown-item active" : "dropdown-item"} href="#"
                                        onClick={() => {
                                            setSelectedIndex(index)
                                            onSelectItem(item);
                                        }}
                                    >{item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ListGroup;