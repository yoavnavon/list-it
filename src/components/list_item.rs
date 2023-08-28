use crate::route::Route;
use gloo_console::log;
use wasm_bindgen::JsValue;
use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Debug, PartialEq, Properties)]
pub struct Props {
    pub name: String,
}

#[function_component]
pub fn ListItem(props: &Props) -> Html {
    html! {
        <div class="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        {props.name.clone()}
        </div>
    }
}
