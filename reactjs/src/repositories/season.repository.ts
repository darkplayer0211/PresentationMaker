import templateData from "../mock/template-data.mock.json";
import { Season } from "../model/season.model";

export class SeasonRepository {
  /**
   * Retrieves all seasons from the database.
   *
   * @returns list of season
   */
  async findAll(): Promise<Array<Season>> {
    return JSON.parse(JSON.stringify(templateData.openFile));
  }

  /**
   * Retrieves seasons filtered by a season type.
   *
   * @param type season type
   * @returns list of season by a season type
   */
  async findBySeasonType(type: number): Promise<Array<Season>> {
    const season: Array<Season> = JSON.parse(JSON.stringify(templateData.openFile));
    return season.filter(s => s.seasonType === type);
  }
}
