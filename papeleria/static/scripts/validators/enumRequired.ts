import { RuleBase, RuleResult } from 'valiko';

export class EnumRequired<T> extends RuleBase<T> {
  constructor() {
    super("Required");
  }

public check(value?: T): Promise<RuleResult> {
  const self = this;
  if (value === null || value === undefined) {
    return self.toNotValid();
  }

    return self.toValid();
  }
}