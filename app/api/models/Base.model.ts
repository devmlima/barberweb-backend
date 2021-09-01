import { getUsuarioLogado } from './../../shared/tenant';
import { Model, BeforeBulkCreate, BeforeValidate } from "sequelize-typescript";

export class BaseModel<T> extends Model<BaseModel<T>> {

    protected static tenantColumn: string;

    @BeforeValidate
    @BeforeBulkCreate
    static aplicaTenant<T>(instance: BaseModel<T> | BaseModel<T>[]) {
        const usuarioLogado = getUsuarioLogado();
        if (!usuarioLogado) {
            return;
        }
        if (!Array.isArray(instance)) {
            instance = [instance];
        }
        if (this.tenantColumn) {
            for (const item of instance) {
                item[this.tenantColumn] = usuarioLogado.id;
            }
        }
    }

}
