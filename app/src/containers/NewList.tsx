import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ListContextType, IList, IListItem, Content, IImageContent, ITextContent, IListContent } from '../customTypes/list';
import { isTextType, isImageType, isListType } from '../customTypes/guards';
import { ListContext } from '../context/listContext';
import TextItem from '../components/Item/TextItem';
import ImageItem from '../components/Item/ImageItem';
import ListItem from '../components/Item/ListItem';
import { TextInput, ImageInput, ListInput, PlaceInput } from '../components/NewListItem/Inputs'
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from "react-router-dom";


const List = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const [text, setText] = useState("");
    const [name, setName] = useState("New List");
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [items, setItems] = useState<IListItem<Content>[]>([]);
    const [itemType, setItemType] = useState("Text");
    const navigate = useNavigate();

    const [image, setImage] = useState<File | string>("");
    const [list, setList] = useState<IList | null>(null);
    const [place, setPlace] = useState<google.maps.places.PlaceResult | null>({})

    const uploadImage = () => {
        const data = new FormData()
        if (image != null) {
            data.append("file", image)
            data.append("upload_preset", "list-it-item")
            data.append("cloud_name", "dyezktdnh")
            fetch("https://api.cloudinary.com/v1_1/dyezktdnh/image/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    const new_item: IListItem<IImageContent> = { content: { url: data.url, item_type: "image" } }
                    setItems([...items, new_item])
                    setImage("")
                    if (inputRef.current != null) {
                        inputRef.current.value = ""
                    }
                })
                .catch(err => console.log(err))

        }
    }


    const handle_input = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setText(value)
    }

    const handle_name = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setName(value)
    }

    const handle_item_type = (value: any) => {
        setItemType(value)
    }


    const handle_add = () => {
        const new_item: IListItem<ITextContent> = { content: { text, item_type: "text" } }
        setItems([...items, new_item])
        setText("")
        if (inputRef.current != null) {
            inputRef.current.value = ""
        }

    }

    const handle_add_list = () => {
        if (list != null) {
            const new_item: IListItem<IListContent> = { content: { list, item_type: "list" } }
            setItems([...items, new_item])
        }
    }

    const handle_add_place = (place: any) => {
        console.log(place)
    }

    // useEffect(() => {
    //     const keyDownHandler = (event: KeyboardEvent) => {

    //         if (event.key === 'Enter') {
    //             console.log(text)
    //             event.preventDefault();

    //             const new_item: IListItem = { text, type: itemType }

    //             setItems([...items, new_item])
    //             handle_add()


    //         }
    //     };

    //     document.addEventListener('keydown', keyDownHandler);

    //     return () => {
    //         document.removeEventListener('keydown', keyDownHandler);
    //     };
    // }, [text]);

    const handle_submit = async () => {
        const resp = await fetch(`http://localhost:8080/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                items,
                description: "my descr",
            })

        })
        const data = await resp.json()
        navigate("/");
    }

    const input = (() => {
        if (itemType == 'text') {
            return <TextInput handle_input={handle_input} handle_add={handle_add} inputRef={inputRef} handle_item_type={handle_item_type} itemType={itemType}></TextInput>
        }
        if (itemType == "image") {
            return <ImageInput setImage={setImage} uploadImage={uploadImage} handle_item_type={handle_item_type} itemType={itemType} inputRef={inputRef}></ImageInput>
        }
        if (itemType == "list") {
            return <ListInput handle_item_type={handle_item_type} itemType={itemType} setList={setList} handle_add={handle_add_list} list={list}></ListInput>
        }
        if (itemType == "place") {
            return <PlaceInput handle_item_type={handle_item_type} itemType={itemType} setPlace={setPlace} handle_add={handle_add_place} place={place}></PlaceInput>
        }
        return <TextInput handle_input={handle_input} handle_add={handle_add} inputRef={inputRef} handle_item_type={handle_item_type} itemType={itemType}></TextInput>
    })()

    const typeToItem = (item: IListItem<Content>, idx: number) => {
        if (isTextType(item)) {
            return <TextItem key={idx} item={item} />
        }
        if (isImageType(item)) {
            return <ImageItem key={idx} item={item} />
        }
        if (isListType(item)) {
            return <ListItem key={idx} item={item} />
        }
    }


    return (
        <>
            <div className="container mx-auto">

                <input
                    type="text"
                    className="text-grey-darkest font-bold text-4xl"
                    onChange={handle_name}
                    value={name}
                />
                {items.map(typeToItem)}
                {input}
                <SubmitButton handle_submit={handle_submit}></SubmitButton>
            </div>
        </>
    )
};

export default List