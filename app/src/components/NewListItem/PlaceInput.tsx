import * as React from 'react';
import { useState, useCallback, useRef } from 'react'
import DropDown from '../DropDown';
import ItemTypes from '../../constants'
import IPlace from '../../@types/place'

import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
import type { Libraries } from '@googlemaps/js-api-loader';





type Props = {
    handle_item_type: (event: any) => void
    itemType: string
    handle_add: (place: any) => void
    place: google.maps.places.PlaceResult | null
    setPlace: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult | null>>
};



const PlaceInput: React.FC<Props> = ({ handle_item_type, itemType, handle_add, setPlace, place }) => {


    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734

    }
    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
    const [placeService, setPlaceService] = useState<google.maps.places.PlacesService | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const [selected, setSelected] = useState<IPlace | null>(null);
    const onSelect = (item: any) => {
        setSelected(item);
    }
    // const { PlacesService } = await google.maps.importLibrary("places")
    function isIconMouseEvent(
        e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
    ): e is google.maps.IconMouseEvent {
        return "placeId" in e;
    }


    const onMapLoad = useCallback((map: google.maps.Map) => {
        setMapRef(map);
        console.log(typeof map, map)
        const service = new google.maps.places.PlacesService(map)
        console.log(service)
        setPlaceService(service)
    }, [setMapRef]);

    const LIBRARIES: Libraries = ["places"]

    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between h-10">
                {/* <input type="file" onChange={(e) => e.target.files != null ? setImage(e.target.files[0]) : null} ref={inputRef}></input> */}
                <DropDown options={ItemTypes} handle_click={handle_item_type} selected={itemType}></DropDown>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-20"
                    onClick={handle_add}
                >
                    Upload
                </button>
            </div>
            <div style={{ height: '100vh', width: '100%' }}>
                <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
                    libraries={LIBRARIES}
                >
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={defaultCenter}
                        onLoad={onMapLoad}

                        onClick={(e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => {
                            console.log(e.latLng!.lat(), e.latLng!.lng())
                            e.stop()
                            if (isIconMouseEvent(e) && e.placeId) {
                                console.log("You clicked on place:" + e.placeId);

                                placeService!.getDetails({ placeId: e.placeId }, (
                                    place: google.maps.places.PlaceResult | null,
                                    status: google.maps.places.PlacesServiceStatus
                                ) => { setPlace(place) })
                                const item = { location: { lat: e.latLng!.lat(), lng: e.latLng!.lng() }, placeId: e.placeId }
                                onSelect(item)
                            }

                        }}
                    >

                        {
                            selected && (
                                <InfoWindow position={selected.location} onCloseClick={() => {

                                    setSelected(null)
                                    console.log('info window closed')
                                }}
                                >
                                    <div>
                                        <h3>{place?.name}</h3>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-20"
                                            onClick={() => { console.log("clicked") }}
                                        >
                                            Add
                                        </button>
                                    </div>

                                </InfoWindow>)

                        }

                        {/* <Marker key="Location2" position={selected.location}
                            icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}

                        >
                        </Marker> */}


                    </GoogleMap>
                </LoadScript>
            </div>
        </div >

    );
};
export { PlaceInput };