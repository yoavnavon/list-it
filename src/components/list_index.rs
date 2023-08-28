use yew::prelude::*;
use yewdux::prelude::*;

use crate::components::list_index_item::ListIndexItem;
use crate::store::{List, Store};
use gloo_console::log;
use wasm_bindgen::JsValue;

#[function_component]
pub fn ListIndex() -> Html {
    let (store, _) = use_store::<Store>();
    let lists = store.lists.clone();

    html! {
        <div class="container mx-auto">
            <h1 class="text-grey-darkest font-bold">{"Lists"}</h1>
                {
                    lists.into_iter().map(|list| {
                        html! {
                            <ListIndexItem id={list.id.unwrap()} name={list.name.clone()}/>
                        }
                    }).collect::<Html>()
                }
        </div>
    }
}
