import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as linguee from 'linguee';
import { ResponseDto } from './interfaces/response.dto';
import { RANDOM_WORDS_API_URL } from './constants';

@Injectable()
export class ApiService {

  constructor(private httpService: HttpService) {}

  getRandomEnglishWords(count: number): Observable<any> {
    return this.httpService.get(RANDOM_WORDS_API_URL + String(count))
      .pipe(map(data => data.data ));
  }

  async formChoices(sourceLang: string, targetLang: string, query: string): Promise<ResponseDto> {
    const queryTranslated = await ApiService.getTranslation(sourceLang, targetLang, query);
    const randomWords = await this.getRandomEnglishWords(3).toPromise()
      .then( data => data.concat(queryTranslated))
      .then(data => data.map((e, i) => ({id: i, data: e})));
    return {
      answer: randomWords.find(o => o.data === queryTranslated),
      choices: randomWords,
    };
  }

  static async getTranslation(sourceLang: string, targetLang: string, query: string): Promise<any> {
    return linguee
      .translate(query, {from: sourceLang, to: targetLang})
      .then(translate => translate.words)
      .then(words => words[0])
      .then(word => word.translations[0].term)
      // tslint:disable-next-line:no-console
      .catch(err => console.log(err));
    }
}
