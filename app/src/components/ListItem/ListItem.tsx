import * as React from 'react';
import { IListItem, IListContent } from '../../@types/list';
import { Outlet, Link } from "react-router-dom";

type Props = {
    item: IListItem<IListContent>;
};

const ListItem: React.FC<Props> = ({ item }) => {
    return (
        <Link to={`/list/${item.content.list._id.$oid}`} className='mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
            {item.content.list.name}
        </Link>
    );
};
export default ListItem;