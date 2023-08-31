use crate::components::list_item::ListItemView;
use web_sys::HtmlInputElement;
use yew::prelude::*;
use yewdux::prelude::*;

use crate::store::{List, ListItem, Store};
use wasm_bindgen::JsCast;

use gloo_console::log;
use gloo_net::http::Request;
use std::collections::HashMap;
use wasm_bindgen::JsValue;
use yew_hooks::prelude::*;

#[derive(Debug, PartialEq, Properties)]
pub struct Props {}

#[function_component]
pub fn NewListView(props: &Props) -> Html {
    // let (store, dispatch) = use_store::<Store>();
    // let text = use_state(String::new);
    // let list = &store.list_map[&props.id];
    let text = use_state(String::new);
    let text_input_ref = use_node_ref();
    let list: UseStateHandle<Vec<ListItem>> = use_state(|| vec![]);

    let handle_input = {
        let text = text.clone();
        // let message = message.clone();
        Callback::from(move |event: InputEvent| {
            let target = event.target().unwrap();
            let value = target.unchecked_into::<HtmlInputElement>().value();
            text.set(value);
        })
    };

    let handle_add = |text: &UseStateHandle<String>,
                      list: &UseStateHandle<Vec<ListItem>>,
                      text_input_ref: &NodeRef| {
        // Add new item to list
        let mut new_list = list.to_vec().clone();
        new_list.push(ListItem {
            text: text.to_string(),
        });
        list.set(new_list);

        // Clean input and state
        let text_input = text_input_ref.cast::<HtmlInputElement>().unwrap();
        text_input.set_value("");
        text.set(String::new());
    };

    let handle_add_click = {
        let text = text.clone();
        let list = list.clone();
        let text_input_ref = text_input_ref.clone();
        Callback::from(move |_| handle_add(&text, &list, &text_input_ref))
    };

    let handle_add_enter = {
        let text = text.clone();
        let list = list.clone();
        let text_input_ref = text_input_ref.clone();
        move |e: KeyboardEvent| {
            if e.key() == "Enter" {
                handle_add(&text, &list, &text_input_ref);
            }
        }
    };
    use_event_with_window("keypress", handle_add_enter);

    html! {
        <div class="container mx-auto">
            <h1 class="font-bold">{"New List"}</h1>
            {(*list).iter().map(|item| {
                html! {
                    <ListItemView name={item.text.clone()}/>
                }
            }).collect::<Html>()}
                <div class="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <div class="flex justify-between h-10">
                        <input
                            type="text"
                            class="flex-grow w-30 border p-1"
                            oninput={handle_input}
                            ref={text_input_ref}
                        />
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-20"
                            onclick={handle_add_click.clone()}
                        >
                            {"Add"}
                        </button>
                    </div>
                </div>
                <div class="mt-8 block max-w-none p-6 bg-white  justify-center flex">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-30"
                    >
                        {"Submit"}
                    </button>
                </div>

        </div>
    }
}
