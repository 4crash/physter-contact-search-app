export interface PhysterContact {
    ItemGUID: string;
    FileAs?: string;
    FirstName?: string;
    LastName?: string;
    Email1Address?: string;
    TelephoneNumber1?: string;
    TelephoneNumber2?: string;
    LastActivity?: string;
    ProfilePicture?: string | null;
    ProfilePictureHeight?: number;
    ProfilePictureWidth?: number;
    BusinessAddressStreet?: string;
    BusinessAddressCity?: string;
    BusinessAddressState?: string;
    BusinessAddressPostalCode?: string;
    HomeAddressStreet?: string;
    HomeAddressCity?: string;
    HomeAddressState?: string;
    HomeAddressPostalCode?: string;
    MiddleName?: string;
    Company?: string;
    Department?: string;
    Note?: string;
    WebPage?: string;
    ItemChanged?: string;
    ItemCreated?: string;
}
