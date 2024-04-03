import { RuleBase, RuleResult } from 'valiko';

export class StringRequired extends RuleBase<string> {
  constructor() {
    super("Required");
  }

public check(value?: string): Promise<RuleResult> {
  const self = this;
  if (value === null || value === undefined || value.trim().length === 0) {
    return self.toNotValid();
  }

    return self.toValid();
  }
}