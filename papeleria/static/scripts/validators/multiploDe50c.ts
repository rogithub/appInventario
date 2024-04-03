import { RuleBase, RuleResult } from 'valiko';

export class MultiploDe50c extends RuleBase<number> {
  constructor() {
    super(`Debe ser múltiplo de $50c`);
  }

public check(value?: number): Promise<RuleResult> {
    const self = this;
    if (value === 0) return self.toResult(true);    
    if (isNaN(value)) return self.toResult(false);
    const esMultiplo = value % 0.50 === 0;
    return self.toResult(esMultiplo);
  }
}