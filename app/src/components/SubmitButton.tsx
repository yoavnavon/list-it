import * as React from 'react';
import { IListItem } from '../customTypes/list';

type Props = {
    handle_submit: () => Promise<void>
};

const ListItem: React.FC<Props> = ({ handle_submit }) => {
    return (
        <div className="mt-8 block max-w-none p-6 bg-white  justify-center flex">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-30"
                onClick={handle_submit}
            >
                {"Submit"}
            </button>
        </div>
    );
};
export default ListItem;