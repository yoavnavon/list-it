import { IListItem, Content, ITextContent, IImageContent, IListContent } from './list';

export function isTextType(item: IListItem<Content>): item is IListItem<ITextContent> {
    return item.content.item_type === "text"
}
export function isImageType(item: IListItem<Content>): item is IListItem<IImageContent> {
    return item.content.item_type === "image"
}
export function isListType(item: IListItem<Content>): item is IListItem<IListContent> {
    return item.content.item_type === "list"
}