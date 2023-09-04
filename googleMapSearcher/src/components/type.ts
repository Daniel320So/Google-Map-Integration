export interface PlaceRecord {
    business_status: string;
    formatted_address: string;
    geometry : {
        location : {lat: number, lng: number};
        viewport : {northeast: {lat: number, lng: number}, southwest: {lat: number, lng: number}};
    }
    icon: string;
    name: string;
    place_id: string;
    rating: number;
    user_ratings_tota: number;
    types: string[];
}