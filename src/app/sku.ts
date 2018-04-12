import { Vendor } from './vendor';

export interface Sku {
    skuKey?: number;
    skuVendor?: Vendor;
    vendorSkuCode?: string;
    skuName?: string;
    skuDescription?: string;
    classLength?: number;
}
