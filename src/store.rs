use std::collections::HashMap;

use bson::oid::ObjectId;
use gloo_console::log;
use serde::{Deserialize, Serialize};
use yewdux::prelude::*;

#[derive(Debug, Deserialize, Serialize, PartialEq, Clone, Default)]
pub struct List {
    // #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub _id: Option<ObjectId>,
    pub items: Vec<ListItem>,
    pub name: String,
}

#[derive(Debug, Deserialize, Serialize, PartialEq, Clone)]
pub struct ListItem {
    // pub id: uuid::Uuid,
    pub text: String,
}

#[derive(Default, PartialEq, Store, Clone)]
// #[store(storage = "local", storage_tab_sync)]
pub struct Store {
    pub lists: Vec<List>,
    pub loading: bool,
    pub list_idx: usize,
    pub current_list: List,
    pub list_map: HashMap<String, List>,
}

pub fn set_list_item(list_id: usize, list_item: ListItem, dispatch: &Dispatch<Store>) {
    dispatch.reduce_mut(move |store| {
        store.lists[list_id].items.insert(0, list_item);
    })
}

pub fn set_list(list: List, dispatch: &Dispatch<Store>) {
    dispatch.reduce_mut(move |store| {
        store.lists.insert(
            0,
            List {
                _id: None,
                items: list.items,
                name: list.name,
            },
        );
        store.list_idx += 1;
    })
}

// pub fn set_current_list(id: String, dispatch: &Dispatch<Store>) {
//     dispatch.reduce_mut(move |store| store.current_list = list)
// }

pub fn set_list_map(list_map: HashMap<String, List>, dispatch: &Dispatch<Store>) {
    dispatch.reduce_mut(move |store| store.list_map = list_map)
}
