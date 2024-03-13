import { DeepPartial } from "typeorm";
import { HighLightRepository, highLightRepository } from "./repository/highlight.repository";
import HighlightEntity from "./entities/highlight.entity";
import { RatingForEnum } from "../../common/enum/enums";

export class HighlightService{
    protected readonly repository: HighLightRepository;

    constructor(){
        this.repository = highLightRepository;
    }

    async getHighLightAccordingToIssuedItem(highlightFor: RatingForEnum, issueId: number) {
        const highLights = await this.repository.find({ where: { highlightFor: highlightFor, issueId: issueId } })
        return highLights
    }

 
}

export const highlightService = new HighlightService();