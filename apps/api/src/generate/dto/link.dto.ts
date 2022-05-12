import { IsArray, IsString } from 'class-validator';

export class LinkDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly campaign: string;

    @IsArray()
    readonly tags: string[];

    @IsString()
    readonly msg: string;
}
