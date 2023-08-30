use yew::prelude::*;
use yewdux::prelude::*;

use crate::components::list_index_item::ListIndexItem;
use crate::store::{set_list_map, List, Store};
use gloo_console::log;
use gloo_net::http::Request;
use std::collections::HashMap;
use wasm_bindgen::JsValue;

#[function_component]
pub fn ListIndex() -> Html {
    let (store, dispatch) = use_store::<Store>();
    {
        use_effect_with_deps(
            move |_| {
                wasm_bindgen_futures::spawn_local(async move {
                    let resp: Vec<List> = Request::get("http://localhost:8080/lists")
                        .send()
                        .await
                        .unwrap()
                        .json()
                        .await
                        .unwrap();

                    let mut list_map: HashMap<String, List> = HashMap::new();
                    for list in resp.iter() {
                        list_map.insert(list._id.unwrap().to_string(), list.clone());
                    }

                    set_list_map(list_map, &dispatch)
                });
                || ()
            },
            (),
        );
    }
    let lists = store.list_map.values();

    html! {
        <div class="container mx-auto">
            <h1 class="text-grey-darkest font-bold">{"Lists"}</h1>
                {
                    lists.map(|list: &List| {
                        html! {
                            <ListIndexItem _id={list._id.unwrap().to_string()} name={list.name.clone()}/>
                        }
                    }).collect::<Html>()
                }
        </div>
    }
}
