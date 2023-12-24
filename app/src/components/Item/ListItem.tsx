import * as React from 'react';
import { IListItem, IListContent } from '../../@types/list';
import { Outlet, Link } from "react-router-dom";
import { isTextType, isImageType, isListType } from '../../@types/guards';
import TextItem from './TextItem';
import ImageItem from './ImageItem';

type Props = {
    item: IListItem<IListContent>;
};

const ListItem: React.FC<Props> = ({ item }) => {
    return (
        <Link to={`/list/${item.content.list._id.$oid}`} className='mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
            <h2>{item.content.list.name}</h2>
            {item.content.list.description}
            {item.content.list.items.map((item, idx) => {
                if (isTextType(item)) {
                    return <TextItem key={idx} item={item} />
                }
                if (isImageType(item)) {
                    return <ImageItem key={idx} item={item} />
                }
                if (isListType(item)) {
                    return <ListItem key={idx} item={item} />
                }
            })}
        </Link>
    );
};
export default ListItem;