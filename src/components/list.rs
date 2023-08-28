use yew::prelude::*;
use yewdux::prelude::*;

use crate::store::Store;

#[derive(Debug, PartialEq, Properties)]
pub struct Props {
    pub id: usize,
}

// fn confirm_delete(message: &str) -> bool {
//     web_sys::Window::confirm_with_message(&web_sys::window().unwrap(), message).unwrap()
// }

#[function_component]
pub fn ListView(props: &Props) -> Html {
    let (store, dispatch) = use_store::<Store>();
    let list = &store.lists[props.id];

    // let on_delete = {
    //     let cloned_dispatch = dispatch.clone();
    //     let feedback_id = props.feedback.id.clone();
    //     Callback::from(move |_: MouseEvent| {
    //         let dispatch = cloned_dispatch.clone();
    //         let confirmed = confirm_delete("Do you really want to delete this item?");

    //         if confirmed {
    //             delete_feedback(feedback_id, dispatch.clone());
    //             set_show_alert("Feedback deleted successfully".to_string(), dispatch);
    //         }
    //     })
    // };

    html! {
            <div>
                <h1>{list.name.clone()}</h1>
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        {"Product name"}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        {"Color"}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        {"Category"}
                    </th>
                    <th scope="col" class="px-6 py-3">
                        {"Price"}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {"Apple MacBook Pro 17"}
                    </th>
                    <td class="px-6 py-4">
                       {" Silver"}
                    </td>
                    <td class="px-6 py-4">
                        {"Laptop"}
                    </td>
                    <td class="px-6 py-4">
                        {"$2999"}
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {"Microsoft Surface Pro"}
                    </th>
                    <td class="px-6 py-4">
                        {"White"}
                    </td>
                    <td class="px-6 py-4">
                        {"Laptop PC"}
                    </td>
                    <td class="px-6 py-4">
                        {"$1999"}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
            </div>
            // <div class="bg-white text-gray-700 rounded-lg p-8 my-5 relative">
                // <div class="bg-pink-500 text-white rounded-full border-2 border-gray-200 w-12 h-12 flex items-center justify-center text-2xl font-bold absolute top-0 left-0 -mt-4 -ml-4">
                //     {props.list.name}
                // </div>
                // <button class="absolute font-bold top-2 right-4 cursor-pointer bg-transparent border-none" onclick={on_delete}>{"X"}</button>
                // <p>
                //     {&props.feedback.text}
                // </p>
            // </div>
        }
}
