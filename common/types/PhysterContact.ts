export interface PhysterContact {
    itemGuid: string;
    fileAs: string;
    firstName?: string;
    lastName?: string;
    email1Address: string;
    telephoneNumber1?: string;
    telephoneNumber2?: string;
    lastActivity: string;
    profilePicture?: string | null;
    businessAddressStreet?: string;
    businessAddressCity?: string;
    businessAddressState?: string;
    businessAddressPostalCode?: string;
    homeAddressStreet?: string;
    homeAddressCity?: string;
    homeAddressState?: string;
    homeAddressPostalCode?: string;
    middleName?: string;
    company?: string;
    department?: string;
    note?: string;
    webPage?: string;
    itemChanged?: string;
    itemCreated?: string;
}

/**
 * Type alias for PhysterContact for backward compatibility
 */
export type Contact = PhysterContact;
