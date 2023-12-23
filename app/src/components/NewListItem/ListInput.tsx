import * as React from 'react';
import DropDown from '../DropDown';
import { useState, useRef, useEffect } from 'react';
import { IList } from '../../@types/list';
import ItemTypes from '../../constants'

type Props = {
    handle_item_type: (event: any) => void
    itemType: string
    handle_add: () => void
    list: IList | null
    setList: React.Dispatch<React.SetStateAction<IList | null>>
};


const ListInput: React.FC<Props> = ({ handle_item_type, itemType, handle_add, setList, list }) => {
    const [lists, setLists] = useState<Array<IList>>([])
    useEffect(() => {
        const fetchLists = async () => {
            const resp = await fetch("http://localhost:8080/lists")
            const lists = await resp.json();
            setLists(lists)
            return lists
        }
        fetchLists()
    }, [])
    const listOptions = lists.map(list => ({ label: list.name, value: list }))
    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between h-10">
                <DropDown options={listOptions} handle_click={setList} selected={list == null ? "Select List" : list.name}></DropDown>
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
export { ListInput };