import { RuleBase, RuleResult } from 'valiko';

export class NumericValidator extends RuleBase<number> {
  constructor() {
    super("Campo debe ser numérico");
  }

public check(value?: number): Promise<RuleResult> {
    const self = this;
    let nan = isNaN(value);

    return self.toResult(nan === false);
  }
}