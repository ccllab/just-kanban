import {BaseEntity, DeepPartial} from "typeorm";
import {ICreatedAtUpdateAt} from "../../repository";

/**
 * Check specified type is implement ICreatedAtUpdateAt.
 * @param target The target want to check if is ICreatedAtUpdateAt.
 * @return true/false
 */
export function hasEditColumn<TEntity>(target: BaseEntity | DeepPartial<TEntity> | ICreatedAtUpdateAt): target is ICreatedAtUpdateAt {

    return (<ICreatedAtUpdateAt>target).createdAtFlag !== undefined &&
           (<ICreatedAtUpdateAt>target).updatedAtFlag !== undefined;
}
