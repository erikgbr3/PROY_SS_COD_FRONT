import Match from "./match";

class AddMatchResult {
    match: Match;
    error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string,
    } [] | null;

    constructor (
      message: string,
        match: Match,
    ) {
        this.message = message;
        this.match = match;
    }
}

export default AddMatchResult;