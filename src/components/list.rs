use crate::components::list_item::ListItem;
use yew::prelude::*;
use yewdux::prelude::*;

use crate::store::Store;

#[derive(Debug, PartialEq, Properties)]
pub struct Props {
    pub id: usize,
}

#[function_component]
pub fn ListView(props: &Props) -> Html {
    let (store, dispatch) = use_store::<Store>();
    let list = &store.lists[props.id];

    html! {
        <div class="container mx-auto">
            <h1 class="font-bold">{list.name.clone()}</h1>
            {list.items.clone().into_iter().map(|item| {
                html! {
                    <ListItem name={item.text.clone()}/>
                }
            }).collect::<Html>()}
        </div>
    }
}
