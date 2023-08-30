use crate::store::List;

use super::components::{list::ListView, list_index::ListIndex, list_new::NewListView};
use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Clone, Routable, PartialEq)]
pub enum Route {
    #[at("/")]
    ListIndex,
    #[at("/list/:id")]
    ListView { id: String },
    #[at("/list/new")]
    NewListView,
    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(routes: Route) -> Html {
    match routes {
        Route::ListIndex => html! {   <ListIndex /> },
        Route::ListView { id } => html! { <ListView id={id}/> },
        Route::NewListView => html! { <NewListView /> },
        Route::NotFound => html! { <h1>{ "404" }</h1> },
    }
}
