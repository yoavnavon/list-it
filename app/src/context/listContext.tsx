import * as React from 'react';
import { ListContextType, IList } from '../customTypes/list';

export const ListContext = React.createContext<ListContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

const ListProvider: React.FC<Props> = ({ children }) => {
    const [lists, setLists] = React.useState<IList[]>([
        {
            _id: { $oid: "0" },
            name: 'post 1',
            description: 'post 1',
            items: [],
        },
        {
            _id: { $oid: "1" },
            name: 'post 2',
            description: 'post 2',
            items: [],
        },
    ]);


    const saveList = (list: IList) => {
        const newList: IList = {
            _id: { $oid: Math.random().toString() }, // not really unique - but fine for this example
            name: list.name,
            items: list.items,
            description: list.description,
        }
        setLists([...lists, newList])
    }

    const updateList = (_id: string) => {
        lists.filter((list: IList) => {
            if (list._id.$oid === _id) {
                setLists([...lists])
            }
        })
    }

    return (
        <ListContext.Provider value={{ lists, saveList, updateList }}>
            {children}
        </ListContext.Provider>
    );
};

export default ListProvider;