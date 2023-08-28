use crate::route::Route;
use gloo_console::log;
use wasm_bindgen::JsValue;
use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Debug, PartialEq, Properties)]
pub struct Props {
    pub id: usize,
    pub name: String,
}

#[function_component]
pub fn ListIndexItem(props: &Props) -> Html {
    log!("list index item", JsValue::from(props.name.clone()));
    html! {
        <Link<Route> to={Route::ListView { id: props.id }}>{format!("list index {}", props.name.clone())}</Link<Route>>



    }
}
