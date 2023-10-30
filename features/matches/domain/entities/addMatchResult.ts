import Match from "./match";

class AddMatchResult {
    matches: Match;
    error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string,
    } [] | null;

    constructor (
      message: string,
        matches: Match,
    ) {
        this.message = message;
        this.matches = matches;
    }
}

export default AddMatchResult;