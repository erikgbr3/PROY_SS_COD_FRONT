import Club from "../../../matches/domain/entities/club";


class AddClubResult{
  club: Club[];
  error?: boolean;
  message: string;
  errors?: {
    error: string,
    field: string
  }[] | null;

  constructor(
    message: string,
    club: Club[],

  ){
    this.message = message,
    this.club = club;
  }
}

export default AddClubResult;