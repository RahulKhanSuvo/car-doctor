export interface Facility {
    name: string;
    details: string;
}

export interface ServiceData {
    _id: string;
    service_id: string;
    title: string;
    img: string;
    price: string;
    description: string;
    facility: Facility[];
}
