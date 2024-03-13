import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import { RatingForEnum } from "../../../common/enum/enums";

@Entity({name: "Highlights"})
export default class HighlightEntity extends CustomBaseEntity{
    @Column()
    description: string;

    @Index()
    @Column({ enum: RatingForEnum })
    highlightFor: RatingForEnum;

    @Index()
    @Column({})
    issueId: number; //id of the entity rated for i.e store, boat or cycle
    
}