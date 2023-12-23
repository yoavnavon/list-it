import * as React from 'react';
import { IList } from '../@types/list';
import { Outlet, Link } from "react-router-dom";

type Props = {
    list: IList;
    // updateList: (id: string) => void;
};

const List: React.FC<Props> = ({ list }) => {
    return (
        <Link to={`list/${list._id.$oid}`} className='mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
            {list.name}
        </Link>
    );
};
export default List;