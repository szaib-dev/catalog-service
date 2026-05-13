export type Attribute = {
    name: string;
    widgetType: 'radio' | 'switch';
    defaultValue: string;
    availableOptions: string[];
};

export type PriceConfig = {
    [key: string]: {
        priceType: 'base' | 'additional';
        availableOptions: string[];
    };
};

export interface CategoryInterface {
    name: string;
    priceConfig: PriceConfig;
    attributes: Attribute[];
}
