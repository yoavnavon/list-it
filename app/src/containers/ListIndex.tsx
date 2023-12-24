import * as React from 'react';
import { ListContextType, IList } from '../customTypes/list';
import { ListContext } from '../context/listContext';
import ListIndexItem from '../components/ListIndexItem';
import {
    Outlet,
    Link,
    useLoaderData,
} from "react-router-dom";

const ListsIndex = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const lists = useLoaderData() as IList[];

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-grey-darkest font-bold">{"Lists"}</h1>
                {lists.map((list: IList) => (
                    <ListIndexItem key={list._id.$oid} list={list} />
                ))}
                <div className="mt-8 block max-w-none p-6 bg-white  justify-center flex">
                    <Link to={'list/new'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-30">New List</Link>
                </div>
            </div>
        </>
    );
};

export default ListsIndex