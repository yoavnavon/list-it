import * as React from 'react';
import DropDown from '../DropDown';
import ItemTypes from '../../constants'

type Props = {
    setImage: React.Dispatch<React.SetStateAction<File | string>>
    uploadImage: () => void
    handle_item_type: (event: any) => void
    itemType: string
    inputRef: React.MutableRefObject<HTMLInputElement | null>
};


const ImageInput: React.FC<Props> = ({ handle_item_type, itemType, setImage, uploadImage, inputRef }) => {
    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between h-10">
                <input type="file" onChange={(e) => e.target.files != null ? setImage(e.target.files[0]) : null} ref={inputRef}></input>
                <DropDown options={ItemTypes} handle_click={handle_item_type} selected={itemType}></DropDown>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-20"
                    onClick={uploadImage}
                >
                    Upload
                </button>
            </div>
        </div >
    );
};
export { ImageInput };