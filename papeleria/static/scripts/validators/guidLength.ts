import { RuleBase, RuleResult } from 'valiko';
import { Guid } from "../shared/guid";

export class GuidLength extends RuleBase<string> {
  constructor() {
    super("QR no válido");
  }

public check(value?: string): Promise<RuleResult> {
  const self = this;
  if (value === null || value === undefined || value.trim().length === 0) {
    return self.toNotValid();
  }

  return value.length === Guid.empty.length ? self.toValid() : self.toNotValid();
  }
}