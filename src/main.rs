mod components;
mod route;
mod store;

use route::{switch, Route};
use store::{set_list, List, ListItem, Store};
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
                id: None,
                name: String::from("new list"),
                items: vec![
                    ListItem {
                        text: String::from("item 1"),
                        id: uuid::Uuid::new_v4(),
                    },
                    ListItem {
                        text: String::from("item 2"),
                        id: uuid::Uuid::new_v4(),
                    },
                ],
            },
            &dispatch,
        );
        set_list(
            List {
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
