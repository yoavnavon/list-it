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
    log!("list index");
    // let mapped: Vec<Html> = lists
    //     .into_iter()
    //     .map(|list| {
    //         log!("mapping");
    //         log!(JsValue::from(list.name.clone()));
    //         html! {<ListIndexItem id={list.id.unwrap()} name={list.name.clone()}/>}
    //     })
    //     .collect();

    // let list = &lists[0];
    html! {
        <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <div class="mb-4">
                    <h1 class="text-grey-darkest">{"Lists"}</h1>
                </div>
                <div class=".hover:shadow-lg">
                        {
                            lists.into_iter().map(|list| {
                                html! {
                                    <div class="flex mb-4 items-center hover:bg-slate-50">
                                    <ListIndexItem id={list.id.unwrap()} name={list.name.clone()}/>
                                    </div>
                                }
                            }).collect::<Html>()
                        }
                        // <p class="w-full text-grey-darkest">Add another component to Tailwind Components</p>
                        // <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                        // <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                </div>
            </div>
        </div>
    }
}
