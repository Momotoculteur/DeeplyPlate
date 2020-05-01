import { ICountry } from 'src/app/shared/interface/ICountry';
import { IRegion } from 'src/app/shared/interface/IRegion';

export interface IMessageImage {
    directory: string;
    listCountry: ICountry[];
    listRegion: IRegion[];
    numberGeneretedPlate: number;
}