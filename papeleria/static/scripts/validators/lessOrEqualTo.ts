import { RuleBase, RuleResult } from 'valiko';

export class LessOrEqualTo extends RuleBase<number> {
  public max: number;
  constructor(value: number) {
    super(`Debe ser menor o igual a ${value}`);
    this.max = value;
  }

public check(value?: number): Promise<RuleResult> {
    const self = this;    
    return self.toResult(value <= self.max);
  }
}