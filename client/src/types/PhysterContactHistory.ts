import { PhysterContact } from "../../../common/types/PhysterContact";

export interface PhysterContactHistory extends PhysterContact {
    lastUpdated: number           // Unix timestamp
}