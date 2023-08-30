use crate::components::list_item::ListItemView;
use yew::prelude::*;
use yewdux::prelude::*;

use crate::store::{List, ListItem, Store};

#[derive(Debug, PartialEq, Properties)]
pub struct Props {
    pub id: String,
}

#[function_component]
pub fn ListView(props: &Props) -> Html {
    let (store, dispatch) = use_store::<Store>();
    let list = &store.list_map[&props.id];

    html! {
        <div class="container mx-auto">
            <h1 class="font-bold">{&list.name}</h1>
            {list.items.iter().map(|item: &ListItem | {
                html! {
                    <ListItemView name={item.text.clone()}/>
                }
            }).collect::<Html>()}
        </div>
    }
}
