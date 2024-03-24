import { DeepPartial } from "typeorm";
import HighlightEntity from "../entities/highlight.entity";
import { RatingForEnum } from "../../../common/enum/enums";
import { HighLightRepository, highLightRepository } from "../repository/highlight.repository";
import { HighlightService, highlightService } from "../highlight.service";


export class StoreHighlightService extends HighlightService {


    constructor() {
        super();
    }

    async createHighLight(highlight: DeepPartial<HighlightEntity>) {

        return this.repository.create(highlight).save()
    }


    async deleteHighLight(highLightFor: RatingForEnum, issueId: number) {
       
        return await this.repository.delete({ highlightFor: highLightFor, id: issueId });
    }

}

export const storeHighlightService = new StoreHighlightService();