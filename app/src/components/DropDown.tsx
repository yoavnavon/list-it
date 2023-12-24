import * as React from 'react';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IOption } from '../customTypes/option';

type Props = {
    // handle_input: (event: React.ChangeEvent<HTMLInputElement>) => void
    // handle_add: () => void
    // textRef: React.MutableRefObject<HTMLInputElement | null>
    options: Array<IOption>
    selected: string | undefined
    handle_click: (value: any) => void
};


const DropDown: React.FC<Props> = ({ options, handle_click, selected }) => {
    return (
        <Menu as="div" className="relative inline-block text-left mr-5 h-full">
            <Menu.Button
                className={`
                inline-flex
                w-full
                h-full
                justify-center
                bg-white
                rounded-md
                shadow-sm
                px-4
                py-2
                font-semibold
                text-gray-900
                ring-1 ring-inset ring-gray-300
                hover:bg-gray-50`
                }
            >
                {selected}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {options.map((option, idx) => (<Menu.Item key={idx}>
                            {({ active }) => (
                                <a

                                    href="#"
                                    className={
                                        `block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700 block px-4 py-2 text-sm'}`
                                    }
                                    onClick={(_) => handle_click(option.value != null ? option.value : option.label)}
                                >
                                    {option.label}
                                </a>
                            )}
                        </Menu.Item>))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
export default DropDown;


