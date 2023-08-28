use gloo_console::log;
use serde::{Deserialize, Serialize};
use yewdux::prelude::*;

#[derive(Debug, Deserialize, Serialize, PartialEq, Clone, Default)]
pub struct List {
    pub id: Option<usize>,
    pub items: Vec<ListItem>,
    pub name: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
pub struct ListItem {
    pub id: uuid::Uuid,
    pub text: String,
}

#[derive(Default, PartialEq, Serialize, Deserialize, Store, Clone)]
// #[store(storage = "local", storage_tab_sync)]
pub struct Store {
    pub lists: Vec<List>,
    pub loading: bool,
    pub list_idx: usize,
}

pub fn set_list_item(list_id: usize, list_item: ListItem, dispatch: &Dispatch<Store>) {
    dispatch.reduce_mut(move |store| {
        store.lists[list_id].items.insert(0, list_item);
    })
}

pub fn set_list(list: List, dispatch: &Dispatch<Store>) {
    dispatch.reduce_mut(move |store| {
        log!("setting list");
        store.lists.insert(
            0,
            List {
                id: Some(store.list_idx),
                items: list.items,
                name: list.name,
            },
        );
        store.list_idx += 1;
    })
}
