mod components;
mod route;
mod store;

use route::{switch, Route};
use store::{set_list, List, ListItem, Store};
use wasm_bindgen::prelude::*;
use yew::prelude::*;
use yew_router::prelude::*;
use yewdux::prelude::*;

use gloo_console::log;
// use wasm_bindgen::JsValue;

#[function_component]
fn App() -> Html {
    let (store, dispatch) = use_store::<Store>();

    html! {
        <BrowserRouter>
            <Switch<Route> render={switch} /> // <- must be child of <BrowserRouter>
        </BrowserRouter>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
