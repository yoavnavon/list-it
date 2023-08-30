use crate::route::Route;
use crate::store::{List, Store};
use bson::oid::ObjectId;
use gloo_console::log;
use wasm_bindgen::JsValue;
use yew::prelude::*;
use yew_router::prelude::*;
use yewdux::prelude::*;

#[derive(Debug, PartialEq, Properties)]
pub struct Props {
    pub _id: String,
    pub name: String,
}

#[function_component]
pub fn ListIndexItem(props: &Props) -> Html {
    html! {

        <Link<Route> to={Route::ListView { id: props._id.to_string()}} classes="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            {&props.name}
        </Link<Route>>



    }
}
