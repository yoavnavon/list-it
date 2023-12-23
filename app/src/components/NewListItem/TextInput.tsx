import * as React from 'react';
import DropDown from '../DropDown';
import ItemTypes from '../../constants'

type Props = {
    handle_input: (event: React.ChangeEvent<HTMLInputElement>) => void
    handle_add: () => void
    handle_item_type: (event: any) => void
    inputRef: React.MutableRefObject<HTMLInputElement | null>
    itemType: string
};


const TextInput: React.FC<Props> = ({ handle_input, handle_add, handle_item_type, inputRef, itemType }) => {
    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between h-10">
                <input
                    type="text"
                    className="flex-grow w-30 border p-1 mr-5 rounded-lg"
                    onChange={handle_input}
                    ref={inputRef}
                />
                <DropDown options={ItemTypes} handle_click={handle_item_type} selected={itemType}></DropDown>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-20"
                    onClick={(_) => handle_add()}
                >
                    {"Add"}
                </button>
            </div>
        </div>
    );
};
export { TextInput };