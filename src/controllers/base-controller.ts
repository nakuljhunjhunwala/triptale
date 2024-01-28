import { LoggerContainer } from "../settings/logger"

export abstract class BaseController {
  protected static readonly logger = LoggerContainer.instance.getLogger(BaseController);
}
