import * as React from 'react';
import { IListItem, ITextContent } from '../../customTypes/list';

type Props = {
    item: IListItem<ITextContent>;
};

const TextItem: React.FC<Props> = ({ item }) => {
    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            {item.content.text}
        </div>
    );
};
export default TextItem;