export interface ITextContent {
    text: string
    item_type: "text"
}

export interface IImageContent {
    url: string
    item_type: "image"
}

export interface IListContent {
    list: IList
    item_type: "list"
}

type Content = ITextContent | IImageContent | IListContent
type ItemType = "text" | "image" | "list" | "place"

export interface IListItem<Type> {
    content: Type
}

export interface ObjectId {
    $oid: string
}

export interface IList {
    _id: ObjectId;
    items: Array<IListItem<Content>>;
    name: string;
    description: string;
}


export type ListContextType = {
    lists: IList[];
    saveList: (list: IList) => void;
    updateList: (_id: string) => void;
};

