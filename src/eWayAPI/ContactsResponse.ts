import type { IApiResult } from "@eway-crm/connector";

export type TContactsResopnse = IApiResult & {
    Data: TContact[];
};

export type TContact = {
    FileAs: string | null;
};