import { FileData } from "./file-data.model";

/**
 * Interface representing a liturgical season.
 */
export interface Season extends FileData {
  seasonType: number;
}
