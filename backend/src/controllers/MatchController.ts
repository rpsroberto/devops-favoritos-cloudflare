import { Request, Response } from "express";
import { MatchService } from "../services/MatchService";

export class MatchController {
  constructor(private readonly matchService = new MatchService()) {}

  list = async (_request: Request, response: Response) => {
    const matches = await this.matchService.listMatches();
    return response.json(matches);
  };
}
