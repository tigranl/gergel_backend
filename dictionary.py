import nltk
import json

def download_data():
    nltk.download()
    nltk.download('punkt')


def main():
    words_by_speech_parts = {}

    with open("words_dictionary.json", "r") as dictionary:
        data = json.load(dictionary)
        for key in data.keys():
            print(f'Processing word: {key}')
            words_by_speech_parts[key] = nltk.pos_tag(nltk.word_tokenize(key))[0][1]

    with open("dictionary_processed.json", "w") as dictionary_processed:
        json.dump(words_by_speech_parts, dictionary_processed, sort_keys=True, indent=4)

if __name__ == "__main__":
    main()
