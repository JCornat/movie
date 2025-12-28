export abstract class ExceptionBase extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class FatalErrorException extends ExceptionBase {
  constructor(message: string = `Erreur serveur`) {
    super(message);
  }
}

export class ArgumentNotProvidedException extends ExceptionBase {
  constructor(message: string = `Paramètre non fourni`) {
    super(message);
  }
}

export class ArgumentInvalidException extends ExceptionBase {
  constructor(message: string = `Paramètre invalide`) {
    super(message);
  }
}

export class ArgumentOutOfRangeException extends ExceptionBase {}

export class NotFoundException extends ExceptionBase {
  constructor(message: string = `Ressource introuvable`) {
    super(message);
  }
}

export class InvalidRequestException extends ExceptionBase {
  constructor(message: string = `Requête invalide`) {
    super(message);
  }
}

export class InvalidStateException extends ExceptionBase {}
export class InvalidTokenException extends ExceptionBase {}

export class UnauthorizedException extends ExceptionBase {
  constructor(message: string = `Action non autorisée`) {
    super(message);
  }
}

export class UnauthenticatedException extends ExceptionBase {
  constructor(message: string = `Authentification requise`) {
    super(message);
  }
}

export class PasswordInvalidException extends ExceptionBase {
  constructor(message: string = `Mot de passe incorrect`) {
    super(message);
  }
}

export class NotImplementedException extends ExceptionBase {
  constructor(message: string = `Fonctionnalité en cours de création`) {
    super(message);
  }
}

export class TokenExpiredException extends ExceptionBase {
  constructor(message: string = 'TokenExpiredError') {
    super(message);
  }
}

export class OperationFailedException extends ExceptionBase {
  constructor(message: string = `L'opération a échoué`) {
    super(message);
  }
}

export class UploadError extends ExceptionBase {
  constructor(message: string = `Erreur d'upload`) {
    super(message);
  }
}
