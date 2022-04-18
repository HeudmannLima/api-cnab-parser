import{ IReadStreamProvider } from '../IReadBase64Provider';

export class ReadStreamProvider implements IReadStreamProvider {
  async readBinaryDataToString(fileData: string): Promise<string> {
    const fileBufferData = Buffer.from(fileData, 'base64')
    const content = fileBufferData.toString('utf8')

    return content
  }
}
