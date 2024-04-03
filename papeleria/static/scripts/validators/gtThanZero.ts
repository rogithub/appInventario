import { RuleBase, RuleResult } from 'valiko';

export class GtThanZero extends RuleBase<number> {
  constructor() {
    super("Debe ser mayor a cero");
  }

public check(value?: number): Promise<RuleResult> {
    const self = this;    
    return self.toResult(value > 0);
  }
}