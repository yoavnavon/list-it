mod components;
mod route;
mod store;

use route::{switch, Route};
use store::{set_list, List, Store};
use yew::prelude::*;
use yew_router::prelude::*;
use yewdux::prelude::*;

use gloo_console::log;
// use wasm_bindgen::JsValue;

#[function_component]
fn App() -> Html {
    let (store, dispatch) = use_store::<Store>();
    log!("main loop");
    if store.list_idx == 0 {
        set_list(
            List {
                // id: Some(0),
                id: None,
                name: String::from("new list"),
                items: vec![],
            },
            &dispatch,
        );
        set_list(
            List {
                // id: Some(0),
                id: None,
                name: String::from("new list 2"),
                items: vec![],
            },
            &dispatch,
        );
    }

    html! {
        <BrowserRouter>
            <Switch<Route> render={switch} /> // <- must be child of <BrowserRouter>
        </BrowserRouter>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}
