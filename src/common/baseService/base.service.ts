import { Repository } from "typeorm";
import { CustomBaseEntity } from "../baseEntity/custom-base-entity";

class BaseService<R extends CustomBaseEntity> {
  constructor(private readonly repository: Repository<R>) {}
}
