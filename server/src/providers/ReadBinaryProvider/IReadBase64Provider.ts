export interface IReadStreamProvider {
  readBinaryDataToString(fileData: string): Promise<string>
}
