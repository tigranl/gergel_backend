type Choice = {id: number, item: string };

export interface ResponseDto {
  answer: Choice;
  choices: Choice[];
}
