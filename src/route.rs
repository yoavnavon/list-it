use super::components::{list::ListView, list_index::ListIndex};
use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Clone, Routable, PartialEq)]
pub enum Route {
    #[at("/")]
    ListIndex,
    #[at("/list/:id")]
    ListView { id: usize },
    // #[not_found]
    // #[at("/404")]
    // NotFound,
}

pub fn switch(routes: Route) -> Html {
    match routes {
        Route::ListIndex => html! {   <ListIndex /> },
        // Route::ListIndex => html! {  <h1>{"list index"}</h1> },
        Route::ListView { id } => html! { <ListView id={id}/> },
        // Route::NotFound => html! { <h1>{ "404" }</h1> },
    }
}
