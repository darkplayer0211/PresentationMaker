import { Slide } from "./slide.model";

/**
 * Interface representing a file.
 */
export interface FileData {
  type: number; // 0: Song, 1: Template
  id: string;
  title: string;
  slides: Array<Slide>;
}
