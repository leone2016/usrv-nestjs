import {Document} from 'mongoose'
export interface PlayerInterface extends Document{
    //readonly _id: string;
    readonly phoneNumber: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    urlPhoto: string;
}
