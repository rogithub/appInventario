import { RuleBase, RuleResult } from 'valiko';

export class GtOrEqualZero extends RuleBase<number> {
  constructor() {
    super(`Debe ser menor o igual a cero`);
  }

public check(value?: number): Promise<RuleResult> {
    const self = this;
    return self.toResult(value >= 0);    
  }
}