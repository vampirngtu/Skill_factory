import requests
import json
from config import keys

class ConvertionException(Exception):
    pass

class CryptoConverter:
    @staticmethod
    def convert(quote: str, base: str, amount: str):
        if quote == base:
            raise ConvertionException(f'Валюты одинаковы, что переводить то...{base}.')

        try:
            quote_ticker = keys[quote]
        except KeyError:
            raise ConvertionException(f'Не получилось, ошибка {quote}.')
        try:
            base_ticker = keys[base]
        except KeyError:
            raise ConvertionException(f'Не получилось, ошибка {base}.')

        try:
            amount = float(amount)
        except ValueError:
            raise ConvertionException(f'Неверное ввод числа {amount}')
        r = requests.get(f'https://min-api.cryptocompare.com/data/price?fsym={quote_ticker}&tsyms={base_ticker}')
        total_base = json.loads(r.content)[keys[base]]
        return total_base
